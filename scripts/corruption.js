/**
 * CorruptionTracker — Gerencia o recurso de Corrupção nas fichas
 *
 * A Corrupção começa em 1 e vai até 20. Aumenta +1 por magia de 1º+ círculo.
 * Pode ser reduzida via "Ação: Purgar a Malha" (-1 por ação gasta).
 */

const MODULE_ID = "malha-arcana";

export class CorruptionTracker {
  /**
   * Get the current corruption value for an actor.
   * Reads from the custom resource field configured in settings.
   * @param {Actor} actor
   * @returns {number} Current corruption value (default 1 if not found)
   */
  static getCorruption(actor) {
    const resourceName = game.settings.get(MODULE_ID, "corruptionResourceName");
    const resourceNameLower = resourceName.toLowerCase();
    const resources = actor.system?.resources;

    if (!resources) return 1;

    // Search through primary, secondary, tertiary resources (case-insensitive)
    for (const key of ["primary", "secondary", "tertiary"]) {
      const res = resources[key];
      if (res && res.label && res.label.toLowerCase() === resourceNameLower) {
        return res.value ?? 1;
      }
    }

    // Fallback: check flags
    const flagVal = actor.getFlag(MODULE_ID, "corruption");
    if (flagVal !== undefined) return flagVal;

    return 1;
  }

  /**
   * Set the corruption value for an actor.
   * @param {Actor} actor
   * @param {number} value
   */
  static async setCorruption(actor, value) {
    const clampedValue = Math.max(0, Math.min(20, value));
    const resourceName = game.settings.get(MODULE_ID, "corruptionResourceName");
    const resourceNameLower = resourceName.toLowerCase();
    const resources = actor.system?.resources;

    if (resources) {
      for (const key of ["primary", "secondary", "tertiary"]) {
        const res = resources[key];
        if (res && res.label && res.label.toLowerCase() === resourceNameLower) {
          await actor.update({ [`system.resources.${key}.value`]: clampedValue });
          return;
        }
      }
    }

    // Fallback: store in flags
    await actor.setFlag(MODULE_ID, "corruption", clampedValue);
  }

  /**
   * Increment corruption by 1 (called when casting a leveled spell).
   * @param {Actor} actor
   * @returns {number} The new corruption value
   */
  static async incrementCorruption(actor) {
    const current = this.getCorruption(actor);
    const newValue = Math.min(20, current + 1);
    await this.setCorruption(actor, newValue);
    return newValue;
  }

  /**
   * Decrease corruption by 1 (called when using "Purgar a Malha").
   * @param {Actor} actor
   * @returns {number} The new corruption value
   */
  static async purgeCorruption(actor) {
    const current = this.getCorruption(actor);
    const newValue = Math.max(0, current - 1);
    await this.setCorruption(actor, newValue);
    return newValue;
  }
}
