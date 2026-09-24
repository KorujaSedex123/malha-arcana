/**
 * ChatMessages — Gerencia todas as mensagens de chat do módulo Malha Arcana
 */

const MODULE_ID = "malha-arcana";

export class ChatMessages {
  // ─── Cantrip safe message ──────────────────────────────────────
  static async sendCantripSafe(actor, item) {
    const content = `
      <div class="malha-arcana-card malha-cantrip">
        <div class="malha-header malha-header-safe">
          <h3>🔮 ${game.i18n.localize("malha-arcana.cantrip.title")}</h3>
        </div>
        <div class="malha-body">
          <p><strong>${actor.name}</strong> ${game.i18n.localize("malha-arcana.cantrip.info")}</p>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      flags: { [MODULE_ID]: { type: "cantrip" } },
    });
  }

  // ─── Main spellcasting check result ────────────────────────────
  static async sendCheckResult(result) {
    const {
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
      corruption,
      corruptionTriggered,
    } = result;

    const abilityLabel = this.getAbilityLabel(spellcastingAbility);
    const modSign = totalMod >= 0 ? "+" : "";
    const upcastNote = castLevel > (item.system?.level ?? 0)
      ? ` <span class="malha-upcast">(Upcast ${castLevel})</span>`
      : "";

    let outcomeHTML;
    let headerClass;

    if (corruptionTriggered) {
      headerClass = "malha-header-ruptura";
      outcomeHTML = `
        <div class="malha-outcome malha-outcome-ruptura">
          <p class="malha-ruptura-alert">⚡ ${game.i18n.localize("malha-arcana.check.ruptura")} ⚡</p>
        </div>
      `;
    } else if (success) {
      headerClass = "malha-header-success";
      outcomeHTML = `
        <div class="malha-outcome malha-outcome-success">
          <p>✅ <strong>${game.i18n.localize("malha-arcana.check.success")}</strong></p>
        </div>
      `;
    } else {
      headerClass = "malha-header-fail";
      outcomeHTML = `
        <div class="malha-outcome malha-outcome-fail">
          <p>❌ <strong>${game.i18n.localize("malha-arcana.check.failure")}</strong></p>
        </div>
      `;
    }

    const content = `
      <div class="malha-arcana-card">
        <div class="malha-header ${headerClass}">
          <h3>🌀 ${game.i18n.localize("malha-arcana.check.title")}</h3>
        </div>
        <div class="malha-body">
          <div class="malha-spell-info">
            <p><strong>${actor.name}</strong> ➔ <strong>${item.name}</strong> (${castLevel})${upcastNote}</p>
          </div>

          <div class="malha-roll-details">
            <div class="malha-roll-line">
              <span class="malha-roll-label">d20:</span>
              <span class="malha-roll-value malha-raw-die ${rawDie === 1 ? "malha-nat1" : rawDie === 20 ? "malha-nat20" : ""}">${rawDie}</span>
            </div>
            <div class="malha-roll-line">
              <span class="malha-roll-label">${abilityLabel} + Prof:</span>
              <span class="malha-roll-value">${modSign}${totalMod}</span>
            </div>
            <div class="malha-roll-line malha-roll-total">
              <span class="malha-roll-label">Total:</span>
              <span class="malha-roll-value">${totalRoll}</span>
            </div>
            <div class="malha-roll-line malha-roll-dc">
              <span class="malha-roll-label">CD (10 + ${castLevel}):</span>
              <span class="malha-roll-value">${spellDC}</span>
            </div>
          </div>

          <div class="malha-corruption-info">
            <span class="malha-corruption-label">🩸 ${game.i18n.localize("malha-arcana.corruption.label")}:</span>
            <span class="malha-corruption-value">${corruption}/20</span>
          </div>

          ${outcomeHTML}
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      flags: {
        [MODULE_ID]: {
          type: "check",
          rawDie,
          totalRoll,
          spellDC,
          success,
          corruptionTriggered,
          castLevel,
          actorId: actor.id,
          itemId: item.id,
        },
      },
    });
  }

  // ─── Backlash damage message ───────────────────────────────────
  static async sendBacklashDamage(actor, item, castLevel, formula, totalDamage, damageType, roll, narrativeFlavor) {
    // Tocar efeito do Sequencer para Backlash
    if (typeof Sequencer !== "undefined") {
      new Sequence()
        .effect()
          .file("jb2a.impact.magic_missile.purple")
          .atLocation(actor)
        .play();
    }

    const damageTypeLabel = damageType === "force" ? "Force" : "Psychic";

    const content = `
      <div class="malha-arcana-card malha-backlash">
        <div class="malha-header malha-header-backlash">
          <h3>💥 ${game.i18n.localize("malha-arcana.backlash.title")}</h3>
        </div>
        <div class="malha-body">
          ${narrativeFlavor ? `<p class="malha-narrative"><em>${narrativeFlavor}</em></p>` : ""}
          <div class="malha-damage-box">
            <div class="malha-damage-formula">${formula}</div>
            <div class="malha-damage-total">${totalDamage} ${damageTypeLabel}</div>
            <div class="malha-damage-note">(${game.i18n.localize("malha-arcana.backlash.irresistible")})</div>
          </div>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      rolls: [roll],
      type: CONST.CHAT_MESSAGE_TYPES?.ROLL,
      flags: {
        [MODULE_ID]: {
          type: "backlash",
          damage: totalDamage,
          damageType,
          castLevel,
        },
      },
    });
  }

  // ─── Ruptura Arcana message ────────────────────────────────────
  static async sendRupturaArcana(actor, castLevel, rawDie, corruption, d100Result, effect, roll) {
    // Tocar efeito do Sequencer para Ruptura Arcana
    if (typeof Sequencer !== "undefined") {
      new Sequence()
        .effect()
          .file("jb2a.chain_lightning.primary.blue")
          .atLocation(actor)
        .play();
    }

    const content = `
      <div class="malha-arcana-card malha-ruptura-card">
        <div class="malha-header malha-header-ruptura">
          <h3>⚡ ${game.i18n.localize("malha-arcana.ruptura.title")} ⚡</h3>
        </div>
        <div class="malha-body">
          <div class="malha-ruptura-roll">
            <div class="malha-roll-line">
              <span class="malha-roll-label">1d100:</span>
              <span class="malha-roll-value malha-d100-result">${d100Result}</span>
            </div>
          </div>

          <div class="malha-ruptura-effect" style="border-left: 4px solid ${effect.tierColor};">
            <div class="malha-ruptura-tier" style="color: ${effect.tierColor};">
              ${effect.tierName} (${effect.range})
            </div>
            <h4 class="malha-ruptura-title">${effect.title}</h4>
            <p class="malha-ruptura-desc">${effect.description}</p>
          </div>

          <div class="malha-ruptura-severity">
            <div class="malha-severity-bar">
              <div class="malha-severity-segment malha-sev-1 ${effect.tier >= 1 ? "active" : ""}">I</div>
              <div class="malha-severity-segment malha-sev-2 ${effect.tier >= 2 ? "active" : ""}">II</div>
              <div class="malha-severity-segment malha-sev-3 ${effect.tier >= 3 ? "active" : ""}">III</div>
              <div class="malha-severity-segment malha-sev-4 ${effect.tier >= 4 ? "active" : ""}">IV</div>
              <div class="malha-severity-segment malha-sev-5 ${effect.tier >= 5 ? "active" : ""}">V</div>
            </div>
          </div>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      rolls: [roll],
      type: CONST.CHAT_MESSAGE_TYPES?.ROLL,
      flags: {
        [MODULE_ID]: {
          type: "ruptura",
          d100Result,
          tier: effect.tier,
          effectTitle: effect.title,
          castLevel,
        },
      },
    });
  }

  // ─── Purge Corruption message ──────────────────────────────────
  static async sendPurgeMessage(actor, oldCorruption, newCorruption) {
    const content = `
      <div class="malha-arcana-card malha-purge">
        <div class="malha-header malha-header-purge">
          <h3>🧘 ${game.i18n.localize("malha-arcana.purge.chat.title")}</h3>
        </div>
        <div class="malha-body">
          <div class="malha-corruption-change">
            <span class="malha-corruption-old">${oldCorruption}</span>
            <span class="malha-corruption-arrow">→</span>
            <span class="malha-corruption-new">${newCorruption}</span>
          </div>
          <p class="malha-info">${game.i18n.localize("malha-arcana.purge.chat.reduced")}</p>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      flags: { [MODULE_ID]: { type: "purge" } },
    });
  }

  // ─── Helper: ability label ───────────────────────
  static getAbilityLabel(ability) {
    return ability.toUpperCase();
  }
}
