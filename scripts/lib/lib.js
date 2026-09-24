/**
 * lib.js — Utilidades e Macro para "Ação: Purgar a Malha"
 *
 * Este script pode ser usado como macro no Foundry VTT.
 * Permite que o jogador sacrifique sua Ação no combate para
 * reduzir a Corrupção em -1.
 *
 * Uso: Criar uma macro com este script ou usar o item de classe
 * "Ação: Purgar a Malha" que chama esta função.
 */

/**
 * Purgar a Malha — Macro executável
 * Cola este código numa Macro do tipo "script" no Foundry.
 *
 * Também pode ser chamado via: game.malhaArcana?.purgeMacro()
 */
async function purgarAMalha() {
  const MODULE_ID = "malha-arcana";

  // Get the selected or assigned actor
  const speaker = ChatMessage.getSpeaker();
  const actor = game.actors.get(speaker.actor);

  if (!actor) {
    ui.notifications.warn("Nenhum personagem selecionado. Selecione um token primeiro.");
    return;
  }

  // Check if module is active
  if (!game.modules.get(MODULE_ID)?.active) {
    ui.notifications.error("O módulo Malha Arcana não está ativo.");
    return;
  }

  const tracker = game.malhaArcana?.corruption;
  const chat = game.malhaArcana?.chat;

  if (!tracker || !chat) {
    ui.notifications.error("Malha Arcana não foi inicializada corretamente.");
    return;
  }

  const oldCorruption = tracker.getCorruption(actor);

  if (oldCorruption <= 0) {
    ui.notifications.info(`${actor.name} não possui Corrupção para purgar.`);
    return;
  }

  const newCorruption = await tracker.purgeCorruption(actor);
  await chat.sendPurgeMessage(actor, oldCorruption, newCorruption);

  ui.notifications.info(`${actor.name} purgou a Malha. Corrupção: ${oldCorruption} → ${newCorruption}`);
}

// Expose globally for macro use
if (typeof globalThis !== "undefined") {
  globalThis.purgarAMalha = purgarAMalha;
}

// Also attach to the module namespace when ready
Hooks.once("ready", () => {
  if (game.malhaArcana) {
    game.malhaArcana.purgeMacro = purgarAMalha;
  }
});
