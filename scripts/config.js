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

    // Backlash Die Tier 1
    game.settings.register(MODULE_ID, "backlashDieTier1", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier1.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier1.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 4,
    });

    // Backlash Die Tier 2
    game.settings.register(MODULE_ID, "backlashDieTier2", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier2.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier2.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 6,
    });

    // Backlash Die Tier 3
    game.settings.register(MODULE_ID, "backlashDieTier3", {
      name: game.i18n.localize("malha-arcana.settings.backlashDieTier3.name"),
      hint: game.i18n.localize("malha-arcana.settings.backlashDieTier3.hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 8,
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
