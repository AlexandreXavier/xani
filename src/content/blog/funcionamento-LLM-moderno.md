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

![Funcionamento de um LLM Moderno](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWJ1MpXS227WfaDpOiCm8Yvqxde45rEloRHuN9)
## Explicação de como funciona um “ChatGPT” da nossa vida.

Ao interagir com um assistente de IA, o utilizador envia um **prompt** (pergunta ou instrução) que é processado numa **memória de trabalho** (ou **contexto**). Este contexto é alimentado por três elementos fundamentais:

- **Prompt do sistema**: define a personalidade, as regras e o comportamento do assistente.
- **Histórico da conversa**: registo das interações anteriores durante a sessão.
- **Dados externos ou bases de dados** (quando disponíveis): informação adicional utilizada para enriquecer as respostas.

> **Nota:** Esta sessão é temporária e volátil. Sem integração com bases de dados externas, a IA não retém informações sobre histórico de clientes, inventários ou preferências para além da conversa em curso. Assim, a "memória" do modelo limita-se à sessão de chat ativa.

---

# Como um LLM processa um pedido
![Como um LLM processa um pedido](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWyPX47mjjFR3ctmVkzEvM0CSegpJBL5ZdUIAT)

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

# Ate aqui a conversa efémera (desaparece assim que a sessão é encerrada)

Para resolver este problema, é necessário implementar uma **memória persistente** que permita ao agente de IA acessar e manipular dados de forma contínua, independentemente da sessão ativa.

# Os três pilares da memória de um agente de IA
![Os três pilares da memória de um agente de IA](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWAM9hTwF9GDCTai65qypUt8PKb1gvSVOeRwXr)

Para otimizar a memória de trabalho de um agente, é essencial integrar três tipos de memória:

| **Tipo de Memória** | **Definição** | **Funcionalidade** | **Armazenamento** |
|---------------------|---------------|--------------------|-------------------|
| **Procedural** | Define como o agente deve comportar-se em diferentes situações. | Contém habilidades e regras de conduta, como responder com cortesia a clientes irritados. | Ficheiros de texto em Markdown (ex.: `skill.md`). |
| **Semântica** | Armazena factos duradouros, perfis de utilizadores e informação estática. | Permite recuperar conhecimento relevante, como o perfil da empresa ou o catálogo de produtos. | **Vector Store** (base de dados vetorizada). |
| **Episódica** | Regista eventos específicos e datados. | Mantém o histórico detalhado de interações, compras, reclamações e outros acontecimentos. | **Vector Store** (logs e histórico). |

---

## Memória procedural
![Memória procedural](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWhFxCQotOA59Xdm0PuY6sQfeoWDxwI2KtzpJ7)

O principal foco recai sobre a **memória procedural**, responsável por definir o comportamento do agente através de **hábitos**, **procedimentos** ou **competências específicas**.

Esta componente determina como o sistema deve reagir em situações recorrentes, por exemplo:

- Manter a cortesia perante um cliente irritado;
- Seguir um protocolo de atendimento;
- Aplicar regras específicas de negócio.

Na prática, estas competências são organizadas em ficheiros **Markdown**, como por exemplo:

```text
skill.md
```
---

# Memória Semântica e Episódica
![](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWvoTTBzNfJtNxIUAQ84gzqYBcKe9sElvS6b07)

A **memória semântica** e a **memória episódica** não funcionam como arquivos convencionais. Em vez disso, são armazenadas através de **vetores** que alimentam a memória de trabalho do agente de IA.

A **memória semântica** concentra-se em **factos duradouros** e **perfis**. Por exemplo, um modelo de IA apenas reconhece informações sobre uma empresa se esta possuir uma presença consolidada ou se o seu perfil tiver sido previamente definido. O modelo não possui conhecimento intrínseco sobre entidades desconhecidas ou recentemente criadas.

Como o modelo não possui conhecimento prévio sobre um utilizador ou uma empresa específica, é necessário recorrer ao **RAG (Retrieval-Augmented Generation)**.

O processo consiste em:

1. Armazenar os dados numa **base de conhecimento externa**.
2. Converter esses dados em **vetores**.
3. Permitir que o agente consulte essa informação durante a geração da resposta.
4. Recuperar apenas a informação mais relevante através de uma pesquisa **Top-K**.

Desta forma, o agente consegue responder com base em conhecimento específico sem necessidade de reprocessar toda a base de dados.

## Vetores Numéricos

Textos, documentos e outros conteúdos são convertidos em **vetores numéricos**, permitindo que a IA realize pesquisas por **similaridade semântica** em vez de depender apenas de palavras-chave.

## Busca Top-K

A técnica **RAG** utiliza uma pesquisa **Top-K**, que recupera apenas os **K documentos ou trechos mais relevantes** do *vector store* para enriquecer o contexto enviado ao modelo.

Esta abordagem apresenta várias vantagens:

- Reduz a quantidade de informação enviada ao LLM.
- Diminui custos de processamento.
- Aumenta a relevância das respostas.
- Melhora o desempenho do agente.

---

# Diferença entre Memória Semântica e Memória Episódica

| Tipo de memória | Conteúdo | Exemplo |
|-----------------|----------|---------|
| **Memória Semântica** | Factos gerais, conhecimento permanente e perfis. | Catálogo de produtos, políticas da empresa, documentação técnica. |
| **Memória Episódica** | Eventos específicos associados a um momento no tempo. | Compras realizadas, reclamações, pedidos de suporte, histórico de interações. |

---

# Benefícios da Segmentação

A separação entre memória semântica e episódica permite:

- Melhor controlo do volume de informação enviada ao modelo.
- Respostas mais precisas e contextualizadas.
- Pesquisa mais eficiente através de vetores.
- Escalabilidade na gestão da informação do agente de IA.
- Melhor desempenho em aplicações empresariais.


---

# Considerações Finais e Boas Práticas

A arquitetura apresentada representa um **modelo moderno e recomendado** para a construção de agentes de IA. O seu objetivo é dotar o agente de memória, contexto e capacidade de personalização, mantendo simultaneamente um elevado desempenho e escalabilidade.

## Componentes da Arquitetura

A arquitetura é composta por quatro elementos principais:

### Memória Procedural

Responsável pelas **competências e comportamentos** do agente, definindo a forma como este deve atuar perante diferentes situações.

**Exemplos:**

- Protocolos de atendimento;
- Regras de negócio;
- Estilo de comunicação;
- Procedimentos operacionais.

---

### Memória Semântica

Armazena **factos duradouros** e conhecimento persistente, tais como:

- Perfil da empresa;
- Catálogo de produtos;
- Documentação técnica;
- Políticas e procedimentos.

---

### Memória Episódica

Regista o **histórico de eventos e interações**, incluindo informação temporal.

**Exemplos:**

- Compras efetuadas;
- Reclamações;
- Pedidos de suporte;
- Conversas anteriores;
- Estado de processos.

---

### Mecanismo de Consolidação

Responsável por criar **resumos eficientes** das interações e atualizar a memória principal do agente.

Este mecanismo permite:

- Reduzir o volume de informação armazenada;
- Preservar apenas os dados relevantes;
- Melhorar a eficiência das pesquisas futuras.

---

# Boas Práticas

Para garantir que um agente de IA permanece **leve**, **rápido** e **escalável**, é recomendado:

- Utilizar **bases de dados vetoriais (Vector Databases)**.
- Implementar técnicas de pesquisa inteligente, como **RAG (Retrieval-Augmented Generation)**.
- Recuperar apenas a informação mais relevante através de pesquisas **Top-K**.
- Separar claramente a memória procedural, semântica e episódica.

Estas práticas reduzem o contexto enviado ao modelo, diminuem custos computacionais e aumentam a qualidade das respostas.

---

# Conclusão

Dominar esta arquitetura é fundamental para startups e programadores que pretendam desenvolver agentes de IA capazes de:

- Personalizar respostas para cada utilizador;
- Manter contexto entre interações;
- Utilizar conhecimento específico da organização;
- Adaptar o comportamento a diferentes cenários;
- Evitar que seja necessário reexplicar continuamente a mesma informação ao modelo.

Esta abordagem constitui atualmente uma das melhores práticas para o desenvolvimento de agentes de IA modernos, contextualizados e escaláveis.