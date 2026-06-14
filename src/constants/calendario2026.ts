// Calendário Nacional de Regatas de Cruzeiro 2026 (Portugal)
//
// Source of truth for the Calendario board (/vela/calendario). See
// docs/adr/0001-calendario-source-of-truth.md for why this lives here as typed
// data instead of in the original markdown (now removed).
//
// Consolidated 14 Jun 2026. Each race appears once, taken from the authoritative
// per-region sections (the cross-region "Próximas provas" view in the source was
// derived and is recomputed by the board, not stored here).
//
// Region sources:
//   Centro  — ARVC / ANC:  https://www.ancruzeiros.pt/ancdrp/calendário-regatas-arvc-2026
//   Madeira — ARVM:        https://arvm.pt/documentacao/CALENDARIO/Calendário-Provas-ARVM.pdf | https://arvm.pt/provas/
//   Norte   — ARVNorte:    https://arvn.pt/competicoes/ | http://www.clubenavalpovoense.com/agenda/
//   Sul     — ARV Sul:     https://www.arvelasul.com/competição (site intermittently down)
//   Açores  — ARVA:        https://velazores.com/ | https://atlantiscup.com/
//
// Class legend: ANC = sistema de abono ANC | ORC = Offshore Racing Congress |
// NHC = handicap | 2T = circuito de dois tripulantes | Cruzeiros / Open.

export type Region =
  | "Centro"
  | "Norte"
  | "Madeira"
  | "Sul"
  | "Açores"
  | "Nacional";

export type RaceClass = "ANC" | "ORC" | "NHC" | "2T" | "Cruzeiros" | "Open";

export type Regata = {
  /** Race / event name. */
  name: string;
  /** ISO yyyy-mm-dd. For single-day races, equals endDate. */
  startDate: string;
  /** ISO yyyy-mm-dd. */
  endDate: string;
  region: Region;
  /** Location text as published. */
  local: string;
  /** Organizing club / association, when known. */
  club?: string;
  /** Handicap/rating systems; empty when the source listed none ("-"). */
  classes: RaceClass[];
  /** Marquee national event of the year. */
  featured?: boolean;
};

export const CALENDARIO_YEAR = 2026;

// Ordered roughly by date; the board sorts at runtime so authoring order is free.
export const CALENDARIO_2026: Regata[] = [
  // ── Nacional ────────────────────────────────────────────────────────────
  {
    name: "Campeonato de Portugal de Cruzeiros ORC",
    startDate: "2026-07-11",
    endDate: "2026-07-14",
    region: "Nacional",
    local: "Figueira da Foz",
    club: "CNFF / FPV",
    classes: ["ORC"],
    featured: true,
  },

  // ── Centro — ARVC (Tejo / Lisboa / Setúbal / Cascais) ─────────────────────
  { name: "1ª Regata CSP", startDate: "2026-01-10", endDate: "2026-01-10", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "Troféu SAD", startDate: "2026-01-11", endDate: "2026-01-11", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "1ª Regata de Inverno", startDate: "2026-01-17", endDate: "2026-01-17", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Regata 2T Tejo", startDate: "2026-01-18", endDate: "2026-01-18", region: "Centro", local: "Cacilhas-Oeiras-Cacilhas", club: "CN Almada", classes: ["2T", "ANC", "ORC"] },
  { name: "2ª Regata CSP", startDate: "2026-01-24", endDate: "2026-01-24", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "I Regata do Sado", startDate: "2026-01-24", endDate: "2026-01-24", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata 134º Aniversário CNL", startDate: "2026-01-25", endDate: "2026-01-25", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "2ª Regata de Inverno", startDate: "2026-02-07", endDate: "2026-02-07", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Pedro Mendonça", startDate: "2026-02-07", endDate: "2026-02-08", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ORC"] },
  { name: "Troféu SAD", startDate: "2026-02-15", endDate: "2026-02-15", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "3ª Regata CSP", startDate: "2026-02-21", endDate: "2026-02-21", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "Regata Teixeira da Fonseca", startDate: "2026-02-22", endDate: "2026-02-22", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "II Regata do Sado", startDate: "2026-02-28", endDate: "2026-02-28", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "4ª Regata CSP - António Perfeito", startDate: "2026-03-07", endDate: "2026-03-07", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "Infante D. Henrique", startDate: "2026-03-07", endDate: "2026-03-07", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Regata do Dia da Mulher", startDate: "2026-03-08", endDate: "2026-03-08", region: "Centro", local: "Mar da Palha", club: "CN Almada", classes: ["ANC"] },
  { name: "3ª Regata de Inverno", startDate: "2026-03-14", endDate: "2026-03-14", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Ernesto Mendonça", startDate: "2026-03-14", endDate: "2026-03-15", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ORC"] },
  { name: "Troféu SAD", startDate: "2026-03-21", endDate: "2026-03-21", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Regata Frederico Burnay", startDate: "2026-03-22", endDate: "2026-03-22", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "Ostras / Dunbelt", startDate: "2026-03-28", endDate: "2026-03-28", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "III Regata do Sado", startDate: "2026-03-28", endDate: "2026-03-28", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Troféu SAD", startDate: "2026-04-04", endDate: "2026-04-04", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Regata matchracing Setteseven", startDate: "2026-04-11", endDate: "2026-04-11", region: "Centro", local: "Mar da Palha", club: "CAVCMA", classes: [] },
  { name: "XIII Troféu Cidade de Almada", startDate: "2026-04-11", endDate: "2026-04-12", region: "Centro", local: "Mar da Palha", club: "CN Almada", classes: ["ANC", "ORC"] },
  { name: "Solitários", startDate: "2026-04-18", endDate: "2026-04-18", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "IV Regata Sado - Troféu Abel Nunes", startDate: "2026-04-18", endDate: "2026-04-18", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata Abel Power Dagge", startDate: "2026-04-19", endDate: "2026-04-19", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "Wintermantel", startDate: "2026-04-25", endDate: "2026-04-25", region: "Centro", local: "Tejo e Sesimbra", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Walter Brasch", startDate: "2026-04-26", endDate: "2026-04-26", region: "Centro", local: "Sesimbra e Tejo", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Desfile Náutico dos 170 anos", startDate: "2026-05-01", endDate: "2026-05-01", region: "Centro", local: "Tejo", club: "ANL", classes: [] },
  { name: "Aniversário ANL", startDate: "2026-05-02", endDate: "2026-05-03", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Campeonato Nacional ANC", startDate: "2026-05-09", endDate: "2026-05-10", region: "Centro", local: "Mar da Palha", club: "CN Almada", classes: ["ANC"] },
  { name: "V Regata do Sado - Troféu APSS", startDate: "2026-05-16", endDate: "2026-05-16", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata Fernão Mendes Pinto", startDate: "2026-05-16", endDate: "2026-05-17", region: "Centro", local: "Cacilhas-Caparica-Cascais", club: "CN Almada", classes: ["ANC", "ORC"] },
  { name: "5ª Regata CSP - Carlos Santos", startDate: "2026-05-23", endDate: "2026-05-23", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "Pilotos", startDate: "2026-05-24", endDate: "2026-05-24", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Regata Clube Oficiais Marinha Mercante", startDate: "2026-05-30", endDate: "2026-05-30", region: "Centro", local: "Estuário do Tejo", club: "COMM", classes: ["2T", "ORC"] },
  { name: "Troféu Conde Caria", startDate: "2026-05-30", endDate: "2026-05-31", region: "Centro", local: "Cascais-Sines-Cascais", club: "CN Cascais", classes: ["ANC"] },
  { name: "Troféu SAD", startDate: "2026-05-31", endDate: "2026-05-31", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Cidade de Lisboa", startDate: "2026-06-06", endDate: "2026-06-06", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "6ª Regata CSP", startDate: "2026-06-06", endDate: "2026-06-06", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "VI Regata - 7ª Regata ACM", startDate: "2026-06-06", endDate: "2026-06-06", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata matchracing Oktoeight", startDate: "2026-06-06", endDate: "2026-06-07", region: "Centro", local: "Mar da Palha", club: "CAVCMA", classes: [] },
  { name: "Sails of Lisbon", startDate: "2026-06-13", endDate: "2026-06-13", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Torneio Fim de Tarde - 1ª Regata", startDate: "2026-06-19", endDate: "2026-06-19", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "Aniversário CNC", startDate: "2026-06-20", endDate: "2026-06-21", region: "Centro", local: "Cascais", club: "CN Cascais", classes: ["ORC", "ANC", "NHC"] },
  { name: "116º Aniversário SAD", startDate: "2026-06-21", endDate: "2026-06-21", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Torneio Fim de Tarde - 2ª Regata", startDate: "2026-06-26", endDate: "2026-06-26", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "Nacex", startDate: "2026-06-27", endDate: "2026-06-27", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "7ª Regata CSP - Ponto Rio", startDate: "2026-07-04", endDate: "2026-07-04", region: "Centro", local: "Rio Tejo", club: "C. Sportivo Pedrouços", classes: [] },
  { name: "Mirpuri Foundation Sailing Trophy", startDate: "2026-07-04", endDate: "2026-07-05", region: "Centro", local: "Cascais", club: "CN Cascais", classes: ["ORC", "ANC", "NHC"] },
  { name: "Torneio Fim de Tarde - 3ª Regata", startDate: "2026-07-10", endDate: "2026-07-10", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "VII Regata / 9º Troféu Vasco da Gama (Baixada a Sines)", startDate: "2026-07-25", endDate: "2026-07-25", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Cascais Vela", startDate: "2026-08-28", endDate: "2026-08-30", region: "Centro", local: "Cascais", club: "CN Cascais", classes: ["ORC", "ANC", "NHC"] },
  { name: "VIII Regata do Sado", startDate: "2026-08-29", endDate: "2026-08-29", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "XIII Regata do Ambiente", startDate: "2026-09-12", endDate: "2026-09-13", region: "Centro", local: "Mar da Palha", club: "CN Almada", classes: ["ANC", "ORC"] },
  { name: "Generali", startDate: "2026-09-19", endDate: "2026-09-19", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Regata matchracing Novenine", startDate: "2026-09-19", endDate: "2026-09-20", region: "Centro", local: "Mar da Palha", club: "CAVCMA", classes: [] },
  { name: "Regata Gilberto de Sousa", startDate: "2026-09-20", endDate: "2026-09-20", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "IX Regata do Sado - Troféu Álvaro Pescaria", startDate: "2026-09-26", endDate: "2026-09-26", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "D. Pedro V", startDate: "2026-09-26", endDate: "2026-09-27", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Troféu de Outono SAD", startDate: "2026-10-03", endDate: "2026-10-03", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Champalimaud", startDate: "2026-10-05", endDate: "2026-10-05", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "Aniversário ANC", startDate: "2026-10-10", endDate: "2026-10-10", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Regata do CVS (a dois)", startDate: "2026-10-10", endDate: "2026-10-10", region: "Centro", local: "Setúbal", club: "CV Sado", classes: ["2T"] },
  { name: "Regata João Torka", startDate: "2026-10-11", endDate: "2026-10-11", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "X Regata do Sado - Semana do Mar APSS", startDate: "2026-10-17", endDate: "2026-10-17", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata Sol e Mar", startDate: "2026-10-17", endDate: "2026-10-18", region: "Centro", local: "Cascais-Oeiras", club: "CN Almada", classes: ["2T", "ANC", "ORC"] },
  { name: "Regata Hotel", startDate: "2026-10-24", endDate: "2026-10-24", region: "Centro", local: "Mar da Palha", club: "CAVCMA", classes: ["ORC", "ANC", "NHC"] },
  { name: "APL", startDate: "2026-11-01", endDate: "2026-11-01", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC", "ORC"] },
  { name: "XI Regata do Sado", startDate: "2026-11-07", endDate: "2026-11-07", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },
  { name: "Regata Tertúlia Vélica", startDate: "2026-11-08", endDate: "2026-11-08", region: "Centro", local: "Estuário do Tejo", club: "CN Lisboa", classes: ["ANC"] },
  { name: "D. Amélia", startDate: "2026-11-14", endDate: "2026-11-14", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Regata Baía da Caparica", startDate: "2026-11-15", endDate: "2026-11-15", region: "Centro", local: "Oeiras-Meco-Oeiras", club: "CN Almada", classes: ["2T", "ANC", "ORC"] },
  { name: "Troféu de Outono SAD", startDate: "2026-11-21", endDate: "2026-11-21", region: "Centro", local: "Lisboa/Belém", club: "Algés e Dafundo", classes: [] },
  { name: "Natal", startDate: "2026-11-28", endDate: "2026-11-28", region: "Centro", local: "Tejo", club: "ANL", classes: ["ANC"] },
  { name: "Natal", startDate: "2026-11-28", endDate: "2026-11-29", region: "Centro", local: "Tejo e Cascais", club: "ANL", classes: ["ORC"] },
  { name: "XII Regata do Sado", startDate: "2026-12-05", endDate: "2026-12-05", region: "Centro", local: "Setúbal", club: "CV Sado", classes: [] },

  // ── Madeira — ARVM / CN Funchal ──────────────────────────────────────────
  { name: "Troféu ANM / Regata GRUPO SOUSA", startDate: "2026-04-18", endDate: "2026-04-18", region: "Madeira", local: "Funchal", club: "ANM/ARVM", classes: ["Cruzeiros"] },
  { name: "Campeonato da Madeira de Cruzeiros", startDate: "2026-05-01", endDate: "2026-05-03", region: "Madeira", local: "Madeira", club: "ARVM/Clubes", classes: ["Cruzeiros"] },
  { name: "Regata Dia da Marinha / Troféu Cidade do Funchal", startDate: "2026-05-16", endDate: "2026-05-16", region: "Madeira", local: "Funchal", club: "CNF", classes: ["Cruzeiros"] },
  { name: "Regata TECNOVIA YACHT SERVICE", startDate: "2026-06-13", endDate: "2026-06-13", region: "Madeira", local: "Costa Sul, Madeira", club: "CNF/ARVM", classes: ["Cruzeiros"] },
  { name: "Regata Final de Tarde - 3ª Prova", startDate: "2026-06-26", endDate: "2026-06-26", region: "Madeira", local: "Funchal", club: "CNF", classes: ["Cruzeiros"] },
  { name: "Regata Final de Tarde - 4ª Prova", startDate: "2026-07-17", endDate: "2026-07-17", region: "Madeira", local: "Funchal", club: "CNF", classes: ["Cruzeiros"] },
  { name: "Regata PORTO SANTO LINE", startDate: "2026-08-14", endDate: "2026-08-16", region: "Madeira", local: "Madeira-Porto Santo-Madeira", club: "CNF/ARVM", classes: ["Cruzeiros"] },
  { name: "Regata Golden Island", startDate: "2026-08-15", endDate: "2026-08-15", region: "Madeira", local: "Porto Santo", club: "CNPS/ARVM", classes: ["Cruzeiros"] },
  { name: "Regata Internacional Canárias - Madeira", startDate: "2026-09-01", endDate: "2026-09-05", region: "Madeira", local: "Canárias-Madeira", club: "CNF", classes: ["Cruzeiros"] },
  { name: "Regata Reserva Natural das Ilhas Desertas", startDate: "2026-09-26", endDate: "2026-09-26", region: "Madeira", local: "Santa Cruz/Desertas", club: "ICSC/ARVM", classes: ["Cruzeiros"] },

  // ── Norte — ARVNorte ─────────────────────────────────────────────────────
  { name: "Regata Primavera", startDate: "2026-04-18", endDate: "2026-04-18", region: "Norte", local: "Póvoa", club: "Clube Naval Povoense", classes: [] },
  { name: "Regata de Solitários", startDate: "2026-05-09", endDate: "2026-05-09", region: "Norte", local: "Póvoa", club: "Clube Naval Povoense", classes: [] },
  { name: "Regata Cidade da Póvoa (Leixões-Póvoa)", startDate: "2026-05-30", endDate: "2026-05-30", region: "Norte", local: "Leixões-Póvoa", club: "CN Povoense / CV Atlântico", classes: [] },
  { name: "Troféu Luís Ferreira Alves", startDate: "2026-05-31", endDate: "2026-05-31", region: "Norte", local: "Póvoa-Leixões", club: "CN Povoense / CV Atlântico", classes: [] },
  { name: "Regata de S. João (CNAFF)", startDate: "2026-06-20", endDate: "2026-06-20", region: "Norte", local: "Norte litoral", club: "CNAFF", classes: [] },
  { name: "Regata de São João (YCP)", startDate: "2026-06-20", endDate: "2026-06-20", region: "Norte", local: "Norte litoral", club: "YCP", classes: [] },
  { name: "2ª Prova da Taça Norte", startDate: "2026-06-20", endDate: "2026-06-21", region: "Norte", local: "Norte", club: "ARVNorte", classes: [] },
  { name: "Raid Praias de Montargil", startDate: "2026-06-27", endDate: "2026-06-28", region: "Norte", local: "Albufeira de Montargil", club: "ARVNorte", classes: [] },
  { name: "Regata Marina da Póvoa", startDate: "2026-07-05", endDate: "2026-07-05", region: "Norte", local: "Póvoa de Varzim", club: "Clube Naval Povoense", classes: [] },

  // ── Sul / Algarve — ARV Sul ──────────────────────────────────────────────
  { name: "1.º Campeonato Regional do Sul de Cruzeiros", startDate: "2026-05-01", endDate: "2026-05-03", region: "Sul", local: "Praia da Rocha / Portimão", club: "ARV Sul", classes: ["ORC", "Cruzeiros"] },

  // ── Açores — ARVA / Velaçores ────────────────────────────────────────────
  { name: "Atlantis Cup - Regata da Autonomia", startDate: "2026-07-25", endDate: "2026-08-02", region: "Açores", local: "Açores", club: "ARVA", classes: ["ORC", "Open"] },
];
