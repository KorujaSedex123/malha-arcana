# 🌀 Malha Arcana — Sistema Alternativo de Magia

<p align="center">
  <a href="README.en.md"><strong>🇺🇸 Read documentation in English</strong></a> | <strong>🇧🇷 Português</strong>
</p>

[![Foundry VTT v14](https://img.shields.io/badge/Foundry-v14.369+-orange.svg)](https://foundryvtt.com)
[![D&D 5e v6](https://img.shields.io/badge/D%26D%205e-6.0.6+-blue.svg)](https://github.com/foundryvtt/dnd5e)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/korujasedex123/malha-arcana?color=purple)](https://github.com/korujasedex123/malha-arcana/releases/latest)

Substitui os espaços de magia tradicionais do D&D 5e por um sistema de conjuração volátil, perigoso e vivo baseado em testes de habilidade, introduzindo mecânicas de **Corrupção Arcana**, **Ruptura Cósmica com 100 Efeitos Únicos (1d100)**, **Dano de Rebote**, **Automação de Active Effects** e **Integração com Descansos e Monk's TokenBar**.

---

## ✨ Destaques da Versão

- 🎲 **100 Efeitos Únicos de Ruptura (1 a 100)**: Cada número do d100 possui nome, ícone temático e descrição própria.
- ⚡ **Automação de Active Effects**: Condições e status (Cegueira, Atordoamento, Prostrado, etc.) aplicados automaticamente ao personagem.
- 🧘 **Integração com Descansos**: Alívio de Corrupção configurável após Descanso Curto e Longo.
- 📊 **Integração com Monk's TokenBar**: Indicador inteligente de Corrupção na barra do mestre com purga rápida (Shift+Clique).
- ⚔️ **Detecção Dinâmica de Magia**: Suporta classes mágicas, arquétipos marciais (Cavaleiro Arcano, Trapaceiro Arcano), raças (Tiefling, Drow, etc.), talentos e itens mágicos.
- 🎨 **UI Nativa D&D 5e (AppV2)**: Mini-badge no cabeçalho e barra na aba de magias compatíveis com modo Claro (Pergaminho) e Dark Mode.
- 🌐 **Internacionalização Dinâmica**: Suporte completo a Português (`pt-BR`) e Inglês (`en`), adaptando-se automaticamente ao idioma do Foundry.

---

## ⚡ Mecânicas Principais

### 1. Teste de Conjuração (Malha Arcana)
- Conjuradores canalizam diretamente a energia do cosmos em vez de gastar espaços de magia estáticos. Ao conjurar uma magia de 1º círculo ou superior:
  $$\text{1d20} + \text{Modificador de Atributo} + \text{Bônus de Proficiência}$$
- **CD para manifestar**: $10 + \text{Nível da Magia}$ (com suporte dinâmico a Upcast).
- **Magias de Ataque**: A própria jogada de ataque serve simultaneamente para acertar a CA do alvo e vencer a CD da Malha.
- **Truques (Círculo 0)**: São estáveis, seguros e não exigem teste nem acumulam Corrupção.

### 2. Corrupção Arcana (1 a 20)
- Cada magia de 1º círculo ou superior acumula **+1 ponto de Corrupção** (inicia em 1 e vai até 20).
- Cada ponto de Corrupção representa **5% de risco de Ruptura** (ex: Corrupção 4 = 20% de risco).
- Exibida no cabeçalho da ficha (mini-badge) e na aba de magias com barra de perigo temática em 4 estágios:
  - 🟢 **Estável** (1–5)
  - 🟡 **Instável** (6–10)
  - 🔴 **Crítico** (11–15)
  - 🟣 **Catastrófico** (16–20)
- **Edição Direta**: Jogadores e Mestres podem ajustar o valor na própria barra da ficha.

### 3. Ruptura Arcana (Tabela Oficial de 1d100)
- Se o valor **natural** do d20 for **menor ou igual à Corrupção atual**, a Malha se rompe e desencadeia um desastre da Tabela de Ruptura Arcana (1d100)!
- A tabela oficial contém **100 efeitos únicos** divididos em 5 Patamares de severidade:
  - **Tier 1 (01–25)**: *Anomalias Sensoriais* (Distorção Cromática, Olfato Arcano, Sussurros da Malha).
  - **Tier 2 (26–50)**: *Debilitações Táticas* (Cegueira Arcana, Silêncio Involuntário, Mãos Entorpecidas).
  - **Tier 3 (51–75)**: *Explosões Arcanas* (Detonação Arcana, Onda Psíquica, Chamas Fantasmas).
  - **Tier 4 (76–95)**: *Invasões Cósmicas* (Fendas Astrais, Invocação Hostil, Marca do Abismo).
  - **Tier 5 (96–100)**: *Colapso Total* (Colapso Vital a 0 PV, Apagamento Arcano, Possessão Planar).
- Inclui `RollTable` nativa importada automaticamente para o mundo, pronta para rolagens 3D com o módulo *Dice So Nice!*.

### 4. Dano de Rebote (Backlash)
- Falhar no teste da Malha sem desencadear Ruptura faz a energia não contida explodir no conjurador:
  - **1º a 3º Círculo**: 1d4 de dano irredutível por círculo.
  - **4º a 6º Círculo**: 1d6 de dano irredutível por círculo.
  - **7º a 9º Círculo**: 1d8 de dano irredutível por círculo.
  *(Dados e tipos de dano — Força ou Psíquico — são configuráveis nas opções do módulo).*
- Botão interativo no chat para aplicar o dano diretamente aos Pontos de Vida com 1 clique (ou automação total).

### 5. Purgar a Malha (🧘)
- O conjurador pode gastar sua **Ação** em combate para estabilizar a própria aura, reduzindo **-1 de Corrupção**.
- Adicionada automaticamente à ficha do conjurador e acessível com 1 clique na aba de magias ou na barra do Monk's TokenBar.

### 6. Descanso Curto e Descanso Longo
- Conjuradores recuperam a estabilidade cósmica durante o repouso.
- Totalmente integrado ao evento de descanso do D&D 5e (`dnd5e.restCompleted`):
  - **Descanso Curto**: Configurável para 0, -1 ponto, metade da Corrupção ou rolagem de 1d4.
  - **Descanso Longo**: Configurável para zerar (padrão), reduzir metade, reduzir 5 pontos ou não reduzir.

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

Acesse *Configurar Opções → Malha Arcana*:
- **Substituir Espaços de Magia**: Oculta o consumo de espaços de magia nativos do dnd5e.
- **Aplicar a NPCs**: Estende o sistema a monstros e conjuradores inimigos.
- **Automação de Active Effects**: Aplica condições automaticamente nas Rupturas.
- **Redução em Descanso Curto e Longo**: Escolha a fórmula de recuperação de Corrupção.
- **Dados e Tipos de Dano de Rebote**: Seletores por Tier (d2 até d20; Força ou Psíquico).
- **Tabela de Ruptura Customizada**: Use qualquer `RollTable` do mundo ou compêndio.

---

## 🎲 Compatibilidade

- **Foundry VTT**: Versão 14+ (suporte total a ApplicationV2 e ThemeV2).
- **Sistema**: D&D 5e v6.0.0 ou superior.
- **Monk's TokenBar**: Suporte nativo e reativo.
- **Dice So Nice!**: Rolagens 3D para testes, rebote e a tabela 1d100 de desastres.

---

## ☕ Apoie o Projeto / Doações

Se você gosta do **Malha Arcana** e ele tornou a magia da sua mesa mais emocionante e dinâmica, considere apoiar o desenvolvimento contínuo! Cada contribuição ajuda a manter o módulo atualizado com as novas versões do Foundry VTT e D&D 5e.

<p align="center">
  <a href="https://ko-fi.com/korujasedex" target="_blank">
    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Doar via Ko-fi" />
  </a>
  &nbsp;
  <a href="https://www.buymeacoffee.com/korujasedex" target="_blank">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Comprar um Café" />
  </a>
  &nbsp;
  <a href="https://apoia.se/malha-arcana" target="_blank">
    <img src="https://img.shields.io/badge/Apoia.se-EA2027?style=for-the-badge&logo=patreon&logoColor=white" alt="Apoia.se" />
  </a>
  &nbsp;
  <a href="https://www.paypal.com/donate" target="_blank">
    <img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Doar via PayPal" />
  </a>
</p>

> **Chave Pix (Brasil):** Se você mora no Brasil e prefere apoiar via Pix, você pode enviar qualquer valor diretamente para apoiar os projetos do criador. Muito obrigado pelo carinho!

---

## 📜 Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para mais detalhes.
