---
author: Alexandre Xavier
pubDatetime: 2026-08-01T20:22:00+01:00
modDatetime: 2026-08-01T21:23:47.400+01:00
title: Funcionamento de um LLM Moderno
slug: funcionamento-llm-moderno
featured: true
draft: false
tags:
  - ia
language: pt
description:
  Explicação de como funciona um “ChatGPT” da nossa vida.
---


# Explicação de como funciona um “ChatGPT” da nossa vida.


Ao interagir com um assistente de IA, o utilizador envia um **prompt** (pergunta ou instrução) que é processado numa **memória de trabalho** (ou **contexto**). Este contexto é alimentado por três elementos fundamentais:

- **Prompt do sistema**: define a personalidade, as regras e o comportamento do assistente.
- **Histórico da conversa**: registo das interações anteriores durante a sessão.
- **Dados externos ou bases de dados** (quando disponíveis): informação adicional utilizada para enriquecer as respostas.

> **Nota:** Esta sessão é temporária e volátil. Sem integração com bases de dados externas, a IA não retém informações sobre histórico de clientes, inventários ou preferências para além da conversa em curso. Assim, a "memória" do modelo limita-se à sessão de chat ativa.

---

![Como um LLM processa um pedido](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWyPX47mjjFR3ctmVkzEvM0CSegpJBL5ZdUIAT)
# Como um LLM processa um pedido

Ao interagir com um **LLM (Large Language Model)**, o processo é mais complexo do que uma simples pergunta e resposta. O **prompt** do utilizador não é analisado isoladamente; é integrado numa **memória de trabalho** (também designada por **RAM de contexto**).

Esta memória combina quatro elementos fundamentais:

1. **Prompt do utilizador**
   - A pergunta ou instrução fornecida pelo utilizador.

2. **Histórico da conversa**
   - O conjunto das interações anteriores da sessão.

3. **Prompt do sistema**
   - As instruções que definem o comportamento, personalidade e regras da IA.

4. **Contexto externo**
   - Dados provenientes da Internet, APIs ou bases de conhecimento externas.

Desta forma, a IA consegue compreender o cenário completo antes de gerar uma resposta mais precisa e contextualizada.

---

# Limitações da memória atual

Atualmente, a interação com um LLM corresponde a uma **sessão efémera**. O modelo apenas retém o histórico da conversa ativa, sem acesso permanente a informações como:

- Stock de produtos;
- Histórico de compras;
- Preferências dos clientes;
- Dados empresariais persistentes.

Para que um agente de IA seja realmente útil em contexto empresarial, é necessário integrá-lo com uma **base de dados externa** ou outros sistemas de informação, ultrapassando assim a natureza temporária da sessão.

---

![Os três pilares da memória de um agente de IA](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWAM9hTwF9GDCTai65qypUt8PKb1gvSVOeRwXr)
# Os três pilares da memória de um agente de IA

Para otimizar a memória de trabalho de um agente, é essencial integrar três tipos de memória:

- **Memória procedural**
- **Memória semântica**
- **Memória episódica**


![](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWhFxCQotOA59Xdm0PuY6sQfeoWDxwI2KtzpJ7)
## Memória procedural

O principal foco recai sobre a **memória procedural**, responsável por definir o comportamento do agente através de **hábitos**, **procedimentos** ou **competências específicas**.

Esta componente determina como o sistema deve reagir em situações recorrentes, por exemplo:

- Manter a cortesia perante um cliente irritado;
- Seguir um protocolo de atendimento;
- Aplicar regras específicas de negócio.

Na prática, estas competências são organizadas em ficheiros **Markdown**, como por exemplo:

```text
skill.md