# Malha Arcana — Sistema Alternativo de Magia para D&D 5e

Um módulo para [Foundry VTT](https://foundryvtt.com/) que substitui os espaços de magia tradicionais do D&D 5e por um sistema de conjuração baseado em testes, com mecânicas de **Corrupção**, **Ruptura Arcana** e **Dano de Rebote**.

## Mecânicas do Sistema

### 1. O Fim dos Espaços de Magia

O conjurador "puxa" a energia da malha arcana na força bruta:

- **Teste Base**: `1d20 + Modificador de Conjuração + Proficiência`
- **CD para manifestar**: `10 + Nível da Magia`
- O jogador pode fazer **Upcast** livremente, mas a CD e os riscos aumentam

### 2. Rolagem Unificada

- **Magias de Ataque**: A rolagem de ataque determina simultaneamente se superou a CD da magia E a CA do alvo
- **Magias de Área (Salvaguarda)**: Teste de Habilidade de Conjuração para manifestar; se passar, alvos fazem seus testes de resistência normalmente

### 3. Falha Comum e Dano de Rebote

Se a rolagem total não atingir a CD, o feitiço pifa e causa **Dano de Força ou Psíquico irredutível**:

| Patamar | Dano |
|---|---|
| 1º a 3º Círculo | 1d4 por nível da magia |
| 4º a 6º Círculo | 1d6 por nível da magia |
| 7º a 9º Círculo | 1d8 por nível da magia |

- **Truques são seguros**: falhar gasta a ação mas não causa dano de rebote
- **Rejeição temática**: sabor narrativo ligado à classe do conjurador

### 4. Margem de Corrupção

- Novo recurso na ficha: **Corrupção** (1–20)
- Aumenta em +1 a cada magia de 1º+ círculo conjurada
- Se o **dado puro** (d20 sem modificadores) ≤ Corrupção atual → **Ruptura Arcana!**

### 5. Ruptura Arcana (Tabela 1d100)

| Faixa | Efeito |
|---|---|
| 01–25 | Anomalias Sensoriais |
| 26–50 | Debilitações Táticas (cegueira, silêncio) |
| 51–75 | Explosões e danos em área |
| 76–95 | Invasões Cósmicas, invocações hostis |
| 96–100 | Colapso Total (0 PV, perda de magias, possessão) |

### 6. Ação: Purgar a Malha

- O jogador sacrifica sua Ação no combate para reduzir a Corrupção em -1
- Distribuída como Característica de Classe ou usada via Macro

## Instalação

1. No Foundry VTT, vá em **Configurações → Módulos → Instalar Módulo**
2. Cole a URL do `module.json` no campo "URL do Manifesto"
3. Ative o módulo na sua sessão

## Configuração

### Na Ficha do Personagem

1. Adicione um **Recurso Customizado** chamado **"Corrupção"** com valor inicial 1 e máximo 20
2. Adicione a característica **"Ação: Purgar a Malha"** ao personagem

### Nas Configurações do Módulo

- **Aplicar a NPCs**: Estende o sistema a NPCs conjuradores
- **Tipo de Dano de Rebote**: Força ou Psíquico
- **Sabor Narrativo**: Ativa/desativa texto temático por classe
- **Auto-aplicar Dano**: Aplica dano de rebote automaticamente ao PV
- **Auto-incrementar Corrupção**: Aumenta automaticamente a cada conjuração

### Macro: Purgar a Malha

Crie uma macro do tipo Script com o seguinte código:

```javascript
purgarAMalha();
```

Ou use: `game.malhaArcana.purgeMacro()`

## Requisitos

- Foundry VTT v10 ou superior
- Sistema D&D 5e v2.0.0 ou superior

## Licença

[MIT License](LICENSE)
