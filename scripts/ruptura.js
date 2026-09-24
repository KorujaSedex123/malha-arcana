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

    const customTableName = game.settings.get(MODULE_ID, "customRupturaTable");
    if (customTableName) {
      let table = game.tables.getName(customTableName);
      if (!table && (customTableName.startsWith("Compendium.") || customTableName.startsWith("RollTable."))) {
        table = await fromUuid(customTableName);
      }
      if (table) {
        await table.draw({ roll, displayChat: true });
        return;
      }
    }

    const effect = this.getEffect(d100Result);

    await ChatMessages.sendRupturaArcana(actor, castLevel, rawDie, corruption, d100Result, effect, roll);

    // Apply Active Effects automatically if specified
    if (effect.statusToApply && actor.toggleStatusEffect) {
      const statuses = Array.isArray(effect.statusToApply) ? effect.statusToApply : [effect.statusToApply];
      for (const status of statuses) {
        await actor.toggleStatusEffect(status, { active: true });
      }
    }
  }

  static getEffect(d100) {
    if (d100 <= 25) {
      return this.getAnomaliasSensoriais(d100);
    } else if (d100 <= 50) {
      return this.getDebilitacoesTaticas(d100);
    } else if (d100 <= 75) {
      return this.getExplosoes(d100);
    } else if (d100 <= 95) {
      return this.getInvasoesCósmicas(d100);
    } else {
      return this.getColapsoTotal(d100);
    }
  }

  static getAnomaliasSensoriais(d100) {
    const effects = [
      {
        range: "01-05",
        title: game.i18n.localize("malha-arcana.ruptura.01_05.title"),
        description: game.i18n.localize("malha-arcana.ruptura.01_05.desc"),
        statusToApply: null,
      },
      {
        range: "06-10",
        title: game.i18n.localize("malha-arcana.ruptura.06_10.title"),
        description: game.i18n.localize("malha-arcana.ruptura.06_10.desc"),
        statusToApply: null,
      },
      {
        range: "11-15",
        title: game.i18n.localize("malha-arcana.ruptura.11_15.title"),
        description: game.i18n.localize("malha-arcana.ruptura.11_15.desc"),
        statusToApply: null,
      },
      {
        range: "16-20",
        title: game.i18n.localize("malha-arcana.ruptura.16_20.title"),
        description: game.i18n.localize("malha-arcana.ruptura.16_20.desc"),
        statusToApply: null,
      },
      {
        range: "21-25",
        title: game.i18n.localize("malha-arcana.ruptura.21_25.title"),
        description: game.i18n.localize("malha-arcana.ruptura.21_25.desc"),
        statusToApply: ["blinded", "deafened"],
      },
    ];
    const index = Math.min(Math.floor((d100 - 1) / 5), effects.length - 1);
    return { tier: 1, tierName: game.i18n.localize("malha-arcana.ruptura.tier1"), tierColor: "#4a90d9", ...effects[index] };
  }

  static getDebilitacoesTaticas(d100) {
    const effects = [
      {
        range: "26-30",
        title: game.i18n.localize("malha-arcana.ruptura.26_30.title"),
        description: game.i18n.localize("malha-arcana.ruptura.26_30.desc"),
        statusToApply: "blinded",
      },
      {
        range: "31-35",
        title: game.i18n.localize("malha-arcana.ruptura.31_35.title"),
        description: game.i18n.localize("malha-arcana.ruptura.31_35.desc"),
        statusToApply: "silenced",
      },
      {
        range: "36-40",
        title: game.i18n.localize("malha-arcana.ruptura.36_40.title"),
        description: game.i18n.localize("malha-arcana.ruptura.36_40.desc"),
        statusToApply: null,
      },
      {
        range: "41-45",
        title: game.i18n.localize("malha-arcana.ruptura.41_45.title"),
        description: game.i18n.localize("malha-arcana.ruptura.41_45.desc"),
        statusToApply: "restrained",
      },
      {
        range: "46-50",
        title: game.i18n.localize("malha-arcana.ruptura.46_50.title"),
        description: game.i18n.localize("malha-arcana.ruptura.46_50.desc"),
        statusToApply: null,
      },
    ];
    const index = Math.min(Math.floor((d100 - 26) / 5), effects.length - 1);
    return { tier: 2, tierName: game.i18n.localize("malha-arcana.ruptura.tier2"), tierColor: "#e6a817", ...effects[index] };
  }

  static getExplosoes(d100) {
    const effects = [
      {
        range: "51-55",
        title: game.i18n.localize("malha-arcana.ruptura.51_55.title"),
        description: game.i18n.localize("malha-arcana.ruptura.51_55.desc"),
        statusToApply: null,
      },
      {
        range: "56-60",
        title: game.i18n.localize("malha-arcana.ruptura.56_60.title"),
        description: game.i18n.localize("malha-arcana.ruptura.56_60.desc"),
        statusToApply: "stunned", // Apply to self since we can only auto-apply to the caster reliably
      },
      {
        range: "61-65",
        title: game.i18n.localize("malha-arcana.ruptura.61_65.title"),
        description: game.i18n.localize("malha-arcana.ruptura.61_65.desc"),
        statusToApply: null,
      },
      {
        range: "66-70",
        title: game.i18n.localize("malha-arcana.ruptura.66_70.title"),
        description: game.i18n.localize("malha-arcana.ruptura.66_70.desc"),
        statusToApply: "prone",
      },
      {
        range: "71-75",
        title: game.i18n.localize("malha-arcana.ruptura.71_75.title"),
        description: game.i18n.localize("malha-arcana.ruptura.71_75.desc"),
        statusToApply: null,
      },
    ];
    const index = Math.min(Math.floor((d100 - 51) / 5), effects.length - 1);
    return { tier: 3, tierName: game.i18n.localize("malha-arcana.ruptura.tier3"), tierColor: "#d94a4a", ...effects[index] };
  }

  static getInvasoesCósmicas(d100) {
    const effects = [
      {
        range: "76-80",
        title: game.i18n.localize("malha-arcana.ruptura.76_80.title"),
        description: game.i18n.localize("malha-arcana.ruptura.76_80.desc"),
        statusToApply: null,
      },
      {
        range: "81-85",
        title: game.i18n.localize("malha-arcana.ruptura.81_85.title"),
        description: game.i18n.localize("malha-arcana.ruptura.81_85.desc"),
        statusToApply: null,
      },
      {
        range: "86-90",
        title: game.i18n.localize("malha-arcana.ruptura.86_90.title"),
        description: game.i18n.localize("malha-arcana.ruptura.86_90.desc"),
        statusToApply: null,
      },
      {
        range: "91-95",
        title: game.i18n.localize("malha-arcana.ruptura.91_95.title"),
        description: game.i18n.localize("malha-arcana.ruptura.91_95.desc"),
        statusToApply: null,
      },
    ];
    const index = Math.min(Math.floor((d100 - 76) / 5), effects.length - 1);
    return { tier: 4, tierName: game.i18n.localize("malha-arcana.ruptura.tier4"), tierColor: "#7b2d8e", ...effects[index] };
  }

  static getColapsoTotal(d100) {
    const effects = [
      {
        range: "96-97",
        title: game.i18n.localize("malha-arcana.ruptura.96_97.title"),
        description: game.i18n.localize("malha-arcana.ruptura.96_97.desc"),
        statusToApply: "unconscious",
      },
      {
        range: "98-99",
        title: game.i18n.localize("malha-arcana.ruptura.98_99.title"),
        description: game.i18n.localize("malha-arcana.ruptura.98_99.desc"),
        statusToApply: null,
      },
      {
        range: "100",
        title: game.i18n.localize("malha-arcana.ruptura.100.title"),
        description: game.i18n.localize("malha-arcana.ruptura.100.desc"),
        statusToApply: null, // Custom DM possession
      },
    ];

    if (d100 <= 97) return { tier: 5, tierName: game.i18n.localize("malha-arcana.ruptura.tier5"), tierColor: "#1a1a2e", ...effects[0] };
    if (d100 <= 99) return { tier: 5, tierName: game.i18n.localize("malha-arcana.ruptura.tier5"), tierColor: "#1a1a2e", ...effects[1] };
    return { tier: 5, tierName: game.i18n.localize("malha-arcana.ruptura.tier5"), tierColor: "#1a1a2e", ...effects[2] };
  }
}
