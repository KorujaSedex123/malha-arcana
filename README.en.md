# 🌀 Arcane Weave (Malha Arcana) — Alternative Magic System

<p align="center">
  <strong>🇺🇸 English</strong> | <a href="README.md"><strong>🇧🇷 Leia a documentação em Português</strong></a>
</p>

[![Foundry VTT v14](https://img.shields.io/badge/Foundry-v14.369+-orange.svg)](https://foundryvtt.com)
[![D&D 5e v6](https://img.shields.io/badge/D%26D%205e-6.0.6+-blue.svg)](https://github.com/foundryvtt/dnd5e)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/korujasedex123/malha-arcana?color=purple)](https://github.com/korujasedex123/malha-arcana/releases/latest)

Replaces traditional D&D 5e spell slots with a volatile, dangerous, and living spellcasting system based on ability checks, introducing mechanics for **Arcane Corruption**, **Cosmic Rupture with 100 Unique Effects (1d100)**, **Backlash Damage**, **Active Effects Automation**, and **Integration with Rests & Monk's TokenBar**.

---

## ✨ Version Highlights

- 🎲 **100 Unique Rupture Effects (1 to 100)**: Every number on the d100 features its own thematic title, custom icon, and detailed mechanical description.
- ⚡ **Active Effects & Conditions Automation**: Conditions (Blinded, Stunned, Prone, etc.) and custom effects are automatically applied to the character upon Rupture.
- 🧘 **Rest Integration**: Configurable Corruption recovery on Short and Long Rests (`dnd5e.restCompleted`).
- 📊 **Monk's TokenBar Integration**: Smart Corruption badge embedded in the DM's token bar with quick purging (Shift+Click).
- ⚔️ **Dynamic Spellcaster Detection**: Seamlessly detects spellcasters across classes, martial archetypes (Eldritch Knight, Arcane Trickster), races (Tiefling, Drow, etc.), feats, and magical items.
- 🎨 **Native D&D 5e UI (AppV2)**: Mini-badge in the actor header and danger bar in the spellbook tab compatible with both Parchment Light Mode and Dark Mode.
- 🌐 **Dynamic Internationalization**: Fully translated into English (`en`) and Portuguese (`pt-BR`), adapting automatically to your Foundry language settings.

---

## ⚡ Core Mechanics

### 1. The Arcane Weave Check
- Spellcasters channel directly from the Cosmic Weave instead of burning static spell slots. Whenever a spell of 1st level or higher is cast, the caster rolls:
  $$\text{1d20} + \text{Spellcasting Ability Modifier} + \text{Proficiency Bonus}$$
- **DC to manifest**: $10 + \text{Spell Level}$ (supports dynamic upcasting).
- **Attack Spells**: The spell attack roll itself serves as the Weave check to beat both the target's AC and the Weave DC simultaneously.
- **Cantrips (Level 0)**: Safe, stable, and require no check nor generate Corruption.

### 2. Arcane Corruption (1 to 20)
- Casting any leveled spell (1st level or higher) increases the caster's Corruption by **+1 point** (starts at 1, caps at 20).
- Each point of Corruption represents a **5% risk of Cosmic Rupture** (e.g., Corruption 4 = 20% risk).
- Visualized in the actor sheet header (mini-badge) and spellbook tab with a thematic meter featuring 4 danger stages:
  - 🟢 **Stable** (1–5)
  - 🟡 **Unstable** (6–10)
  - 🔴 **Critical** (11–15)
  - 🟣 **Catastrophic** (16–20)
- **Inline Editing**: Players and GMs can adjust the number directly from the sheet bar.

### 3. Arcane Rupture (Official 1d100 Table)
- If the **natural** d20 roll is **less than or equal to the caster's current Corruption**, the Weave ruptures and triggers an immediate disaster from the 1d100 Rupture Table!
- The official table features **100 unique effects** divided into 5 Severity Tiers:
  - **Tier 1 (01–25)**: *Sensory Anomalies* (Chromatic Distortion, Temporal Echo, Whispers of the Weave).
  - **Tier 2 (26–50)**: *Tactical Debilitations* (Arcane Blindness, Involuntary Silence, Numb Hands).
  - **Tier 3 (51–75)**: *Arcane Explosions* (Arcane Detonation, Psychic Shockwave, Phantom Flames).
  - **Tier 4 (76–95)**: *Cosmic Invasions* (Dimensional Rifts, Hostile Summons, Mark of the Abyss).
  - **Tier 5 (96–100)**: *Total Collapse* (Vital Collapse to 0 HP, Arcane Erasure, Planar Possession).
- Includes an official world `RollTable` ready for 3D dice rolls with *Dice So Nice!*.

### 4. Backlash Damage
- Failing the Weave check without triggering a Rupture results in unchanneled energy rebounding into the caster's body:
  - **Levels 1–3**: 1d4 irresistible damage per spell level.
  - **Levels 4–6**: 1d6 irresistible damage per spell level.
  - **Levels 7–9**: 1d8 irresistible damage per spell level.
  *(Die sizes and damage types — Force or Psychic — are fully customizable in module settings).*
- Interactive chat button to apply the damage directly to HP with a single click (or automated).

### 5. Purge the Weave (🧘)
- A spellcaster can spend their **Action** in combat to stabilize their magical aura, reducing Corruption by **-1 point**.
- Automatically added as a feature to the character sheet and accessible via the spell tab or Monk's TokenBar.

### 6. Short & Long Rest Integration
- Spellcasters recover magical stability during rest.
- Hooked directly into D&D 5e's `dnd5e.restCompleted`:
  - **Short Rest**: Configurable to 0, -1 point, half Corruption, or a 1d4 roll.
  - **Long Rest**: Configurable to reset to 0 (default), reduce half, reduce 5 points, or no reduction.

---

## 📦 Installation

### Foundry VTT Installation:
1. In Foundry VTT's main menu, navigate to **Add-on Modules** and click **Install Module**.
2. In the **Manifest URL** field, paste:
   ```
   https://github.com/korujasedex123/malha-arcana/releases/latest/download/module.json
   ```
3. Click **Install** and enable the module in your World Settings.

---

## ⚙️ Module Settings

Navigate to *Configure Settings → Arcane Weave*:
- **Replace Spell Slots**: Prevents the consumption of system spell slots.
- **Apply to NPCs**: Enables the system for enemy spellcasters and monsters.
- **Auto-Apply Active Effects**: Automatically toggles conditions upon Rupture.
- **Rest Corruption Reduction**: Choose your preferred formula for Short and Long rests.
- **Backlash Dice & Types**: Select die size (d2 to d20) and damage type (Force or Psychic).
- **Custom Rupture Table**: Point to any world `RollTable` or compendium table.

---

## 🎲 Compatibility

- **Foundry VTT**: Version 14+ (fully compatible with ApplicationV2 and ThemeV2).
- **Game System**: D&D 5e v6.0.0 or higher.
- **Monk's TokenBar**: Native, reactive support.
- **Dice So Nice!**: Full 3D dice animations for checks, backlash, and 1d100 tables.

---

## ☕ Support the Project / Donations

If you enjoy **Arcane Weave** and it brings extra tension and excitement to magic in your games, please consider supporting its continuous development! Every donation helps keep the module maintained and compatible with upcoming Foundry VTT and D&D 5e updates.

<p align="center">
  <a href="https://livepix.gg/korujasedex" target="_blank">
    <img src="https://img.shields.io/badge/LivePix-Support%20via%20Pix-00C49F?style=for-the-badge&logo=pix&logoColor=white" alt="Support via LivePix" />
  </a>
</p>

<p align="center">
  👉 Direct link: <strong><a href="https://livepix.gg/korujasedex" target="_blank">livepix.gg/korujasedex</a></strong>
</p>

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
