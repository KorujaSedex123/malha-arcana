/**
 * Malha Arcana — Sistema Alternativo de Magia para D&D 5e no Foundry VTT
 *
 * Substitui espaços de magia por testes de conjuração com CD = 10 + Nível da Magia.
 * Inclui mecânicas de Corrupção, Ruptura Arcana e Dano de Rebote.
 */

import { MalhaArcanaConfig } from "./config.js";
import { MalhaArcanaRoller } from "./roller.js";
import { RupturaArcana } from "./ruptura.js";
import { ChatMessages } from "./chat-messages.js";
import { CorruptionTracker } from "./corruption.js";

const MODULE_ID = "malha-arcana";

Hooks.once("init", async function () {
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

  // Notify only GMs on first activation
  if (game.user.isGM) {
    const firstRun = !game.settings.get(MODULE_ID, "hasRunBefore");
    if (firstRun) {
      ui.notifications.info(
        game.i18n.localize("malha-arcana.firstrun")
      );
      game.settings.set(MODULE_ID, "hasRunBefore", true);
    }
  }
});

// ─────────────────────────────────────────────────────────────────
// Hook: Intercept spell usage from the dnd5e system
//
// We use dnd5e.preUseItem to tag leveled spells, and dnd5e.useItem
// to run the actual check after the system processes the spell.
//
// For dnd5e v3+ / v4+ (Activity-based), these hooks may need to be
// adapted to dnd5e.preUseActivity / dnd5e.useActivity.
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.preUseItem", (item, config, options) => {
  const actor = item.actor;
  if (!actor) return true;

  // Intercept "Ação: Purgar a Malha" feature
  if (item.name === "Ação: Purgar a Malha" || item.name === "Purgar a Malha") {
    const oldCorruption = CorruptionTracker.getCorruption(actor);
    if (oldCorruption <= 0) {
      ui.notifications.info(game.i18n.format("malha-arcana.purge.notification.none", { name: actor.name }));
    } else {
      CorruptionTracker.purgeCorruption(actor).then(newCorruption => {
        ChatMessages.sendPurgeMessage(actor, oldCorruption, newCorruption);
      });
    }
    return false; // blocks default execution
  }

  // Only intercept spells
  if (item.type !== "spell") return true;

  // Only apply to player-owned characters (not NPCs, unless setting enabled)
  if (actor.type !== "character" && !game.settings.get(MODULE_ID, "applyToNPCs")) {
    return true;
  }

  const spellLevel = item.system?.level ?? 0;

  // Cantrips (level 0) are safe — let them proceed normally
  if (spellLevel === 0) return true;

  // For leveled spells, store context on options for the useItem hook.
  options.malhaArcana = {
    spellLevel,
    spellName: item.name,
    actorId: actor.id,
    itemId: item.id,
  };

  return true;
});

// ─────────────────────────────────────────────────────────────────
const pendingSpellAttacks = new Map();

// Hook: After a spell is used — run the Malha Arcana check
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.useItem", async (item, config, options) => {
  const actor = item.actor;
  if (!actor) return;

  if (item.type !== "spell") return;

  if (actor.type !== "character" && !game.settings.get(MODULE_ID, "applyToNPCs")) return;

  const spellLevel = item.system?.level ?? 0;

  // Cantrips — safe, just post a flavor message
  if (spellLevel === 0) {
    await ChatMessages.sendCantripSafe(actor, item);
    return;
  }

  // Determine the cast level (upcast support)
  const castLevel = _resolveSlotLevel(config, options, spellLevel);
  const effectiveCastLevel = Math.max(spellLevel, castLevel);

  // Determine if this is an attack spell or a save spell
  const isAttackSpell = item.system?.actionType === "msak" || item.system?.actionType === "rsak";
  const isSaveSpell = !!(item.system?.save?.ability && item.system?.save?.ability !== "");

  // If it's an attack spell, we only set a flag to process on attack roll
  if (isAttackSpell) {
    pendingSpellAttacks.set(item.id, {
      castLevel: effectiveCastLevel,
      lastTurnProcessed: null
    });
    // Let the player know to roll the attack
    ui.notifications.info(game.i18n.format("malha-arcana.roll.attackPrompt", { name: item.name }));
    return;
  }

  // Run the Malha Arcana check for save/utility spells
  await MalhaArcanaRoller.executeCheck(actor, item, effectiveCastLevel, isAttackSpell, isSaveSpell);
});

// ─────────────────────────────────────────────────────────────────
// Hook: When an attack roll is made — process Malha Arcana for attack spells
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.rollAttack", async (itemOrActivity, roll, ...args) => {
  const isV4 = itemOrActivity.item !== undefined;
  const item = isV4 ? itemOrActivity.item : itemOrActivity;
  if (!item) return;

  if (item.type !== "spell") return;
  const actor = item.actor;
  if (!actor || (actor.type !== "character" && !game.settings.get(MODULE_ID, "applyToNPCs"))) return;

  const spellLevel = item.system?.level ?? 0;
  if (spellLevel === 0) return; // Cantrips are safe
  
  if (!pendingSpellAttacks.has(item.id)) return;
  const pending = pendingSpellAttacks.get(item.id);

  if (game.settings.get(MODULE_ID, "onlyFirstAttackCheck")) {
    const currentTurnId = game.combat ? `${game.combat.id}-${game.combat.round}-${game.combat.turn}` : "out-of-combat";
    if (currentTurnId === "out-of-combat") {
      if (pending.lastTurnProcessed === "out-of-combat") return;
      pending.lastTurnProcessed = "out-of-combat";
    } else {
      if (pending.lastTurnProcessed === currentTurnId) return;
      pending.lastTurnProcessed = currentTurnId;
    }
  }

  // Process the attack roll as the Malha Arcana check
  await MalhaArcanaRoller.executeAttackCheck(actor, item, roll, pending.castLevel);
});

/**
 * Resolve the slot level used for casting across different dnd5e versions.
 * @param {object} config - Hook config argument
 * @param {object} options - Hook options argument
 * @param {number} spellLevel - Base spell level as fallback
 * @returns {number} The resolved slot level
 */
function _resolveSlotLevel(config, options, spellLevel) {
  // dnd5e 2.x: config.consumeSpellLevel (string like "3")
  if (config?.consumeSpellLevel != null) {
    const parsed = parseInt(config.consumeSpellLevel, 10);
    if (!isNaN(parsed)) return parsed;
  }
  // dnd5e 2.x/3.x: config.slotLevel
  if (config?.slotLevel != null) {
    const parsed = typeof config.slotLevel === "number" ? config.slotLevel : parseInt(config.slotLevel, 10);
    if (!isNaN(parsed)) return parsed;
  }
  // Fallback: options.slotLevel
  if (options?.slotLevel != null) {
    const parsed = typeof options.slotLevel === "number" ? options.slotLevel : parseInt(options.slotLevel, 10);
    if (!isNaN(parsed)) return parsed;
  }
  return spellLevel;
}

// ─────────────────────────────────────────────────────────────────
// Task 1: UI Injection on Actor Sheet
// ─────────────────────────────────────────────────────────────────
Hooks.on("renderActorSheet5eCharacter", (app, html, data) => {
  const actor = app.actor;
  if (!actor) return;
  
  const spellbookTab = html.find('.tab.spellbook');
  if (!spellbookTab.length) return;

  const corruption = CorruptionTracker.getCorruption(actor);
  const maxCorruption = 20;

  const uiHtml = `
    <div class="malha-arcana-corruption-bar">
      <div class="ma-bar-container">
        <div class="ma-bar-fill" style="width: ${(corruption / maxCorruption) * 100}%;"></div>
        <span class="ma-bar-text">Corrupção Atual: ${corruption}/${maxCorruption}</span>
      </div>
      <a class="ma-purge-btn" title="Purgar a Malha"><i class="fas fa-om"></i> 🧘</a>
    </div>
  `;

  spellbookTab.prepend(uiHtml);

  html.find('.ma-purge-btn').click(async (ev) => {
    ev.preventDefault();
    const featName1 = "Ação: Purgar a Malha";
    const featName2 = "Purgar a Malha";
    const feat = actor.items.find(i => i.type === "feat" && (i.name === featName1 || i.name === featName2));

    if (feat) {
      feat.use();
    } else {
      if (corruption <= 0) {
        ui.notifications.info(game.i18n.format("malha-arcana.purge.notification.none", { name: actor.name }));
      } else {
        CorruptionTracker.purgeCorruption(actor).then(newCorruption => {
          ChatMessages.sendPurgeMessage(actor, corruption, newCorruption);
        });
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────
// Task 4: Auto-add Purge Feat
// ─────────────────────────────────────────────────────────────────
Hooks.on("createItem", async (item, options, userId) => {
  if (game.user.id !== userId) return;
  if (!item.parent || item.parent.documentName !== "Actor") return;
  
  const actor = item.parent;
  if (item.type === "class" && item.system?.spellcasting?.progression) {
    if (item.system.spellcasting.progression !== "none") {
      const featName1 = "Ação: Purgar a Malha";
      const featName2 = "Purgar a Malha";
      const hasFeat = actor.items.some(i => i.type === "feat" && (i.name === featName1 || i.name === featName2));
      
      if (!hasFeat) {
        await Item.create({
          name: "Ação: Purgar a Malha",
          type: "feat",
          img: "icons/magic/light/explosion-star-glow-silhouette.webp",
          system: {
            description: { value: "Uma ação para purgar a corrupção da Malha Arcana." },
            activation: { type: "action", cost: 1 }
          }
        }, { parent: actor });
        ui.notifications.info(`Ação "Purgar a Malha" adicionada automaticamente a ${actor.name}.`);
      }
    }
  }
});

// ─────────────────────────────────────────────────────────────────
// Task 2: dnd5e v4+ Activity Hooks
// ─────────────────────────────────────────────────────────────────
Hooks.on("dnd5e.preUseActivity", (activity, usageConfig, dialogConfig, messageConfig) => {
  const item = activity.item;
  if (!item) return true;
  const actor = item.actor;
  if (!actor) return true;

  // Intercept "Ação: Purgar a Malha" feature
  if (item.name === "Ação: Purgar a Malha" || item.name === "Purgar a Malha") {
    const oldCorruption = CorruptionTracker.getCorruption(actor);
    if (oldCorruption <= 0) {
      ui.notifications.info(game.i18n.format("malha-arcana.purge.notification.none", { name: actor.name }));
    } else {
      CorruptionTracker.purgeCorruption(actor).then(newCorruption => {
        ChatMessages.sendPurgeMessage(actor, oldCorruption, newCorruption);
      });
    }
    return false; // blocks default execution
  }

  if (item.type !== "spell") return true;
  if (actor.type !== "character" && !game.settings.get(MODULE_ID, "applyToNPCs")) return true;

  const spellLevel = item.system?.level ?? 0;
  if (spellLevel === 0) return true;

  return true;
});

Hooks.on("dnd5e.postUseActivity", async (activity, usageConfig, results) => {
  const item = activity.item;
  if (!item) return;
  const actor = item.actor;
  if (!actor) return;

  if (item.type !== "spell") return;
  if (actor.type !== "character" && !game.settings.get(MODULE_ID, "applyToNPCs")) return;

  const spellLevel = item.system?.level ?? 0;
  if (spellLevel === 0) {
    await ChatMessages.sendCantripSafe(actor, item);
    return;
  }

  let castLevel = spellLevel;
  if (usageConfig?.spell?.slot) {
    let slotStr = usageConfig.spell.slot;
    if (slotStr.startsWith("spell")) {
      castLevel = parseInt(slotStr.replace("spell", ""), 10);
    } else if (slotStr === "pact") {
      castLevel = actor.system?.spells?.pact?.level || spellLevel;
    }
  }
  const effectiveCastLevel = Math.max(spellLevel, castLevel);

  const isAttackSpell = activity.type === "attack";
  const isSaveSpell = activity.type === "save";

  if (isAttackSpell) {
    pendingSpellAttacks.set(item.id, {
      castLevel: effectiveCastLevel,
      lastTurnProcessed: null
    });
    ui.notifications.info(game.i18n.format("malha-arcana.roll.attackPrompt", { name: item.name }));
    return;
  }

  await MalhaArcanaRoller.executeCheck(actor, item, effectiveCastLevel, isAttackSpell, isSaveSpell);
});

