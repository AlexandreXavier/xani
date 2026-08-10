---
author: Alexandre Xavier
pubDatetime: 2026-08-09T09:00:00Z
modDatetime: 2026-08-09T09:00:00Z
title: 'SQLite: O Fim do Reflexo "Postgres por Defeito"'
slug: sqlite-fim-do-reflexo
featured: true
draft: false
tags:
  - sqlite
language: pt
description: "SQLite: O Fim do Reflexo 'Postgres por Defeito'"
---

![](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWpvlw4BYSGDacmv89F42kRr5OqQMWjVTKguH3)
# SQLite: O Fim do Reflexo "Postgres por Defeito"

Muitas equipes escolhem o PostgreSQL por reflexo, ignorando o custo de infraestrutura e a latência de rede desnecessária. O SQLite surge como uma alternativa de alta performance que elimina o "imposto da rede" ao rodar no processo da aplicação. Esta mudança transforma radicalmente a eficiência e o custo do sistema.

A análise a seguir desconstrói o mito de que o SQLite é apenas para projetos simples.

## A Taxa da Rede: Microssegundos vs. Milissegundos

O Postgres opera como um servidor externo via socket, exigindo que cada consulta atravesse o kernel e o "fio" da rede. No SQLite, a consulta é uma chamada de função interna: não há rede para esperar, apenas execução imediata.

*   **Latência Local:** Escassas dezenas de microssegundos por operação.
*   **Latência de Rede:** Centenas de milissegundos (ida e volta) no melhor cenário.

O Impacto Real: 40 queries no Postgres significam 40 round-trips na rede; no SQLite, são 40 chamadas locais. A latência de rede mata a UX muito antes do seu código ser processado.

> "Um Postgres gerido no Amazon RDS escala de 15/mês para **475/mês** com réplicas e 200GB. O SQLite custa zero: é um arquivo e o driver já vem no núcleo da sua linguagem."

Esta eficiência traduz-se em números de desempenho que desafiam a intuição da indústria.

## Benchmarks: Onde o SQLite Esmaga a Concorrência

Performance em Escala Real Honestidade técnica: em um schema vazio, o Postgres vence (24ms vs 31ms). Mas quando os dados crescem e as consultas ficam aninhadas, o SQLite assume a liderança absoluta em performance.

*   **Latência P99:** 8.2s no SQLite vs. 14s no Postgres (Teste Intuitum).
*   **Escrita em Massa:** 10.5k inserts/segundo (Benchmark Forward Email).
*   **Escala de Gigante:** A Expensify processou 4 milhões de queries/segundo em 10 bilhões de linhas num único servidor.

Estes dados provam que o SQLite é um motor de dados capaz de suportar cargas de produção massivas sob configuração correta.

## Derrubar as Muralhas: Escrita, Servidores e Funcionalidades

### Escrita Concorrente
O modo WAL resolve o bloqueio entre leitores e escritores. O Turso (reescrito em Rust/LibSQL) introduziu o row-level locking: se os escritores tocarem linhas diferentes, não há conflito, eliminando o erro "Database is locked".

### Múltiplos Servidores
O Litestream faz backup assíncrono em tempo real para S3 (RPO baixo). Já a Cloudflare, via Durable Objects, isola um SQLite por "tenant", eliminando a necessidade de sharding complexo na raiz.

### Extensões e Roles
O Postgres é imbatível se você precisa de PostGIS, PG Vector ou segurança via roles internas (RBAC). Se a sua lógica de acesso depende da base de dados, o Postgres continua sendo a decisão técnica correta.

## O Protocolo de Decisão: 4 Perguntas Cruciais

1.  **Unidade de deploy única?** Se não há rede entre app e DB, a latência cai para microssegundos.
2.  **Escritas em linhas diferentes?** O bloqueio ao nível da linha do Turso ou o modo WAL resolvem a concorrência moderna.
3.  **Dados abaixo de centenas de GB?** Embora suporte terabytes, a documentação recomenda buscar alternativas antes do limite de 281 TB.
4.  **Sem dependência de extensões?** Se não usa PostGIS ou tipos exóticos, o overhead do Postgres é apenas um desperdício.

## Conclusão e Tarefa de Casa

O "Postgres por defeito" ignora a física da rede e o custo operacional. Curiosamente, a própria Turso está construindo um banco Postgres-compatible sobre o mesmo core em Rust, provando que a briga não é contra o Postgres, mas contra o hábito irracional.

**Tarefa de Casa:** Avalie se o seu projeto atual passa no teste das 4 perguntas. Se sim, quanto você economizaria hoje eliminando o servidor de banco de dados e reduzindo a latência para microssegundos?