/**
 * Malha Arcana — Sistema Alternativo de Magia para D&D 5e no Foundry VTT
 *
 * Substitui espaços de magia por testes de conjuração com CD = 10 + Nível da Magia.
 * Inclui mecânicas de Corrupção, Ruptura Arcana e Dano de Rebote.
 *
 * Alvo: Foundry VTT v14 + dnd5e 6.x (hooks baseados em Atividades e fichas AppV2).
 */

import { MalhaArcanaConfig } from "./config.js";
import { MalhaArcanaRoller } from "./roller.js";
import { RupturaArcana } from "./ruptura.js";
import { ChatMessages } from "./chat-messages.js";
import { CorruptionTracker } from "./corruption.js";
import "./lib/lib.js";
import { RUPTURA_100_EFFECTS } from "./data/ruptura-effects.js";
import { TEST_CHARACTERS } from "./characters-data.js";
import { initMonksTokenBarIntegration, isSpellcaster } from "./integrations/monks-tokenbar.js";

const MODULE_ID = "malha-arcana";
const PURGE_NAMES = ["Ação: Purgar a Malha", "Purgar a Malha"];
const PURGE_ACTIVITY_ID = "malhaPurgar00001";

/** Ataques de magia aguardando a rolagem de ataque. Chave: `${actor.id}.${item.id}` */
const pendingSpellAttacks = new Map();

const _pendingKey = (actor, item) => `${actor.id}.${item.id}`;
const _isPurgeItem = (item) => PURGE_NAMES.includes(item?.name);
const _appliesTo = (actor) =>
  actor.type === "character" || game.settings.get(MODULE_ID, "applyToNPCs");

Hooks.once("init", function () {
  console.log(`${MODULE_ID} | Inicializando Malha Arcana — Sistema Alternativo de Magia`);

  // Register module settings
  MalhaArcanaConfig.registerSettings();

  // Store module reference globally for convenience
  game.malhaArcana = {
    MODULE_ID,
    roller: MalhaArcanaRoller,
    ruptura: RupturaArcana,
    chat: ChatMessages,
    corruption: CorruptionTracker,
    createTestCharacters: () => _ensureTestCharacters(true),
  };
});

Hooks.once("ready", async function () {
  console.log(`${MODULE_ID} | Malha Arcana pronta.`);

  // Inicializa integração com Monk's TokenBar se estiver ativo
  initMonksTokenBarIntegration();

  // Cria/importa a RollTable para a aba de Tabelas do mundo se o GM ainda não tiver
  await _ensureWorldRupturaTable();

  // Garante os 5 personagens de teste na aba de Atores do mundo em uma pasta própria
  await _ensureTestCharacters();

  // Boas-vindas na primeira inicialização (estilo Dice So Nice)
  if (game.user.isGM) {
    const hasRun = game.settings.get(MODULE_ID, "hasRunBefore");
    if (!hasRun) {
      await _showWelcomeDialog();
      await game.settings.set(MODULE_ID, "hasRunBefore", true);
    }
  }
});

/**
 * Exibe um diálogo temático de boas-vindas e introdução às mecânicas da Malha Arcana.
 */
async function _showWelcomeDialog() {
  const content = `
    <div class="malha-arcana-welcome">
      <div style="text-align: center; margin-bottom: 12px;">
        <h2 style="margin: 0; color: #a855f7; border: none; font-size: 20px;">🌀 Bem-vindo à Malha Arcana!</h2>
        <p style="font-size: 12px; color: #aaa; margin: 4px 0;">Sistema Alternativo de Magia para D&D 5e</p>
      </div>
      <p style="font-size: 13px; line-height: 1.5;">
        A magia em sua campanha agora é volátil e viva! Em vez de consumir espaços de magia fixos, toda conjuração exige canalizar diretamente a <strong>Malha Cósmica</strong>.
      </p>
      <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #a855f7; padding: 8px 12px; margin: 10px 0; font-size: 12px;">
        <ul style="margin: 0; padding-left: 18px; line-height: 1.6;">
          <li><strong>Teste da Malha:</strong> Ao conjurar uma magia de 1º círculo ou superior, role <em>1d20 + Modificador + Proficiência</em> contra <strong>CD 10 + Nível da Magia</strong>.</li>
          <li><strong>Corrupção Arcana:</strong> Cada magia de 1º círculo ou superior aumenta sua Corrupção em +1 (inicia em 1 e vai até 20).</li>
          <li><strong>Ruptura Arcana:</strong> Se o d20 natural for <em>menor ou igual</em> à sua Corrupção, a Malha se rompe e desencadeia um desastre da <strong>Tabela de 1d100</strong>!</li>
          <li><strong>Dano de Rebote:</strong> Falhar no teste sem Ruptura causa dano irredutível ao conjurador.</li>
          <li><strong>Purgar a Malha:</strong> Use o botão 🧘 na aba de magias da ficha para gastar sua Ação e reduzir 1 ponto de Corrupção.</li>
        </ul>
      </div>
      <p style="font-size: 11px; color: #888; text-align: center; margin-top: 8px;">
        Dica: Você pode personalizar danos, tabelas customizadas e comportamento de espaços nas <em>Configurações do Módulo</em>.
      </p>
    </div>
  `;

  new Dialog({
    title: "Malha Arcana — Boas-Vindas",
    content,
    buttons: {
      ok: {
        icon: '<i class="fas fa-check"></i>',
        label: "Entendido & Começar!",
      },
    },
    default: "ok",
  }).render(true);
}

/**
 * Executa a purga de corrupção e envia a mensagem de chat.
 * @param {Actor} actor
 */
async function _purge(actor) {
  const oldCorruption = CorruptionTracker.getCorruption(actor);
  if (oldCorruption <= 0) {
    ui.notifications.info(game.i18n.format("malha-arcana.purge.notification.none", { name: actor.name }));
    return;
  }
  const newCorruption = await CorruptionTracker.purgeCorruption(actor);
  await ChatMessages.sendPurgeMessage(actor, oldCorruption, newCorruption);
}

// ─────────────────────────────────────────────────────────────────
// Integração com Descanso (Short Rest & Long Rest)
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.restCompleted", async (actor, result) => {
  if (!actor || !_appliesTo(actor)) return;

  const currentCorruption = CorruptionTracker.getCorruption(actor);
  if (currentCorruption <= 0) return;

  const isLong = !!result?.longRest;
  let newCorruption = currentCorruption;

  if (isLong) {
    const longSetting = game.settings.get(MODULE_ID, "longRestCorruptionReduction") || "reset";
    if (longSetting === "reset") {
      newCorruption = 0;
    } else if (longSetting === "half") {
      newCorruption = Math.floor(currentCorruption / 2);
    } else if (longSetting === "5") {
      newCorruption = Math.max(0, currentCorruption - 5);
    }
  } else {
    const shortSetting = game.settings.get(MODULE_ID, "shortRestCorruptionReduction") || "0";
    if (shortSetting === "1") {
      newCorruption = Math.max(0, currentCorruption - 1);
    } else if (shortSetting === "half") {
      newCorruption = Math.floor(currentCorruption / 2);
    } else if (shortSetting === "1d4") {
      const r = new Roll("1d4");
      await r.evaluate();
      newCorruption = Math.max(0, currentCorruption - r.total);
    }
  }

  if (newCorruption !== currentCorruption) {
    await CorruptionTracker.setCorruption(actor, newCorruption);
    const restTypeLabel = isLong ? "Descanso Longo" : "Descanso Curto";
    ui.notifications.info(`🧘 ${actor.name} estabilizou sua Corrupção Arcana no ${restTypeLabel} (${currentCorruption} ➔ ${newCorruption}).`);
    await ChatMessages.sendRestPurgeMessage(actor, isLong, currentCorruption, newCorruption);
  }
});

// ─────────────────────────────────────────────────────────────────
// dnd5e 6.x — Hooks de Atividade
//   dnd5e.preUseActivity(activity, usageConfig, dialogConfig, messageConfig)
//   dnd5e.postUseActivity(activity, usageConfig, results)
// ─────────────────────────────────────────────────────────────────
/**
 * Indica se a regra de "sem espaços de magia" deve ser aplicada a esta magia.
 * @param {Item} item
 * @param {Actor} actor
 * @returns {boolean}
 */
const _bypassSlots = (item, actor) =>
  !!actor && item?.type === "spell" && (item.system?.level ?? 0) > 0
  && _appliesTo(actor) && game.settings.get(MODULE_ID, "disableSpellSlots");

/**
 * Desliga o consumo de espaço de magia no usageConfig e na atividade,
 * mantendo a chave do slot para escalonamento / upcast.
 * @param {object} usageConfig
 * @param {Activity} [activity]
 */
function _disableSlotConsumption(usageConfig, activity) {
  if (activity?.consumption) activity.consumption.spellSlot = false;
  if (!usageConfig) return;
  if (usageConfig.consume === true) {
    usageConfig.consume = { action: true, resources: [], spellSlot: false };
  } else if (usageConfig.consume && typeof usageConfig.consume === "object") {
    usageConfig.consume.spellSlot = false;
  }
}

Hooks.on("dnd5e.preActivityConsumption", (activity, usageConfig) => {
  if (_bypassSlots(activity?.item, activity?.item?.actor)) {
    _disableSlotConsumption(usageConfig, activity);
  }
});

Hooks.on("dnd5e.preUseActivity", (activity, usageConfig) => {
  const item = activity.item;
  const actor = item?.actor;
  if (!actor) return true;

  // Intercept "Ação: Purgar a Malha" feature
  if (_isPurgeItem(item)) {
    _purge(actor);
    return false; // blocks default execution
  }

  // Sem espaços de magia: desativa consumo de slot e ajusta chave padrão de nível
  if (_bypassSlots(item, actor)) {
    _disableSlotConsumption(usageConfig, activity);
    usageConfig.spell ??= {};
    const level = item.system?.level ?? 1;
    const current = usageConfig.spell.slot;
    if (!current || !/^spell\d+$/.test(current)) usageConfig.spell.slot = `spell${level}`;
  }

  return true;
});

Hooks.on("dnd5e.postUseActivity", async (activity, usageConfig) => {
  const item = activity.item;
  const actor = item?.actor;
  if (!actor) return;
  if (item.type !== "spell") return;
  if (!_appliesTo(actor)) return;

  const spellLevel = item.system?.level ?? 0;

  // Cantrips — safe, just post a flavor message (once per use)
  if (spellLevel === 0) {
    await ChatMessages.sendCantripSafe(actor, item);
    return;
  }

  const castLevel = Math.max(spellLevel, _resolveCastLevel(actor, usageConfig, spellLevel));

  const isAttackSpell = activity.type === "attack";
  const isSaveSpell = activity.type === "save";

  // Attack spells: the attack roll itself acts as the check
  if (isAttackSpell) {
    pendingSpellAttacks.set(_pendingKey(actor, item), {
      castLevel,
      lastTurnProcessed: null,
    });
    ui.notifications.info(game.i18n.format("malha-arcana.roll.attackPrompt", { name: item.name }));
    return;
  }

  await MalhaArcanaRoller.executeCheck(actor, item, castLevel, isAttackSpell, isSaveSpell);
});

/**
 * Resolve o nível de conjuração a partir do usageConfig (dnd5e 6.x).
 * `usageConfig.spell.slot` é uma chave como "spell3" ou "pact".
 * @param {Actor} actor
 * @param {object} usageConfig
 * @param {number} spellLevel - Nível base da magia (fallback)
 * @returns {number}
 */
function _resolveCastLevel(actor, usageConfig, spellLevel) {
  const slotKey = usageConfig?.spell?.slot;
  if (slotKey) {
    const level = actor.system?.spells?.[slotKey]?.level;
    if (Number.isFinite(level) && level > 0) return level;
    const match = /^spell(\d+)$/.exec(slotKey);
    if (match) return parseInt(match[1], 10);
  }
  if (Number.isFinite(usageConfig?.scaling)) return spellLevel + usageConfig.scaling;
  return spellLevel;
}

// ─────────────────────────────────────────────────────────────────
// dnd5e.rollAttack(rolls, { subject, ammoUpdate })
// Processa o ataque de magia como o teste da Malha Arcana
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.rollAttack", async (rolls, data) => {
  const activity = data?.subject;
  const item = activity?.item;
  if (!item || item.type !== "spell") return;

  const actor = item.actor;
  if (!actor || !_appliesTo(actor)) return;

  if ((item.system?.level ?? 0) === 0) return; // Cantrips are safe

  const key = _pendingKey(actor, item);
  const pending = pendingSpellAttacks.get(key);
  if (!pending) return;

  const roll = rolls?.[0];
  if (!roll) return;

  if (game.settings.get(MODULE_ID, "onlyFirstAttackCheck")) {
    const currentTurnId = game.combat
      ? `${game.combat.id}-${game.combat.round}-${game.combat.turn}`
      : "out-of-combat";
    if (pending.lastTurnProcessed === currentTurnId) return;
    pending.lastTurnProcessed = currentTurnId;
  } else {
    // Sem a opção, cada conjuração consome um único teste
    pendingSpellAttacks.delete(key);
  }

  await MalhaArcanaRoller.executeAttackCheck(actor, item, roll, pending.castLevel);
});

// ─────────────────────────────────────────────────────────────────
// UI Injection on Actor Sheet (dnd5e 6.x — AppV2, html é HTMLElement)
// Suporte a Personagens (Character) e Monstros (NPC)
// ─────────────────────────────────────────────────────────────────
function _injectMalhaActorSheet(app, html) {
  const actor = app.actor ?? app.document;
  if (!actor || !_appliesTo(actor) || !isSpellcaster(actor)) return;

  const root = html instanceof HTMLElement ? html : (html?.[0] || html);
  if (!root || !root.querySelector) return;

  const corruption = CorruptionTracker.getCorruption(actor);
  const maxCorruption = 20;

  // Determina o estágio de perigo visual (01-05: Estável, 06-10: Instável, 11-15: Crítico, 16-20: Catastrófico)
  let dangerClass = "ma-danger-low";
  let dangerLabel = "Estável";
  if (corruption >= 16) {
    dangerClass = "ma-danger-catastrophic";
    dangerLabel = "Catastrófico";
  } else if (corruption >= 11) {
    dangerClass = "ma-danger-critical";
    dangerLabel = "Crítico";
  } else if (corruption >= 6) {
    dangerClass = "ma-danger-warning";
    dangerLabel = "Instável";
  }

  const ruptureChance = corruption * 5;
  const tooltipText = `<strong>Corrupção Arcana: ${corruption}/${maxCorruption}</strong> (${dangerLabel})<br/>• Risco de Ruptura: d20 ≤ ${corruption} (<strong>${ruptureChance}%</strong>)<br/>• Purgar: reduz -1 gastando 1 Ação.<br/><em>(Shift+Clique no ícone para purgar)</em>`;

  // 1. Injeção do Mini-Badge no Cabeçalho da Ficha
  const header = root.querySelector(".sheet-header .header-details, .sheet-header .character-details, .sheet-header");
  if (header) {
    header.querySelector(".ma-header-corruption-badge")?.remove();
    const badge = document.createElement("div");
    badge.className = `ma-header-corruption-badge ${dangerClass}`;
    badge.setAttribute("data-tooltip", tooltipText);
    badge.setAttribute("data-tooltip-direction", "DOWN");
    badge.innerHTML = `
      <i class="fa-solid fa-meteor"></i>
      <span class="ma-badge-title">Corrupção:</span>
      <strong class="ma-badge-val">${corruption}/${maxCorruption}</strong>
    `;

    badge.addEventListener("click", async (ev) => {
      ev.preventDefault();
      if (ev.shiftKey) {
        await _purge(actor);
      } else {
        const spellTabBtn = root.querySelector('.tabs [data-tab="spells"], [data-action="tab"][data-tab="spells"]');
        if (spellTabBtn) spellTabBtn.click();
      }
    });

    header.appendChild(badge);
  }

  // 2. Injeção da Barra de Corrupção na Aba de Magias
  const spellbookTab = root.querySelector('.tab[data-tab="spells"], .tab.spells');
  if (!spellbookTab) return;

  // Evita duplicar a barra em re-renders parciais
  spellbookTab.querySelector(".malha-arcana-corruption-bar")?.remove();

  const isEditMode = !!app.isEditable;
  const bar = document.createElement("div");
  bar.className = `malha-arcana-corruption-bar ${dangerClass}`;
  bar.setAttribute("data-tooltip", tooltipText);
  bar.setAttribute("data-tooltip-direction", "UP");

  if (isEditMode) {
    bar.innerHTML = `
      <div class="ma-bar-header">
        <span class="ma-bar-title"><i class="fa-solid fa-meteor"></i> Corrupção Arcana</span>
        <span class="ma-bar-status">${dangerLabel} (Risco: ${ruptureChance}%)</span>
      </div>
      <div class="ma-bar-meter-row">
        <div class="ma-bar-container">
          <div class="ma-bar-fill" style="width: ${(corruption / maxCorruption) * 100}%;"></div>
          <div class="ma-bar-text-edit">
            <span>Corrupção:</span>
            <input type="number" class="ma-corruption-input" min="0" max="20" value="${corruption}" title="Editar valor da Corrupção">
            <span>/ ${maxCorruption}</span>
          </div>
        </div>
        <button type="button" class="ma-purge-btn" data-tooltip="Gastar 1 Ação para purgar -1 de Corrupção">
          <i class="fa-solid fa-om"></i> <span>Purgar</span>
        </button>
      </div>
    `;
    const input = bar.querySelector(".ma-corruption-input");
    input.addEventListener("change", async (ev) => {
      const val = parseInt(ev.target.value, 10);
      if (!isNaN(val)) {
        await CorruptionTracker.setCorruption(actor, val);
        ui.notifications.info(`Corrupção de ${actor.name} atualizada para ${val}.`);
      }
    });
  } else {
    bar.innerHTML = `
      <div class="ma-bar-header">
        <span class="ma-bar-title"><i class="fa-solid fa-meteor"></i> Corrupção Arcana</span>
        <span class="ma-bar-status">${dangerLabel} (Risco: ${ruptureChance}%)</span>
      </div>
      <div class="ma-bar-meter-row">
        <div class="ma-bar-container">
          <div class="ma-bar-fill" style="width: ${(corruption / maxCorruption) * 100}%;"></div>
          <span class="ma-bar-text">Corrupção Atual: ${corruption}/${maxCorruption} (${dangerLabel})</span>
        </div>
        <button type="button" class="ma-purge-btn" data-tooltip="Gastar 1 Ação para purgar -1 de Corrupção">
          <i class="fa-solid fa-om"></i> <span>Purgar</span>
        </button>
      </div>
    `;
  }

  spellbookTab.prepend(bar);

  bar.querySelector(".ma-purge-btn").addEventListener("click", async (ev) => {
    ev.preventDefault();
    const feat = actor.items.find((i) => i.type === "feat" && _isPurgeItem(i));
    if (feat?.system?.activities?.size) {
      feat.use();
    } else {
      await _purge(actor);
    }
  });
}

Hooks.on("renderCharacterActorSheet", _injectMalhaActorSheet);
Hooks.on("renderNPCActorSheet", _injectMalhaActorSheet);

// ─────────────────────────────────────────────────────────────────
// Auto-add Purge Feat para conjuradores (classes, subclasses e magias)
// ─────────────────────────────────────────────────────────────────
Hooks.on("createItem", async (item, options, userId) => {
  if (game.user.id !== userId) return;
  if (!item.parent || item.parent.documentName !== "Actor") return;

  const actor = item.parent;
  const relevantTypes = ["class", "subclass", "spell", "feat"];
  if (!relevantTypes.includes(item.type)) return;

  // Verifica dinamicamente se agora o personagem é capaz de conjurar magias
  if (!isSpellcaster(actor)) return;

  const hasFeat = actor.items.some((i) => i.type === "feat" && _isPurgeItem(i));
  if (hasFeat) return;

  await Item.create({
    name: PURGE_NAMES[0],
    type: "feat",
    img: "icons/magic/light/explosion-star-glow-silhouette.webp",
    system: {
      description: { value: "Uma ação para purgar a corrupção da Malha Arcana." },
      activities: {
        [PURGE_ACTIVITY_ID]: {
          _id: PURGE_ACTIVITY_ID,
          type: "utility",
          activation: { type: "action", value: 1 },
        },
      },
    },
  }, { parent: actor });
  ui.notifications.info(`Ação "Purgar a Malha" adicionada automaticamente a ${actor.name}.`);
});


/**
 * Garante que a RollTable oficial da Ruptura Arcana exista na aba de Tabelas do mundo para o Mestre.
 */
async function _ensureWorldRupturaTable() {
  if (!game.user.isGM) return;
  const tableName = "Ruptura Arcana";
  const existing = game.tables.getName(tableName);

  const resultType = CONST.TABLE_RESULT_TYPES?.TEXT ?? "text";
  const results = RUPTURA_100_EFFECTS.map((item) => ({
    type: resultType,
    name: item.title,
    description: item.description,
    text: `<strong>${item.title}</strong><br/>${item.description}`,
    weight: 1,
    range: [item.roll, item.roll],
    drawn: false,
    img: item.img || "icons/magic/lightning/bolt-strike-blue.webp"
  }));

  // Se a tabela ja existe com 100 resultados, verifica se precisa atualizar para os ícones temáticos
  if (existing && existing.results.size >= 100) {
    const hasOldGenericIcons = Array.from(existing.results).every((r) => !r.img || r.img.includes("spell-strike-spark-purple"));
    if (!hasOldGenericIcons) return;
    console.log("malha-arcana | Atualizando tabela 'Ruptura Arcana' do mundo com os novos ícones temáticos...");
    await existing.deleteEmbeddedDocuments("TableResult", existing.results.map((r) => r.id));
    await existing.createEmbeddedDocuments("TableResult", results);
    return;
  }

  // Se ja existe uma tabela antiga com menos de 100 resultados, atualiza para a nova completa de 100
  if (existing) {
    console.log("malha-arcana | Atualizando tabela 'Ruptura Arcana' do mundo para os 100 efeitos únicos...");
    await existing.deleteEmbeddedDocuments("TableResult", existing.results.map((r) => r.id));
    await existing.createEmbeddedDocuments("TableResult", results);
    return;
  }

  // Se nao existe, cria com os 100 efeitos unicos
  await RollTable.create({
    name: tableName,
    description: "Tabela oficial de Desastres Mágicos (1d100) da Malha Arcana com 100 efeitos únicos (1 a 100). Totalmente editável pelo Mestre!",
    results,
    formula: "1d100",
    replacement: true,
    displayRoll: true,
    img: "icons/magic/lightning/bolt-strike-blue.webp"
  });
  console.log("malha-arcana | Tabela 'Ruptura Arcana' com 100 efeitos únicos criada na aba de Tabelas do mundo.");
}

/**
 * Garante que os 5 personagens de teste da Malha Arcana existam na aba de Atores do mundo em uma pasta própria,
 * e remove duplicatas caso o usuário tenha tentado importar várias vezes.
 * @param {boolean} [force=false]
 */
async function _ensureTestCharacters(force = false) {
  if (!game.user.isGM) return;

  const folderName = "Malha Arcana — Personagens de Teste";
  let folder = game.folders.find((f) => f.type === "Actor" && f.name === folderName);

  if (!folder) {
    folder = await Folder.create({
      name: folderName,
      type: "Actor",
      color: "#7c3aed",
      sorting: "a",
    });
  }

  // Remove duplicatas que possuam o mesmo nome dos personagens de teste
  for (const charData of TEST_CHARACTERS) {
    const matching = game.actors.filter((a) => a.name === charData.name);
    if (matching.length > 1) {
      console.log(`malha-arcana | Removendo ${matching.length - 1} duplicatas de "${charData.name}"...`);
      for (let i = 1; i < matching.length; i++) {
        await matching[i].delete();
      }
    }
  }

  let createdCount = 0;
  for (const charData of TEST_CHARACTERS) {
    const existing = game.actors.find((a) => a.name === charData.name);
    if (!existing || force) {
      if (existing && force) await existing.delete();
      const dataToCreate = foundry.utils.duplicate(charData);
      dataToCreate.folder = folder.id;
      delete dataToCreate._id;
      dataToCreate.ownership = { default: 2 }; // Permissão Observador para os jogadores poderem abrir
      await Actor.create(dataToCreate);
      createdCount++;
    } else if (existing && existing.folder !== folder.id) {
      // Se já existe mas está fora da pasta, move para dentro da pasta
      await existing.update({ folder: folder.id });
    }
  }

  if (createdCount > 0) {
    ui.notifications.info(`✨ ${createdCount} personagens de teste da Malha Arcana foram criados na pasta "${folderName}" na aba de Atores!`);
  }
}

// ─────────────────────────────────────────────────────────────────
// UI / UX: Prévia de Risco da Malha no Diálogo de Conjuração
// ─────────────────────────────────────────────────────────────────
Hooks.on("renderActivityUsageDialog", (dialog, html) => {
  const activity = dialog.activity;
  const item = activity?.item;
  const actor = item?.actor;
  if (!actor || item?.type !== "spell" || (item.system?.level ?? 0) === 0 || !_appliesTo(actor)) return;

  const currentCorruption = CorruptionTracker.getCorruption(actor);
  const baseSpellLevel = item.system?.level ?? 1;

  const form = html.querySelector("form") || html;

  // 1. DEDUPLICAÇÃO: remove instâncias anteriores de prévia (ocorre quando o diálogo re-renderiza via submitOnChange)
  form.querySelectorAll(".malha-dialog-preview").forEach((el) => el.remove());

  // 2. Se a opção de desativar espaços de magia estiver ativa:
  const bypass = game.settings.get(MODULE_ID, "disableSpellSlots");
  if (bypass) {
    // Remove avisos nativos do dnd5e de falta de slots ("Você não possui espaços de magia...")
    const notes = html.querySelectorAll(".note.warn, .notification.warning, .alert-warning");
    notes.forEach((n) => {
      const txt = (n.textContent || "").toLowerCase();
      if (txt.includes("espaços de magia") || txt.includes("slots")) {
        n.remove();
      }
    });

    // Oculta o checkbox de "Consumir Espaço de Magia?"
    const consumeSlotInput = html.querySelector('input[name="consume.spellSlot"]');
    if (consumeSlotInput) {
      consumeSlotInput.checked = false;
      const group = consumeSlotInput.closest(".form-group");
      if (group) group.style.display = "none";
    }
  }

  // 3. Dropdown de Escalonamento / Upcast
  const slotSelect = html.querySelector('select[name="spell.slot"]');
  let selectedLevel = baseSpellLevel;

  if (slotSelect) {
    const validOptions = Array.from(slotSelect.options).filter((o) => !o.disabled && o.value);
    if (validOptions.length === 0) {
      // Cria opções do nível base até o 9º nível caso o dnd5e não tenha opções válidas
      slotSelect.innerHTML = "";
      for (let lvl = baseSpellLevel; lvl <= 9; lvl++) {
        const opt = document.createElement("option");
        opt.value = `spell${lvl}`;
        opt.textContent = `${lvl}º Nível`;
        if (lvl === baseSpellLevel) opt.selected = true;
        slotSelect.appendChild(opt);
      }
    } else {
      // Reabilita as opções caso o sistema as tenha desabilitado por 0 slots
      for (const opt of slotSelect.options) {
        opt.disabled = false;
      }
    }

    const match = /^spell(\d+)$/.exec(slotSelect.value);
    if (match) selectedLevel = parseInt(match[1], 10);
  }

  const dc = 10 + selectedLevel;
  const nextCorruption = Math.min(20, currentCorruption + 1);
  const ruptureChance = nextCorruption * 5;

  const previewBox = document.createElement("div");
  previewBox.className = "malha-dialog-preview";
  previewBox.innerHTML = `
    <div class="malha-dialog-header">
      <i class="fas fa-meteor"></i> <strong>Risco da Malha Arcana</strong>
    </div>
    <div class="malha-dialog-body">
      <div class="malha-dialog-row">
        <span>CD da Malha:</span>
        <strong class="ma-preview-dc">${dc} (10 + Nível ${selectedLevel})</strong>
      </div>
      <div class="malha-dialog-row">
        <span>Corrupção resultante:</span>
        <strong>${nextCorruption}/20</strong>
      </div>
      <div class="malha-dialog-row" style="color: #f87171;">
        <span>Risco de Ruptura Cósmica:</span>
        <strong>d20 ≤ ${nextCorruption} (${ruptureChance}%)</strong>
      </div>
    </div>
  `;

  // Insere a prévia dentro do formulário antes dos botões de envio
  form.appendChild(previewBox);

  // Ao alterar o dropdown no formulário, atualiza a CD em tempo real
  if (slotSelect) {
    slotSelect.addEventListener("change", (ev) => {
      let lvl = baseSpellLevel;
      const val = ev.target.value;
      const m = /^spell(\d+)$/.exec(val);
      if (m) lvl = parseInt(m[1], 10);
      else if (val === "pact") lvl = actor.system?.spells?.pact?.level || baseSpellLevel;

      const newDC = 10 + lvl;
      const dcEl = previewBox.querySelector(".ma-preview-dc");
      if (dcEl) dcEl.textContent = `${newDC} (10 + Nível ${lvl})`;
    });
  }
});