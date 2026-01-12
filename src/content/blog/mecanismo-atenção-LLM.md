---
author: Alexandre Xavier
pubDatetime: 2025-12-10T16:08:00+01:00
modDatetime: 2025-12-10T19:07:47.400+01:00
title: Mecanismo de Atenção em LLMs
slug: Mecanismo-Atenção-LLM
featured: true
draft: false
tags:
  - ai
language: pt
description: Processo de Geração de Texto em LLMs
---

![Geração de Texto em LLMs](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWwxqNNPW8a0Nvfkr27YyxugeU4jTFpM6WbCH1 "Processo de Geração de Texto em LLMs")

As fontes indicam que o processo de geração de texto em Transformadores e LLMs (Grandes Modelos de Linguagem) é, fundamentalmente, um ciclo de predição e amostragem repetidas.

### O Princípio da Predição

Modelos como o ChatGPT são variantes do Transformador treinadas para:

1. Receber um trecho de texto (que pode incluir imagens ou sons associados).
2. Produzir uma previsão para o que virá a seguir na passagem.
3. Formatar essa previsão como uma distribuição de probabilidade sobre muitos trechos diferentes de texto que podem se seguir.

À primeira vista, pode parecer que "prever a próxima palavra" é um objetivo muito diferente de "gerar um novo texto".

### O Ciclo de Geração de Texto Contínuo

Para gerar um trecho de texto mais longo, um modelo de previsão como este utiliza um processo repetitivo:

1. **Fornecimento de entrada:** é dado um trecho inicial de texto para o modelo trabalhar.
2. **Amostragem:** o modelo escolhe uma amostra aleatória da distribuição de probabilidade que acabou de gerar.
3. **Anexação:** essa amostra é anexada ao texto.
4. **Repetição:** o modelo executa todo o processo novamente para fazer uma nova previsão com base no novo texto, incluindo o que acabou de ser adicionado.

Este processo de predição e amostragem repetidas é essencialmente o que acontece quando se interage com o ChatGPT ou outros grandes modelos de linguagem, vendo-os produzir uma palavra por vez.

### O Impacto da Escala

As fontes notam que, apesar de o mecanismo de predição repetida não parecer que deveria funcionar, a **escala do modelo** é crucial para a geração de texto sensato.

- Ao executar o GPT-2 num laptop usando este processo, a história gerada "não faz muito sentido".
- Ao trocar para chamadas de API para o GPT-3 (o mesmo modelo básico, mas muito maior), a história gerada torna-se "sensata". O GPT-3, por exemplo, possui 175 mil milhões de parâmetros.

### Controlo da Geração (Temperatura)

A amostragem da distribuição de probabilidade pode ser controlada através de uma constante chamada **temperatura** (`t`):

- A temperatura é aplicada na função *softmax* (que normaliza os *logits* numa distribuição de probabilidade válida).
- Uma temperatura mais alta (t maior) confere mais peso a valores mais baixos, tornando a distribuição mais uniforme. Isto permite que o modelo escolha palavras menos prováveis, tornando a história mais original, mas com risco de "decair ao absurdo".
- Uma temperatura mais baixa (t menor) faz com que os valores maiores (palavras mais previsíveis) dominem de forma mais agressiva.
- Definir a temperatura igual a zero significa que o modelo **sempre** seleciona a palavra mais previsível, resultando num texto que é um "derivado banal".

### Aplicação como Chatbot

Antes do ChatGPT se popularizar, este processo era usado para fazer o GPT-3 preencher automaticamente histórias e ensaios com base num trecho inicial.

Para transformar este modelo de previsão repetida num chatbot:

1. Utiliza-se um pequeno texto (prompt do sistema) que estabelece a configuração de um utilizador a interagir com um assistente de IA prestativo.
2. O prompt do utilizador é anexado como a primeira parte do diálogo, e o modelo começa a prever o que o assistente diria em resposta.

O processo de predição repetida transforma o Transformador num contador de histórias sequencial, onde a escala gigantesca do modelo (LLM) fornece o conhecimento contextual para que cada nova palavra escolhida pareça sensata e coerente.