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
  };
});

Hooks.once("ready", async function () {
  console.log(`${MODULE_ID} | Malha Arcana pronta.`);

  // Cria/importa a RollTable para a aba de Tabelas do mundo se o GM ainda não tiver
  await _ensureWorldRupturaTable();

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
// dnd5e 6.x — Hooks de Atividade
//   dnd5e.preUseActivity(activity, usageConfig, dialogConfig, messageConfig)
//   dnd5e.postUseActivity(activity, usageConfig, results)
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.preActivityConsumption", (activity, usageConfig, messageConfig) => {
  const item = activity?.item;
  const actor = item?.actor;
  if (!actor || item?.type !== "spell" || !_appliesTo(actor)) return;

  if (game.settings.get(MODULE_ID, "disableSpellSlots")) {
    if (usageConfig?.spell) {
      usageConfig.spell.slot = false;
      usageConfig.spell.consume = false;
    }
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
// ─────────────────────────────────────────────────────────────────
Hooks.on("renderCharacterActorSheet", (app, html) => {
  const actor = app.actor ?? app.document;
  if (!actor) return;

  const spellbookTab = html.querySelector('.tab[data-tab="spells"]');
  if (!spellbookTab) return;

  // Evita duplicar a barra em re-renders parciais
  spellbookTab.querySelector(".malha-arcana-corruption-bar")?.remove();

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
  const tooltipText = `&lt;strong&gt;Corrupção Arcana: ${corruption}/${maxCorruption}&lt;/strong&gt; (${dangerLabel})&lt;br/&gt;• Risco de Ruptura: d20 ≤ ${corruption} (&lt;strong&gt;${ruptureChance}%&lt;/strong&gt;)&lt;br/&gt;• Purgar: reduz -1 gastando 1 Ação.`;

  const isEditMode = !!app.isEditable;
  const bar = document.createElement("div");
  bar.className = `malha-arcana-corruption-bar ${dangerClass}`;
  bar.setAttribute("data-tooltip", tooltipText);
  bar.setAttribute("data-tooltip-direction", "UP");

  if (isEditMode) {
    bar.innerHTML = `
      <div class="ma-bar-container">
        <div class="ma-bar-fill" style="width: ${(corruption / maxCorruption) * 100}%;"></div>
        <div class="ma-bar-text-edit">
          <span>Corrupção:</span>
          <input type="number" class="ma-corruption-input" min="0" max="20" value="${corruption}" title="Editar valor da Corrupção">
          <span>/ ${maxCorruption}</span>
        </div>
      </div>
      <a class="ma-purge-btn" data-tooltip="Gastar Ação para purgar -1 de Corrupção"><i class="fas fa-om"></i> 🧘</a>
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
      <div class="ma-bar-container">
        <div class="ma-bar-fill" style="width: ${(corruption / maxCorruption) * 100}%;"></div>
        <span class="ma-bar-text">Corrupção Atual: ${corruption}/${maxCorruption} (${dangerLabel})</span>
      </div>
      <a class="ma-purge-btn" data-tooltip="Gastar Ação para purgar -1 de Corrupção"><i class="fas fa-om"></i> 🧘</a>
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
});

// ─────────────────────────────────────────────────────────────────
// Auto-add Purge Feat para classes conjuradoras
// ─────────────────────────────────────────────────────────────────
Hooks.on("createItem", async (item, options, userId) => {
  if (game.user.id !== userId) return;
  if (!item.parent || item.parent.documentName !== "Actor") return;

  const actor = item.parent;
  if (item.type !== "class") return;
  const progression = item.system?.spellcasting?.progression;
  if (!progression || progression === "none") return;

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
  
  // Se a tabela ja existe com 100 resultados, nada precisa ser feito
  if (existing && existing.results.size >= 100) return;

  // Se ja existe uma tabela antiga com menos de 100 resultados, atualiza para a nova completa de 100
  if (existing) {
    console.log("malha-arcana | Atualizando tabela 'Ruptura Arcana' do mundo para os 100 efeitos unicos...");
    const results = RUPTURA_100_EFFECTS.map(item => ({
      type: 0,
      text: `<strong>${item.title}</strong><br/>${item.description}`,
      weight: 1,
      range: [item.roll, item.roll],
      drawn: false,
      img: "icons/magic/chaos/spell-strike-spark-purple.webp"
    }));
    await existing.deleteEmbeddedDocuments("TableResult", existing.results.map(r => r.id));
    await existing.createEmbeddedDocuments("TableResult", results);
    return;
  }

  // Se nao existe, cria com os 100 efeitos unicos
  const results = RUPTURA_100_EFFECTS.map(item => ({
    _id: "res" + String(item.roll).padStart(5, "0"),
    type: 0,
    text: `<strong>${item.title}</strong><br/>${item.description}`,
    weight: 1,
    range: [item.roll, item.roll],
    drawn: false,
    img: "icons/magic/chaos/spell-strike-spark-purple.webp"
  }));

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
  const baseDC = 10 + baseSpellLevel;
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
        <strong class="ma-preview-dc">${baseDC} (10 + Nível ${baseSpellLevel})</strong>
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

  // Insere antes dos botões de ação do diálogo
  const form = html.querySelector("form") || html;
  form.appendChild(previewBox);

  // Se o jogador alterar o slot no diálogo, atualiza a CD dinamicamente
  const slotSelect = html.querySelector('select[name="spell.slot"]');
  if (slotSelect) {
    slotSelect.addEventListener("change", (ev) => {
      let lvl = baseSpellLevel;
      const val = ev.target.value;
      const match = /^spell(\d+)$/.exec(val);
      if (match) lvl = parseInt(match[1], 10);
      else if (val === "pact") lvl = actor.system?.spells?.pact?.level || baseSpellLevel;

      const newDC = 10 + lvl;
      const dcEl = previewBox.querySelector(".ma-preview-dc");
      if (dcEl) dcEl.textContent = `${newDC} (10 + Nível ${lvl})`;
    });
  }
});