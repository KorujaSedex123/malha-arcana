# 🌀 Malha Arcana — Sistema Alternativo de Magia

[![Foundry VTT v14](https://img.shields.io/badge/Foundry-v14.369-orange.svg)](https://foundryvtt.com)
[![D&D 5e v6](https://img.shields.io/badge/D%26D%205e-6.0.6+-blue.svg)](https://github.com/foundryvtt/dnd5e)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Substitui os espaços de magia tradicionais do D&D 5e por um sistema de conjuração volátil e perigoso baseado em testes de habilidade, introduzindo mecânicas de **Corrupção Arcana**, **Ruptura Cósmica (1d100)** e **Dano de Rebote**.

---

## ⚡ Mecânicas Principais

### 1. Teste de Conjuração (Malha Arcana)
- Conjuradores não dependem de espaços de magia limitados. Ao conjurar uma magia de 1º círculo ou superior, o conjurador faz um teste:
  $$\text{1d20} + \text{Modificador de Atributo} + \text{Bônus de Proficiência}$$
- **CD para manifestar**: $10 + \text{Nível da Magia}$ (suporta upcasting).
- **Magias de Ataque**: A própria jogada de ataque serve simultaneamente para acertar a CA do alvo e vencer a CD da Malha.
- **Truques (Círculo 0)**: São estáveis, seguros e não exigem teste nem acumulam Corrupção.

### 2. Corrupção Arcana (1 a 20)
- A cada magia de círculo 1+ conjurada, o conjurador acumula **+1 ponto de Corrupção** (inicia em 1 e vai até 20).
- Visível diretamente na ficha do personagem com barra de progresso temática.
- **Edição Rápida**: Mestres e jogadores podem editar o número diretamente na ficha.

### 3. Ruptura Arcana (Tabela de 1d100)
- Se o valor **natural** do dado no d20 for **menor ou igual à Corrupção atual**, a magia se rompe e desencadeia uma **Ruptura Arcana** imediata!
- Uma tabela com 22 efeitos cósmicos dividida em 5 Tiers:
  - **Tier 1 (01–25)**: *Anomalias Sensoriais* (distorções visuais, eco temporal).
  - **Tier 2 (26–50)**: *Debilitações Táticas* (cegueira, lentidão gravitacional).
  - **Tier 3 (51–75)**: *Explosões Arcanas* (detonações de dano de força e atordoamento).
  - **Tier 4 (76–95)**: *Invasões Cósmicas* (fendas planares e aberrações).
  - **Tier 5 (96–100)**: *Colapso Total* (coma mágico, apagamento e possessão).
- Acompanha compêndio oficial com a `RollTable` inclusa no módulo.

### 4. Dano de Rebote (Backlash)
- Falhar no teste da Malha sem sofrer Ruptura faz a energia excedente explodir no corpo do conjurador:
  - **1º a 3º Círculo**: 1d4 de dano irredutível por círculo.
  - **4º a 6º Círculo**: 1d6 de dano irredutível por círculo.
  - **7º a 9º Círculo**: 1d8 de dano irredutível por círculo.
  *(Os tipos de dados são configuráveis nas opções do módulo).*

### 5. Purgar a Malha (🧘)
- Um conjurador pode gastar sua **Ação** em combate para acalmar a própria aura mágica, reduzindo **-1 de Corrupção**.
- A ação é adicionada automaticamente como característica na ficha e possui botão direto na aba de magias.

---

## 📦 Instalação

### Instalação no Foundry VTT:
1. No menu principal do Foundry VTT, vá em **Add-on Modules** e clique em **Install Module**.
2. No campo **Manifest URL**, cole o link abaixo e clique em **Install**:
   ```
   https://github.com/korujasedex123/malha-arcana/releases/latest/download/module.json
   ```
3. Ative o módulo nas configurações do seu mundo.

---

## ⚙️ Opções Configuráveis
No menu *Configurar Opções → Malha Arcana*, você pode ajustar:
- **Substituir Espaços de Magia**: Desativa o consumo de spell slots do sistema.
- **Dado de Rebote (Tier 1, 2 e 3)**: Seletores suspensos (d2, d4, d6, d8, d10, d12, d20).
- **Tipo de Dano de Rebote**: Dano de Força ou Psíquico.
- **Aplicar a NPCs**: Se os monstros e conjuradores inimigos também sofrem com a Malha.
- **Tabela de Ruptura Customizada**: Substitua a tabela padrão por qualquer outra RollTable do seu mundo ou compêndio.

---

## 🎲 Compatibilidade
- **Foundry VTT**: Versão 14+ (compatível com ApplicationV2 e ThemeV2).
- **Sistema**: D&D 5e v6.0.0 ou superior.
- **Dice So Nice!**: Suporte completo nativo com animação 3D para todas as rolagens.

---

## 📜 Licença
Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para mais detalhes.