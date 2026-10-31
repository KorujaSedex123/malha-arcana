/**
 * Malha Arcana — Integração com Monk's TokenBar
 *
 * Adiciona um indicador inteligente e compacto de Corrupção Arcana no TokenBar
 * para todos os conjuradores presentes na cena.
 *
 * Detecta dinamicamente quando personagens marciais evoluem para conjuradores
 * (ex: Cavaleiro Arcano, Trapaceiro Arcano, talentos como Iniciado em Magia ou multiclasse).
 */

import { CorruptionTracker } from "../corruption.js";

const MODULE_ID = "malha-arcana";

/**
 * Avalia dinamicamente se um ator possui capacidades mágicas da Malha Arcana.
 * Atualizado em tempo real caso um personagem marcial adquira magias ou arquétipo mágico.
 *
 * @param {Actor} actor
 * @returns {boolean}
 */
export function isSpellcaster(actor) {
  if (!actor) return false;

  // 1. Atributo oficial de conjuração do sistema D&D 5e (ex: "int", "wis", "cha")
  if (actor.system?.attributes?.spellcasting) return true;

  // 2. Classes ou subclasses com progressão mágica (inclui Cavaleiro Arcano, Trapaceiro Arcano, etc.)
  const classes = actor.classes || {};
  const hasCastingClass = Object.values(classes).some((cls) => {
    const prog = cls.system?.spellcasting?.progression;
    return prog && prog !== "none";
  });
  if (hasCastingClass) return true;

  // 3. Possui magias de círculo 1+ no inventário (ex: obtidas via talentos como Iniciado em Magia)
  const hasLeveledSpells = actor.items?.some(
    (i) => i.type === "spell" && (i.system?.level ?? 0) > 0
  );
  if (hasLeveledSpells) return true;

  // 4. Se já possui pontos de Corrupção acumulados ou feat de purga
  if (CorruptionTracker.getCorruption(actor) > 1) return true;
  if (actor.items?.some((i) => i.type === "feat" && (i.name === "Ação: Purgar a Malha" || i.name === "Purgar a Malha"))) {
    return true;
  }

  return false;
}

/**
 * Inicializa os hooks de integração com o Monk's TokenBar.
 */
export function initMonksTokenBarIntegration() {
  // Hook nativo disparado na renderização do Monk's TokenBar
  Hooks.on("renderTokenBar", (app, html) => {
    _injectTokenBarCorruption(html);
  });

  // Re-renderização reativa quando atores sofrem atualizações (ex: ganham magias, sobem de nível ou alteram corrupção)
  Hooks.on("updateActor", (actor) => {
    if (!game.modules.get("monks-tokenbar")?.active) return;
    const tokenBarEl = document.querySelector("#tokenbar, .tokenbar-container, .monks-tokenbar");
    if (tokenBarEl) {
      _injectTokenBarCorruption(tokenBarEl);
    }
  });

  // Também atualiza caso um novo item (classe, subclasse, magia ou talento) seja adicionado
  Hooks.on("createItem", (item) => {
    if (!game.modules.get("monks-tokenbar")?.active) return;
    if (item.parent?.documentName === "Actor") {
      const tokenBarEl = document.querySelector("#tokenbar, .tokenbar-container, .monks-tokenbar");
      if (tokenBarEl) {
        _injectTokenBarCorruption(tokenBarEl);
      }
    }
  });

  console.log(`${MODULE_ID} | Integração com Monk's TokenBar inicializada com sucesso.`);
}

/**
 * Injeta o badge de Corrupção em cada token card do Monk's TokenBar.
 * @param {HTMLElement|jQuery} html
 */
function _injectTokenBarCorruption(html) {
  const root = html instanceof HTMLElement ? html : (html?.[0] || html);
  if (!root || !root.querySelectorAll) return;

  // Seletores compatíveis com as versões do Monk's TokenBar
  const tokenEls = root.querySelectorAll("[data-token-id], [data-actor-id], .token-card, .token");
  if (!tokenEls.length) return;

  tokenEls.forEach((tokenEl) => {
    const tokenId = tokenEl.dataset?.tokenId;
    const actorId = tokenEl.dataset?.actorId;

    let actor = null;
    if (tokenId && canvas?.tokens) {
      actor = canvas.tokens.get(tokenId)?.actor;
    }
    if (!actor && actorId) {
      actor = game.actors.get(actorId);
    }
    if (!actor) return;

    // Remove badge anterior para evitar duplicações em re-renders parciais
    tokenEl.querySelector(".ma-tokenbar-badge")?.remove();

    // Se o personagem for puramente marcial e ainda não tiver magias, não exibe
    if (!isSpellcaster(actor)) return;

    const corruption = CorruptionTracker.getCorruption(actor);
    const maxCorruption = 20;

    let dangerClass = "ma-danger-low";
    let dangerLabel = "Estável";
    if (corruption >= 16) {
      dangerClass = "ma-danger-catastrophic";
      dangerLabel = "Catastrófico";
    } else if (corruption >= 11) {
      dangerClass = "ma-danger-critical";
      dangerLabel = "Crítico";
    } else if (corruption >= 6) {
      dangerClass = "ma-danger-warning";
      dangerLabel = "Instável";
    }

    const ruptureChance = corruption * 5;
    const tooltip = `<strong>${foundry.utils.escapeHTML(actor.name)}</strong><br/>`
      + `🌀 <strong>Corrupção Arcana: ${corruption}/${maxCorruption}</strong> (${dangerLabel})<br/>`
      + `• Risco de Ruptura: d20 ≤ ${corruption} (<strong>${ruptureChance}%</strong>)<br/>`
      + `<em>(Clique para abrir a ficha | Shift+Clique para purgar)</em>`;

    const badge = document.createElement("div");
    badge.className = `ma-tokenbar-badge ${dangerClass}`;
    badge.setAttribute("data-tooltip", tooltip);
    badge.setAttribute("data-tooltip-direction", "UP");
    badge.innerHTML = `
      <i class="fa-solid fa-meteor"></i>
      <span class="ma-tokenbar-val">${corruption}</span>
    `;

    badge.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (ev.shiftKey) {
        // Shift+Clique purga 1 ponto diretamente
        const oldVal = CorruptionTracker.getCorruption(actor);
        if (oldVal > 0) {
          const newVal = await CorruptionTracker.purgeCorruption(actor);
          ui.notifications.info(`🧘 ${actor.name} purgou 1 ponto de Corrupção (${oldVal} ➔ ${newVal}).`);
        } else {
          ui.notifications.info(`${actor.name} não possui Corrupção para purgar.`);
        }
      } else {
        // Clique normal abre a ficha na aba de magias
        actor.sheet.render(true);
      }
    });

    // Insere na área de estatísticas do token (ou no corpo do card)
    const statsContainer = tokenEl.querySelector(".stats, .token-stats, .attributes, .bars") || tokenEl;
    statsContainer.appendChild(badge);
  });
}
