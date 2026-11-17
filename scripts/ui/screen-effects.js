/**
 * ScreenEffects — Efeitos visuais de tela / Shader FX da Malha Arcana
 *
 * Exibe vinheta arroxeada/cósmica e distorção na tela do jogador quando a
 * Corrupção Arcana do personagem controlado atinge níveis perigosos.
 */

import { CorruptionTracker } from "../corruption.js";
import { isSpellcaster } from "../integrations/monks-tokenbar.js";

const MODULE_ID = "malha-arcana";
const VIGNETTE_ID = "malha-screen-vignette";

export class ScreenEffects {
  static init() {
    Hooks.once("ready", () => {
      this._ensureVignetteElement();
      this.refresh();
    });

    Hooks.on("controlToken", () => {
      this.refresh();
    });

    Hooks.on("updateActor", (actor) => {
      const activeActor = this.getActiveActor();
      if (activeActor && activeActor.id === actor.id) {
        this.refresh();
      }
    });

    Hooks.on("canvasReady", () => {
      this.refresh();
    });
  }

  static isEnabled() {
    try {
      return game.settings.get(MODULE_ID, "enableScreenEffects");
    } catch {
      return true;
    }
  }

  static getActiveActor() {
    // 1. Token atualmente controlado pelo usuário (com permissão de observador ou dono)
    const controlled = canvas?.tokens?.controlled || [];
    if (controlled.length === 1) {
      const actor = controlled[0].actor;
      if (actor && (actor.isOwner || game.user.isGM)) return actor;
    }

    // 2. Personagem padrão do usuário (Player Character)
    if (game.user.character) {
      return game.user.character;
    }

    return null;
  }

  static _ensureVignetteElement() {
    let el = document.getElementById(VIGNETTE_ID);
    if (!el && document.body) {
      el = document.createElement("div");
      el.id = VIGNETTE_ID;
      el.className = "malha-screen-vignette-overlay";
      document.body.appendChild(el);
    }
    return el;
  }

  static refresh() {
    const el = this._ensureVignetteElement();
    if (!el) return;

    if (!this.isEnabled()) {
      el.className = "malha-screen-vignette-overlay";
      return;
    }

    const actor = this.getActiveActor();
    if (!actor || !isSpellcaster(actor)) {
      el.className = "malha-screen-vignette-overlay";
      return;
    }

    const corruption = CorruptionTracker.getCorruption(actor);
    this.applyCorruptionStage(corruption);
  }

  static applyCorruptionStage(corruption) {
    const el = this._ensureVignetteElement();
    if (!el) return;

    el.classList.remove("ma-vignette-instavel", "ma-vignette-critico", "ma-vignette-catastrofico");

    if (corruption >= 16) {
      el.classList.add("ma-vignette-catastrofico");
    } else if (corruption >= 11) {
      el.classList.add("ma-vignette-critico");
    } else if (corruption >= 6) {
      el.classList.add("ma-vignette-instavel");
    }
  }

  /**
   * Dispara um flash ou pulso temporário na tela (útil em Rupturas Arcanas ou surtos de dano)
   * @param {string} [color="#a855f7"]
   * @param {number} [duration=600]
   */
  static triggerScreenPulse(color = "#a855f7", duration = 600) {
    if (!this.isEnabled()) return;
    const pulseEl = document.createElement("div");
    pulseEl.className = "malha-screen-pulse";
    pulseEl.style.backgroundColor = color;
    document.body.appendChild(pulseEl);

    setTimeout(() => {
      pulseEl.classList.add("fade-out");
      setTimeout(() => pulseEl.remove(), duration);
    }, 50);
  }
}
