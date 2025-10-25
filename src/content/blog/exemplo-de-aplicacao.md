---
author: Alexandre Xavier
pubDatetime: 2025-10-23T15:12:00Z
modDatetime: 2025-10-23T15:12:30Z
title: Uma Aplicação como Exemplo
slug: Aplicacao
featured: true
draft: false
tags:
  - aplicacao
description:
  Uma aplicação como exemplo para enteder o papel dos agentes de IA na geração de conteúdo.
---
[![Linha do Tempo](https://dtsc7359gj.ufs.sh/f/TbfYGcuq8Y7WgUlKHsnaSQJLKyRwnhHD0Pf5cEpvYO1CukWo)](https://linhadotempo.pt)

## Uma aplicação para enteder o papel dos agentes de IA na geração de conteúdo.



### Visão geral

*   **Objetivo:** Transformar uma foto enviada pelo utilizador em versões fotorrealistas ambientadas em diferentes décadas, criando uma “linha do tempo” visual.
*   **Abordagem:** Experiência 100% no frontend que orquestra um agente de IA de geração de imagens (Gemini) para múltiplas tarefas em paralelo, com estratégias de resiliência e UX responsiva.
*   **Resultado:** O utilizador carrega uma foto, a app gera variações por década e permite exportar um álbum final em alta resolução.

### Stack e arquitetura

*   **Frontend:** React + TypeScript + Vite (`package.json`).
*   **UI/UX:** framer-motion para animações; componentes “polaroid” arrastáveis; responsivo para mobile/desktop.
*   **Agente de IA:** `@google/genai` (modelo `gemini-2.5-flash-image`) via `src/services/geminiService.ts`.
*   **Observabilidade:** `@vercel/analytics` e `@vercel/speed-insights` habilitados em `src/index.tsx`.
*   **Geração de álbum:** canvas HTML5 no cliente, via `src/lib/albumUtils.ts`.

### Fluxo principal do utilizador

1.  Upload de imagem em `src/App.tsx` (`handleImageUpload()`).
2.  Disparo da geração para décadas definidas em `DECADAS` com controlo de concorrência em `handleGenerateClick()`.
3.  Visualização incremental dos cartões polaroid com estados por década (pending/done/error).
4.  Regerar imagem por década (detetar “shake” no desktop/ação direta no mobile) via `handleRegenerateDecade()`.
5.  Download de cada imagem ou criação de um álbum único com `createAlbumPage()`.

### Pipeline do agente de IA (onde “a nova maneira” se destaca)

*   **Orquestração do agente:** A app funciona como “agente coordenador” que:

    *   Divide a tarefa global (reimaginar a mesma foto em várias épocas) em subtarefas por década.
    *   Mantém estados independentes por tarefa/decada (`generatedImages`), suportando atualização parcial e recuperação de falhas.
*   **Chamada robusta ao modelo:** Em `src/services/geminiService.ts`:

    *   `generateDecadeImage(imageDataUrl, prompt)` encapsula a criação de partes de conteúdo (imagem + prompt).
    *   `callGeminiWithRetry()` aplica retry com backoff exponencial para erros internos (até 3 tentativas).
    *   `processGeminiResponse()` garante que a resposta seja imagem; erra de forma explícita se vier texto.
*   **Fallback de prompt:** Se o prompt original for bloqueado/retornar texto, usa um prompt mais “neutro” gerado por `getFallbackPrompt()` (após extrair década com `extractDecade()`).
*   **Concorrência controlada:** `concurrencyLimit = 2` em `src/App.tsx`. Balanceia throughput/limites de API e mantém a UI responsiva.
*   **Feedback contínuo:** Estados por década e renderização incremental melhoram a perceção de performance.

### Otimizações de desempenho e confiabilidade

*   **Concorrência limitada:** Reduz saturação e timeouts, mantendo latência média baixa para o utilizador.
*   **Retries com backoff:** Absorve intermitências da API (códigos 500/INTERNAL) sem intervenção do utilizador (`callGeminiWithRetry()`).
*   **Fallback de prompt:** Aumenta taxa de sucesso quando políticas do modelo bloqueiam prompts mais específicos.
*   **Atualização por difusão de estado:** Cada década atualiza independentemente (`setGeneratedImages` por chave), minimizando trabalho de renderização e evitando bloqueios de UI.

### UX defensiva

*   Botões desativados durante downloads/geração.
*   Spinner e mensagens de erro por cartão (`src/components/PolaroidCard.tsx`).
*   Regeneração por cartão com “shake detection” (desktop) para não reiniciar todo o lote.
*   Geração de álbum no cliente: `src/lib/albumUtils.ts` cria um JPEG A4 de alta resolução via canvas:

    *   Evita round-trips de servidor e custos de processamento backend.
    *   Usa carregamento concorrente de imagens e ajustes de layout (grid, rotação sutil, sombras) para estética e rapidez.

### Observabilidade

*   Vercel Analytics/Speed Insights em `src/index.tsx` monitoram interações e performance real de carregamento/SPA.
*   Permite correlacionar ajustes de concorrência/prompts com métricas de UX sem instrumentação manual extensa.

### Limitações e considerações

*   **Chave de API:** Requer `API_KEY` no ambiente (`src/services/geminiService.ts`). Não há backend; a chave exposta no cliente deve ser tratada com cuidado (idealmente proxy/edge).
*   **Custos/limites de API:** A configuração de concorrência e retries precisa alinhar com quotas e custos do provedor.