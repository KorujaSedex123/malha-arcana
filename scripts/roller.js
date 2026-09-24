/**
 * MalhaArcanaRoller — Motor de Rolagem do sistema de conjuração
 *
 * Mecânica base: 1d20 + Modificador de Conjuração + Proficiência
 * CD para manifestar = 10 + Nível da Magia (cast level, incluindo upcast)
 *
 * Magias de Ataque: Usa a rolagem de ataque — o valor total define
 *   se superou a CD da magia E se superou a CA do alvo.
 * Magias de Área/Salvaguarda: Teste de Habilidade de Conjuração.
 *   Se passar, os inimigos fazem testes de resistência normalmente.
 *
 * Falha: Dano de Rebote (irredutível) escalonado por patamar.
 * Truques: Falha gasta a ação mas sem dano de rebote.
 */

import { CorruptionTracker } from "./corruption.js";
import { RupturaArcana } from "./ruptura.js";
import { ChatMessages } from "./chat-messages.js";

const MODULE_ID = "malha-arcana";

export class MalhaArcanaRoller {
  /**
   * Execute the Malha Arcana spellcasting check.
   * @param {Actor} actor - The casting actor
   * @param {Item} item - The spell item
   * @param {number} castLevel - The effective cast level (with upcast)
   * @param {boolean} isAttackSpell - Whether this is an attack spell
   * @param {boolean} isSaveSpell - Whether this targets saves
   */
  static async executeCheck(actor, item, castLevel, isAttackSpell, isSaveSpell) {
    // Calculate DC: always 10 + spell level
    const spellDC = 10 + castLevel;

    // Get spellcasting modifier and proficiency bonus
    const spellcastingAbility = actor.system?.attributes?.spellcasting || "int";
    const abilityMod = actor.system?.abilities?.[spellcastingAbility]?.mod ?? 0;
    const profBonus = actor.system?.attributes?.prof ?? 0;
    const totalMod = abilityMod + profBonus;

    // Read corruption BEFORE incrementing — the current spell should be
    // checked against the corruption level when the cast begins, not after
    // this spell has already added its own point.
    const corruptionBeforeCast = CorruptionTracker.getCorruption(actor);

    // Increment corruption (auto if setting enabled)
    let currentCorruption;
    if (game.settings.get(MODULE_ID, "autoIncrementCorruption")) {
      currentCorruption = await CorruptionTracker.incrementCorruption(actor);
    } else {
      currentCorruption = corruptionBeforeCast;
    }

    // Roll the d20
    const roll = new Roll("1d20");
    await roll.evaluate();
    const rawDie = roll.dice[0].results[0].result;
    const totalRoll = rawDie + totalMod;

    // Determine success or failure
    const success = totalRoll >= spellDC;

    // Check corruption margin against current (updated) value:
    // raw die <= corruption = Arcane Rupture
    const corruptionTriggered = rawDie <= currentCorruption && castLevel > 0;

    // Build the result object
    const result = {
      actor,
      item,
      castLevel,
      spellDC,
      rawDie,
      totalRoll,
      totalMod,
      abilityMod,
      profBonus,
      spellcastingAbility,
      success,
      isAttackSpell,
      isSaveSpell,
      corruption: currentCorruption,
      corruptionTriggered,
    };

    // Send the main check message
    await ChatMessages.sendCheckResult(result);

    // Handle outcomes
    if (corruptionTriggered) {
      // Ruptura Arcana! Ignore normal backlash — roll on the disaster table
      await RupturaArcana.trigger(actor, castLevel, rawDie, currentCorruption);
    } else if (!success) {
      // Normal failure — backlash damage
      await this.applyBacklash(actor, item, castLevel);
    }
    // Success — spell manifests normally. For attack spells the total
    // also counts as the attack roll (handled by the chat message).
  }

  /**
   * Execute the Malha Arcana check using an existing attack roll.
   * @param {Actor} actor
   * @param {Item} item
   * @param {Roll} roll - The attack roll object
   * @param {number} castLevel - The spell cast level
   */
  static async executeAttackCheck(actor, item, roll, castLevel) {
    let currentCorruption = CorruptionTracker.getCorruption(actor);
    if (game.settings.get(MODULE_ID, "autoIncrementCorruption") && castLevel > 0) {
      currentCorruption = await CorruptionTracker.incrementCorruption(actor);
    }
    
    // Extract raw die from the roll
    const d20Term = roll.terms ? roll.terms.find(t => t.faces === 20) : null;
    const rawDie = d20Term ? d20Term.results.find(r => r.active).result : roll.dice[0].results[0].result;
    const totalRoll = roll.total;
    const spellDC = 10 + castLevel;
    const success = totalRoll >= spellDC;
    
    const corruptionTriggered = rawDie <= currentCorruption && castLevel > 0;
    
    const result = {
      actor,
      item,
      castLevel,
      spellDC,
      rawDie,
      totalRoll,
      totalMod: totalRoll - rawDie,
      abilityMod: 0,
      profBonus: 0,
      spellcastingAbility: actor.system?.attributes?.spellcasting || "int",
      success,
      isAttackSpell: true,
      isSaveSpell: false,
      corruption: currentCorruption,
      corruptionTriggered,
    };

    await ChatMessages.sendCheckResult(result);

    if (corruptionTriggered) {
      await RupturaArcana.trigger(actor, castLevel, rawDie, currentCorruption);
    } else if (!success) {
      await this.applyBacklash(actor, item, castLevel);
    }
  }

  /**
   * Calculate and apply backlash damage on a failed check.
   * Cantrips do NOT cause backlash.
   *
   * Damage scaling:
   *   1st-3rd: 1d4 per spell level
   *   4th-6th: 1d6 per spell level
   *   7th-9th: 1d8 per spell level
   *
   * @param {Actor} actor
   * @param {Item} item
   * @param {number} castLevel
   */
  static async applyBacklash(actor, item, castLevel) {
    if (castLevel === 0) return; // Cantrips are safe

    // Determine die size
    let dieSize;
    if (castLevel <= 3) dieSize = game.settings.get(MODULE_ID, "backlashDieTier1");
    else if (castLevel <= 6) dieSize = game.settings.get(MODULE_ID, "backlashDieTier2");
    else dieSize = game.settings.get(MODULE_ID, "backlashDieTier3");

    const formula = `${castLevel}d${dieSize}`;
    const damageType = game.settings.get(MODULE_ID, "backlashDamageType");

    const damageRoll = new Roll(formula);
    await damageRoll.evaluate();
    const totalDamage = damageRoll.total;

    // Narrative flavor based on class
    let narrativeFlavor = "";
    if (game.settings.get(MODULE_ID, "showNarrativeFlavor")) {
      narrativeFlavor = this.getNarrativeFlavor(actor);
    }

    // Send backlash message
    await ChatMessages.sendBacklashDamage(actor, item, castLevel, formula, totalDamage, damageType, damageRoll, narrativeFlavor);

    // Auto-apply damage if enabled
    if (game.settings.get(MODULE_ID, "autoApplyBacklash")) {
      const hp = actor.system?.attributes?.hp || {};
      let remainingDamage = totalDamage;
      const updates = {};
      
      if (hp.temp > 0) {
        if (hp.temp >= remainingDamage) {
          updates["system.attributes.hp.temp"] = hp.temp - remainingDamage;
          remainingDamage = 0;
        } else {
          remainingDamage -= hp.temp;
          updates["system.attributes.hp.temp"] = 0;
        }
      }
      
      if (remainingDamage > 0) {
        const currentHP = hp.value ?? 0;
        updates["system.attributes.hp.value"] = Math.max(0, currentHP - remainingDamage);
      }
      
      if (Object.keys(updates).length > 0) {
        await actor.update(updates);
      }
    }
  }

  /**
   * Generate narrative flavor text based on the character's class.
   * @param {Actor} actor
   * @returns {string} Narrative flavor text
   */
  static getNarrativeFlavor(actor) {
    const classes = actor.items?.filter((i) => i.type === "class") ?? [];
    const className = classes[0]?.name?.toLowerCase() ?? "";

    const flavors = {
      bruxo: game.i18n.localize("malha-arcana.flavor.warlock"),
      warlock: game.i18n.localize("malha-arcana.flavor.warlock"),
      clérigo: game.i18n.localize("malha-arcana.flavor.cleric"),
      cleric: game.i18n.localize("malha-arcana.flavor.cleric"),
      mago: game.i18n.localize("malha-arcana.flavor.wizard"),
      wizard: game.i18n.localize("malha-arcana.flavor.wizard"),
      feiticeiro: game.i18n.localize("malha-arcana.flavor.sorcerer"),
      sorcerer: game.i18n.localize("malha-arcana.flavor.sorcerer"),
      druida: game.i18n.localize("malha-arcana.flavor.druid"),
      druid: game.i18n.localize("malha-arcana.flavor.druid"),
      bardo: game.i18n.localize("malha-arcana.flavor.bard"),
      bard: game.i18n.localize("malha-arcana.flavor.bard"),
      paladino: game.i18n.localize("malha-arcana.flavor.paladin"),
      paladin: game.i18n.localize("malha-arcana.flavor.paladin"),
      ranger: game.i18n.localize("malha-arcana.flavor.ranger"),
      patrulheiro: game.i18n.localize("malha-arcana.flavor.ranger"),
      artífice: game.i18n.localize("malha-arcana.flavor.artificer"),
      artificer: game.i18n.localize("malha-arcana.flavor.artificer"),
    };

    return flavors[className] || game.i18n.localize("malha-arcana.flavor.default");
  }
}
