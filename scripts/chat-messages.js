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
          <p><strong>${foundry.utils.escapeHTML(actor.name)}</strong> ${game.i18n.localize("malha-arcana.cantrip.info")}</p>
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
      roll,
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

    const overchannel = !!result.overchannel;
    const overchannelCorruptionAdded = result.overchannelCorruptionAdded ?? 0;
    const overchannelHTML = overchannel ? `
      <div class="malha-overchannel-badge" style="margin: 8px 0; padding: 6px 10px; background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; border-radius: 4px; text-align: center; color: #e9d5ff; font-size: 12px;">
        <div style="font-weight: bold;">${game.i18n.format("malha-arcana.chat.overchannelActive", { corruptionAdded: overchannelCorruptionAdded })}</div>
        ${success ? `<div style="font-size: 11px; color: #fde047; margin-top: 3px;">${game.i18n.localize("malha-arcana.chat.overchannelMaxDamage")}</div>` : ""}
      </div>
    ` : "";

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
            <p><strong>${foundry.utils.escapeHTML(actor.name)}</strong> ➔ <strong>${foundry.utils.escapeHTML(item.name)}</strong> (${castLevel})${upcastNote}</p>
          </div>

          <div class="malha-corruption-info">
            <span class="malha-corruption-label">🩸 ${game.i18n.localize("malha-arcana.corruption.label")}:</span>
            <span class="malha-corruption-value">${corruption}/20 (${corruption * 5}% ${game.i18n.localize("malha-arcana.sheet.riskLabel")})</span>
          </div>

          ${overchannelHTML}

          ${outcomeHTML}

          <details class="malha-accordion">
            <summary>${game.i18n.localize("malha-arcana.chat.details")}</summary>
            <div class="malha-roll-details" style="margin-top: 6px;">
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
          </details>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      // Apenas inclui dados se não for ataque (em magias de ataque o sistema dnd5e já rolou o dado 3D)
      rolls: (roll && !isAttackSpell) ? [roll] : [],
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
  static async sendBacklashDamage(actor, item, castLevel, formula, totalDamage, damageType, roll, narrativeFlavor, options = {}) {
    // Síntese sonora de choque arcano
    this._playProceduralSound("backlash");

    // Efeito visual do Sequencer para Backlash
    const enableSequencer = game.settings.get(MODULE_ID, "enableSequencerFX");
    if (enableSequencer && typeof Sequencer !== "undefined") {
      new Sequence()
        .effect()
          .file("jb2a.impact.magic_missile.purple")
          .atLocation(actor)
        .play();
    }

    const damageTypeLabel = damageType === "force" ? "Force" : "Psychic";

    const overchannelHTML = options.overchannel ? `
      <div class="malha-overchannel-backlash-badge" style="margin: 6px 0 10px 0; padding: 6px 8px; background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 4px; text-align: center; color: #fca5a5; font-size: 12px; font-weight: bold;">
        ${game.i18n.localize("malha-arcana.chat.overchannelBacklashDoubled")}
      </div>
    ` : "";

    const content = `
      <div class="malha-arcana-card malha-backlash">
        <div class="malha-header malha-header-backlash">
          <h3>💥 ${game.i18n.localize("malha-arcana.backlash.title")}</h3>
        </div>
        <div class="malha-body">
          ${narrativeFlavor ? `<p class="malha-narrative"><em>${narrativeFlavor}</em></p>` : ""}
          ${overchannelHTML}
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
    // Orquestração audiovisual por Tier (Sequencer, JB2A, Canvas Shake e Web Audio)
    this._playRupturaAudiovisual(actor, effect.tier, d100Result);

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
    // Efeito sonoro harmônico de purga
    this._playProceduralSound("purge");

    // Efeito de cura estelar via Sequencer
    const enableSequencer = game.settings.get(MODULE_ID, "enableSequencerFX");
    if (enableSequencer && typeof Sequencer !== "undefined") {
      new Sequence()
        .effect()
          .file("jb2a.cure_wounds.400px.blue")
          .atLocation(actor)
          .scale(0.8)
        .play();
    }

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

  // ─── Rest corruption reduction message ─────────────────────────
  static async sendRestPurgeMessage(actor, isLong, oldVal, newVal) {
    const diff = oldVal - newVal;
    const restLabel = isLong
      ? game.i18n.localize("malha-arcana.rest.longRest")
      : game.i18n.localize("malha-arcana.rest.shortRest");
    const icon = isLong ? "fa-bed" : "fa-mug-hot";

    const content = `
      <div class="malha-arcana-card malha-purge">
        <div class="malha-header malha-header-purge">
          <h3><i class="fa-solid ${icon}"></i> ${game.i18n.format("malha-arcana.rest.chatTitle", { restType: restLabel })}</h3>
        </div>
        <div class="malha-body">
          <p>${game.i18n.format("malha-arcana.rest.chatDesc", { name: foundry.utils.escapeHTML(actor.name) })}</p>
          <div class="malha-corruption-change">
            <span class="malha-corruption-old">${oldVal}</span>
            <span class="malha-corruption-arrow">➔</span>
            <span class="malha-corruption-new">${newVal}</span>
          </div>
          <p class="malha-info" style="text-align: center;">${game.i18n.format("malha-arcana.rest.chatReduction", { diff })}</p>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      flags: { [MODULE_ID]: { type: "rest", isLong, oldVal, newVal } },
    });
  }

  // ─── Audiovisual & Web Audio Procedural Synthesis ─────────────
  /**
   * Síntese de áudio procedural via Web Audio API (zero dependências externas).
   * @param {string} type - Tipo de efeito sonoro ("ruptura-1".."ruptura-5", "purge", "backlash")
   */
  static _playProceduralSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === "purge") {
        // Acorde harmônico estelar cristalino (frequências de cura 528Hz, 660Hz, 792Hz)
        [528, 660, 792].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.08, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + idx * 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.9 + idx * 0.1);
        });
        return;
      }

      if (type === "backlash") {
        // Estalo e choque de impacto
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
        return;
      }

      if (type === "ruptura-1") {
        // Faísca rápida de alta frequência
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        return;
      }

      if (type === "ruptura-2") {
        // Onda de choque ressonante
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
        return;
      }

      if (type === "ruptura-3") {
        // Vórtice dimensional distorcido
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "sawtooth";
        osc2.type = "square";
        osc1.frequency.setValueAtTime(180, now);
        osc2.frequency.setValueAtTime(120, now);
        osc1.frequency.exponentialRampToValueAtTime(50, now + 0.6);
        osc2.frequency.exponentialRampToValueAtTime(40, now + 0.6);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
        return;
      }

      if (type === "ruptura-4") {
        // Fratura cósmica pesada
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.9);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.0);
        return;
      }

      if (type === "ruptura-5") {
        // Cataclismo com sub-grave massivo
        [60, 45, 30].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(20, now + 1.6);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.8);
        });
        return;
      }
    } catch (err) {
      console.warn("malha-arcana | Erro ao sintetizar som procedural:", err);
    }
  }

  /**
   * Orquestra sequências visuais cinemáticas dedicadas para os 5 Tiers da Ruptura
   * usando Sequencer, JB2A, Canvas Shake e Screen Pulse.
   */
  static _playRupturaAudiovisual(actor, tier, d100Result) {
    // 1. Sempre executa síntese de áudio procedural
    this._playProceduralSound(`ruptura-${tier}`);

    // 2. Pulso na tela para Tiers 3+
    if (tier >= 3 && game.malhaArcana?.screenEffects?.triggerScreenPulse) {
      const pulseColor = tier === 5 ? "#ef4444" : tier === 4 ? "#9333ea" : "#a855f7";
      game.malhaArcana.screenEffects.triggerScreenPulse(pulseColor, tier * 250);
    }

    // 3. Sequencer & JB2A (se ativo e habilitado nas settings)
    let enableSequencer = true;
    try {
      enableSequencer = game.settings.get(MODULE_ID, "enableSequencerFX");
    } catch {
      enableSequencer = true;
    }
    if (!enableSequencer || typeof Sequencer === "undefined") return;

    try {
      const seq = new Sequence();

      switch (tier) {
        case 1:
          seq.effect()
            .file("jb2a.sparks.magical.purple")
            .atLocation(actor)
            .scale(0.9);
          break;

        case 2:
          seq.effect()
            .file("jb2a.shockwave.particle.purple")
            .atLocation(actor)
            .scale(1.1);
          if (typeof seq.canvasPan === "function") {
            seq.canvasPan().shake({ duration: 500, strength: 3 });
          }
          break;

        case 3:
          seq.effect()
            .file("jb2a.energy_strands.range.multiple.purple.01")
            .atLocation(actor)
            .scale(1.2)
            .effect()
            .file("jb2a.portal.vertical.vortex.purple")
            .atLocation(actor)
            .scale(0.8)
            .duration(2000);
          if (typeof seq.canvasPan === "function") {
            seq.canvasPan().shake({ duration: 900, strength: 6 });
          }
          break;

        case 4:
          seq.effect()
            .file("jb2a.black_hole.01.purple")
            .atLocation(actor)
            .scale(1.4)
            .duration(2500)
            .effect()
            .file("jb2a.chain_lightning.primary.purple")
            .atLocation(actor)
            .delay(350);
          if (typeof seq.canvasPan === "function") {
            seq.canvasPan().shake({ duration: 1400, strength: 10 });
          }
          break;

        case 5:
        default:
          seq.effect()
            .file("jb2a.impact.ground_crack.purple")
            .atLocation(actor)
            .scale(1.6)
            .effect()
            .file("jb2a.planar_portal.purple")
            .atLocation(actor)
            .scale(2.0)
            .duration(3500);
          if (typeof seq.canvasPan === "function") {
            seq.canvasPan().shake({ duration: 2500, strength: 16 });
          }
          break;
      }

      seq.play();
    } catch (err) {
      console.warn("malha-arcana | Erro ao executar animação do Sequencer:", err);
    }
  }

  // ─── Helper: ability label ───────────────────────
  static getAbilityLabel(ability) {
    return ability.toUpperCase();
  }
}


// ─── One-Click Chat Actions ─────────────────────────────────────
Hooks.on("renderChatMessageHTML", (message, html) => {
  const btn = html.querySelector('.malha-btn-backlash[data-action="apply-backlash"]');
  if (!btn) return;

  btn.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const { actorId, damage } = ev.currentTarget.dataset;
    const actor = game.actors.get(actorId);
    if (!actor) return;

    if (!game.user.isGM && !actor.isOwner) {
      ui.notifications.warn(game.i18n.localize("malha-arcana.chat.noPermission"));
      return;
    }

    const totalDamage = parseInt(damage, 10);
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
      ui.notifications.info(game.i18n.format("malha-arcana.chat.backlashApplied", { name: actor.name, damage: totalDamage }));
    }
  });
});