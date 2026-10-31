/**
 * MalhaArcanaConfig — Configurações do módulo
 */

const MODULE_ID = "malha-arcana";

export class MalhaArcanaConfig {
  static registerSettings() {
    // Track first run
    game.settings.register(MODULE_ID, "hasRunBefore", {
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    // Apply to NPCs toggle
    game.settings.register(MODULE_ID, "applyToNPCs", {
      name: game.i18n.localize("malha-arcana.settings.applyToNPCs.name"),
      hint: game.i18n.localize("malha-arcana.settings.applyToNPCs.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
    });

    // Corruption resource name
    game.settings.register(MODULE_ID, "corruptionResourceName", {
      name: game.i18n.localize("malha-arcana.settings.corruptionResourceName.name"),
      hint: game.i18n.localize("malha-arcana.settings.corruptionResourceName.hint"),
      scope: "world",
      config: true,
      type: String,
      default: "Corrupção",
    });

    // Backlash damage type
    game.settings.register(MODULE_ID, "backlashDamageType", {
      name: game.i18n.localize("malha-arcana.settings.backlashDamageType.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDamageType.hint"),
      scope: "world",
      config: true,
      type: String,
      default: "force",
      choices: {
        force: "Força (Force)",
        psychic: "Psíquico (Psychic)",
      },
    });

    // Show narrative flavor
    game.settings.register(MODULE_ID, "showNarrativeFlavor", {
      name: game.i18n.localize("malha-arcana.settings.showNarrativeFlavor.name"),
      hint: game.i18n.localize("malha-arcana.settings.showNarrativeFlavor.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Auto-apply backlash damage
    game.settings.register(MODULE_ID, "autoApplyBacklash", {
      name: game.i18n.localize("malha-arcana.settings.autoApplyBacklash.name"),
      hint: game.i18n.localize("malha-arcana.settings.autoApplyBacklash.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Auto-increment corruption
    game.settings.register(MODULE_ID, "autoIncrementCorruption", {
      name: game.i18n.localize("malha-arcana.settings.autoIncrementCorruption.name"),
      hint: game.i18n.localize("malha-arcana.settings.autoIncrementCorruption.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Only first attack check
    game.settings.register(MODULE_ID, "onlyFirstAttackCheck", {
      name: game.i18n.localize("malha-arcana.settings.onlyFirstAttackCheck.name"),
      hint: game.i18n.localize("malha-arcana.settings.onlyFirstAttackCheck.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

        const diceChoices = {
      2: "d2",
      4: "d4",
      6: "d6",
      8: "d8",
      10: "d10",
      12: "d12",
      20: "d20",
    };

    // Backlash Die Tier 1
    game.settings.register(MODULE_ID, "backlashDieTier1", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier1.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier1.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 4,
      choices: diceChoices,
    });

    // Backlash Die Tier 2
    game.settings.register(MODULE_ID, "backlashDieTier2", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier2.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier2.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 6,
      choices: diceChoices,
    });

    // Backlash Die Tier 3
    game.settings.register(MODULE_ID, "backlashDieTier3", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier3.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier3.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 8,
      choices: diceChoices,
    });

    // Disable spell slot consumption
    game.settings.register(MODULE_ID, "disableSpellSlots", {
      name: "Substituir Espaços de Magia (Malha Arcana)",
      hint: "Impede o consumo de espaços de magia ao conjurar, tornando a magia 100% dependente do teste da Malha.",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Auto-apply Active Effects on Ruptura
    game.settings.register(MODULE_ID, "autoApplyActiveEffects", {
      name: game.i18n.localize("malha-arcana.settings.autoApplyActiveEffects.name"),
      hint: game.i18n.localize("malha-arcana.settings.autoApplyActiveEffects.hint"),
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });

    // Short Rest Corruption Reduction
    game.settings.register(MODULE_ID, "shortRestCorruptionReduction", {
      name: game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.name"),
      hint: game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.hint"),
      scope: "world",
      config: true,
      type: String,
      default: "0",
      choices: {
        "0": game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.none"),
        "1": game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.one"),
        "half": game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.half"),
        "1d4": game.i18n.localize("malha-arcana.settings.shortRestCorruptionReduction.die1d4"),
      },
    });

    // Long Rest Corruption Reduction
    game.settings.register(MODULE_ID, "longRestCorruptionReduction", {
      name: game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.name"),
      hint: game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.hint"),
      scope: "world",
      config: true,
      type: String,
      default: "reset",
      choices: {
        "reset": game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.reset"),
        "half": game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.half"),
        "5": game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.five"),
        "none": game.i18n.localize("malha-arcana.settings.longRestCorruptionReduction.none"),
      },
    });

    // Custom Ruptura Table
    game.settings.register(MODULE_ID, "customRupturaTable", {
      name: "Tabela de Ruptura Customizada",
      hint: "Nome ou UUID da RollTable a ser rolada em vez da tabela padrão.",
      scope: "world",
      config: true,
      type: String,
      default: "",
    });
  }
}
