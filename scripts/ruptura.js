import { RUPTURA_100_EFFECTS } from "./data/ruptura-effects.js";
/**
 * RupturaArcana — Tabela de Desastres Mágicos (1d100)
 */

import { ChatMessages } from "./chat-messages.js";

const MODULE_ID = "malha-arcana";

export class RupturaArcana {
  static async trigger(actor, castLevel, rawDie, corruption) {
    const roll = new Roll("1d100");
    await roll.evaluate();
    const d100Result = roll.total;

            const customTableName = game.settings.get(MODULE_ID, "customRupturaTable") || "Ruptura Arcana";
    let table = game.tables.getName(customTableName);
    if (!table && (customTableName.startsWith("Compendium.") || customTableName.startsWith("RollTable."))) {
      table = await fromUuid(customTableName);
    }
    if (table) {
      await table.draw({ roll, displayChat: true });
      return;
    }

    const effect = this.getEffect(d100Result);

    await ChatMessages.sendRupturaArcana(actor, castLevel, rawDie, corruption, d100Result, effect, roll);

    // Apply Active Effects automatically if specified
    if (effect.statusToApply && actor.toggleStatusEffect) {
      const statuses = Array.isArray(effect.statusToApply) ? effect.statusToApply : [effect.statusToApply];
      for (const status of statuses) {
        try {
          await actor.toggleStatusEffect(status, { active: true });
        } catch (err) {
          console.warn(`${MODULE_ID} | Não foi possível aplicar o status "${status}":`, err);
        }
      }
    }
  }

    static getEffect(d100) {
    const clamped = Math.max(1, Math.min(100, Math.round(d100)));
    const found = RUPTURA_100_EFFECTS.find(e => e.roll === clamped) || RUPTURA_100_EFFECTS[0];

    // Patamares visuais
    let tier = 1;
    let tierName = "Anomalia Sensorial";
    let tierColor = "#4a90d9";

    if (clamped >= 96) {
      tier = 5;
      tierName = "Colapso Total";
      tierColor = "#1a1a2e";
    } else if (clamped >= 76) {
      tier = 4;
      tierName = "Invasão Cósmica";
      tierColor = "#7b2d8e";
    } else if (clamped >= 51) {
      tier = 3;
      tierName = "Explosão Arcana";
      tierColor = "#d94a4a";
    } else if (clamped >= 26) {
      tier = 2;
      tierName = "Debilitação Tática";
      tierColor = "#e6a817";
    }

    return {
      tier,
      tierName,
      tierColor,
      range: `${clamped}`,
      title: found.title,
      description: found.description,
      statusToApply: null
    };
  }
}
