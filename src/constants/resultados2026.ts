// Resultados (classificações) das Regatas de Cruzeiro 2026 — Portugal
//
// Source of truth for the Resultados board (/vela/resultados). Mirrors the
// Calendario pattern (typed constants in src/constants/, not a content
// collection); see docs/adr/0001-calendario-source-of-truth.md for the rationale
// behind keeping this kind of data here as typed objects.
//
// NOTE — dates: unlike calendario2026.ts (which uses ISO dates because that board
// sorts/filters by date), this board orders by REGION and never sorts by date, so
// `date` is kept as the free-text display string exactly as published
// ("9–10 mai", "jan–mai"). Several sources give ranges with no precise day, so
// there is nothing reliable to convert to ISO.
//
// Consolidated 17 Jun 2026 from official/club sources:
//   Centro  — ANC (PDFs oficiais): https://www.ancruzeiros.pt/ancdrp/regatas
//   Madeira — CN Funchal / imprensa regional
//   Sul     — Sul Informação / ARV Sul
//   Norte   — CV Atlântico / CN Povoense
// Classificações de abr/mai são provisórias. Pódios = 1.º–3.º lugar por classe.

export type Region = "nacional" | "centro" | "norte" | "madeira" | "sul";

export const REGION_LABELS: Record<Region, string> = {
  nacional: "Nacional",
  centro: "Centro",
  norte: "Norte",
  madeira: "Madeira",
  sul: "Sul",
};

// Display order of the cards / region grouping (matches the source "ORDER").
export const REGION_ORDER: Region[] = [
  "nacional",
  "centro",
  "norte",
  "madeira",
  "sul",
];

// Class keys offered in the class filter, in display order.
export const RESULT_CLASSES = [
  "ANC",
  "ORC",
  "Sport Boat",
  "Cruzeiros",
] as const;

/**
 * Boat-name aliases: collapse sponsor-decorated names onto a single canonical
 * boat so the podium tally and search treat them as one entry.
 */
export const BOAT_ALIASES: Record<string, string> = {
  "Tiro – Xpand IT": "Tiro",
  "Tiro - Xpand IT": "Tiro",
  "Super Açor XIS – Portugal Getaways": "Super Açor XIS",
  "Super Açor XIS – Portugal/Getaways": "Super Açor XIS",
};

export function canonicalBoat(name: string): string {
  return BOAT_ALIASES[name] ?? name;
}

/** A single podium line: boat plus optional skipper and club. */
export type PodiumRow = {
  boat: string;
  skipper?: string;
  club?: string;
};

/** One class/division within an event, with its podium. */
export type ResultClass = {
  /** Display label, e.g. "ORC — Geral", "ANC — Frota A". */
  label: string;
  /** Filter key, e.g. "ORC", "ANC", "Sport Boat", "Cruzeiros". */
  classKey: string;
  rows: PodiumRow[];
};

export type ResultEvent = {
  region: Region;
  /** Event/race name as published. */
  prova: string;
  /** Free-text date string ("9–10 mai", "jan–mai"). Display only. */
  date: string;
  /** Location text as published. */
  place: string;
  /** True when standings haven't been published yet. */
  pending?: boolean;
  /** Editorial note shown under the card (or the pending explanation). */
  note?: string;
  /** Podiums by class; omitted for pending events. */
  classes?: ResultClass[];
};

export const RESULTADOS_YEAR = 2026;

export const RESULTADOS_2026: ResultEvent[] = [
  {
    region: "nacional",
    prova: "Campeonato Nacional ANC 2026 / Troféu Vela Azul",
    date: "9–10 mai",
    place: "Almada · Mar da Palha",
    pending: true,
    note: "Classificações finais ainda não publicadas pela ANC ~5 semanas após a prova.",
  },

  {
    region: "madeira",
    prova: "Campeonato Regional da Madeira de Cruzeiros",
    date: "1–3 mai",
    place: "Funchal · CNF",
    classes: [
      {
        label: "ORC — Geral",
        classKey: "ORC",
        rows: [
          { boat: "Mono Mania", skipper: "João Caires", club: "CNF" },
          { boat: "Swing" },
          { boat: "Frederica Devónia" },
        ],
      },
    ],
    note: "Mono Mania venceu também a divisão ORC-C. Último dia disputado à chuva.",
  },

  {
    region: "sul",
    prova: "1.º Campeonato Regional do Sul de Cruzeiros",
    date: "1–3 mai",
    place: "Praia da Rocha · Portimão",
    classes: [
      {
        label: "ORC",
        classKey: "ORC",
        rows: [
          { boat: "Magano – Polaca.pt" },
          { boat: "Jáfoste" },
          { boat: "Mar Meu – Navepegos" },
        ],
      },
      {
        label: "Sport Boat",
        classKey: "Sport Boat",
        rows: [
          { boat: "Corkcrew – Yachting Lifestyle" },
          { boat: "Too Much / João Marques Seguros" },
          { boat: "Paquito" },
        ],
      },
    ],
    note: "Estreia da prova na região · 10 barcos, +50 velejadores.",
  },

  {
    region: "norte",
    prova: "Regata Cidade da Póvoa",
    date: "30 mai",
    place: "Leixões → Póvoa",
    classes: [
      {
        label: "Cruzeiros",
        classKey: "Cruzeiros",
        rows: [
          { boat: "Bretoa", skipper: "António Pires de Lima", club: "CVA" },
          { boat: "Bião II", skipper: "Rodrigo Cunha", club: "CNL" },
          { boat: "Salpoente", skipper: "Paulo Chavarria", club: "CNP" },
        ],
      },
    ],
  },
  {
    region: "norte",
    prova: "Troféu Luís Ferreira Alves",
    date: "31 mai",
    place: "Póvoa → Leixões",
    classes: [
      {
        label: "Cruzeiros",
        classKey: "Cruzeiros",
        rows: [
          { boat: "Bretoa", skipper: "António Pires de Lima", club: "CVA" },
        ],
      },
    ],
    note: "Bretoa fechou o fim de semana com duas vitórias.",
  },

  {
    region: "centro",
    prova: "Torneio de Inverno ANL (após R3)",
    date: "14 mar",
    place: "Tejo",
    classes: [
      {
        label: "ANC — série",
        classKey: "ANC",
        rows: [
          { boat: "Madmax", skipper: "Miguel Graça", club: "CNC" },
          { boat: "Harfang", skipper: "Jaime Roque", club: "ANL" },
          { boat: "Marabunta", skipper: "Nuno Leónidas", club: "CVP" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "Troféu Ernesto Mendonça (série)",
    date: "14–15 mar",
    place: "Tejo e Cascais",
    classes: [
      {
        label: "ORC — provisória",
        classKey: "ORC",
        rows: [
          { boat: "Bamak", club: "ANL" },
          { boat: "Vicky II – By People to People", club: "CNC" },
          { boat: "Tiro – Xpand IT", club: "ANL" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "JOTUN Regata das Ostras",
    date: "28 mar",
    place: "Tejo",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Pardal", skipper: "João Pardal Monteiro", club: "ANL" },
          { boat: "Contrastes", skipper: "António C. Fernandes", club: "ANL" },
          { boat: "Pede Mar", skipper: "Rui Rijo Ferreira", club: "CNA" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "Regata dos Solitários",
    date: "18 abr",
    place: "Tejo",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Madraço", skipper: "João Raimundo", club: "CNL" },
          { boat: "Blu", skipper: "Pedro Soveral Rodrigues", club: "ANL" },
          { boat: "Altitudes II", skipper: "Jaime Roque", club: "ANL" },
        ],
      },
    ],
    note: "Regata de solitários (um só tripulante).",
  },
  {
    region: "centro",
    prova: "Regata Abel Power Dagge",
    date: "19 abr",
    place: "Estuário do Tejo",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Wine Deck", skipper: "José Sabido", club: "CNL" },
          { boat: "Madraço", skipper: "João Raimundo", club: "CNL" },
          { boat: "Altitudes II", skipper: "Tiago Matos", club: "CNL" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "82.ª Regata Wintermantel",
    date: "25 abr",
    place: "Tejo e Sesimbra",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Anthea", skipper: "J. Pacheco de Castro", club: "ANL" },
          { boat: "Madraço", skipper: "João Raimundo", club: "ANL" },
          { boat: "Blu", skipper: "Pedro Soveral Rodrigues", club: "ANL" },
        ],
      },
      {
        label: "ORC",
        classKey: "ORC",
        rows: [
          { boat: "Leixão", club: "CNC" },
          { boat: "Super Açor XIS – Portugal Getaways", club: "CNVFC" },
          { boat: "Paragon R", club: "CNC" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "77.ª Regata Walter Brasch",
    date: "26 abr",
    place: "Sesimbra e Tejo",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Anthea", skipper: "J. Pacheco de Castro", club: "ANL" },
          { boat: "Madraço", skipper: "Miguel Graça", club: "CNC" },
          { boat: "Altitudes II", skipper: "Jorge Queiroga", club: "ANL" },
        ],
      },
      {
        label: "ORC",
        classKey: "ORC",
        rows: [
          { boat: "Leixão", club: "CNC" },
          { boat: "Eagle III", club: "ANL" },
          { boat: "Super Açor XIS – Portugal Getaways", club: "CNVFC" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "Troféu Aniversário ANL (170 anos)",
    date: "2–3 mai",
    place: "Tejo e Cascais",
    classes: [
      {
        label: "ANC — Frota A",
        classKey: "ANC",
        rows: [
          { boat: "Wine Deck", skipper: "José Sabido", club: "CNL" },
          { boat: "Funbel – Nacex", skipper: "António S. Noronha", club: "ANL" },
          { boat: "Xekmatt", skipper: "Hugo Barrier Henrique", club: "ANL" },
        ],
      },
      {
        label: "ORC",
        classKey: "ORC",
        rows: [
          { boat: "Bamak", club: "ANL" },
          { boat: "Tiro – Xpand IT", club: "ANL" },
          { boat: "Who's Next", club: "CNC" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "XIII Troféu Cidade de Almada",
    date: "16–17 mai",
    place: "Mar da Palha",
    classes: [
      {
        label: "ANC — Div. A",
        classKey: "ANC",
        rows: [
          { boat: "Blu", club: "SAD" },
          { boat: "Carioca", club: "ANL" },
          { boat: "Mar de Levante", club: "SAD" },
        ],
      },
      {
        label: "ORC",
        classKey: "ORC",
        rows: [
          { boat: "Xekmatt", club: "ANL" },
          { boat: "Tiro", club: "ANL" },
          { boat: "Super Açor XIS – Portugal/Getaways", club: "CNVFC" },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "Regata Fernão Mendes Pinto (offshore)",
    date: "16 mai",
    place: "Cacilhas–Caparica–Cascais",
    classes: [
      {
        label: "ANC — trip. completa",
        classKey: "ANC",
        rows: [
          { boat: "Anthea", club: "ANL" },
          { boat: "Wojtyla", club: "CNC" },
          { boat: "Altitudes II", club: "ANL" },
        ],
      },
      {
        label: "ANC — 2 tripulantes",
        classKey: "ANC",
        rows: [
          { boat: "Wine Deck", club: "CNL" },
          { boat: "Pardal", club: "ANL" },
          { boat: "Pede Mar", club: "ANL" },
        ],
      },
    ],
    note: "Correu também em ORC (vencedor Wojtyla, CNC).",
  },
  {
    region: "centro",
    prova: "Regata dos Pilotos",
    date: "24 mai",
    place: "Tejo",
    classes: [
      {
        label: "ANC",
        classKey: "ANC",
        rows: [
          { boat: "Wine Deck", skipper: "José Sabido", club: "CNL" },
          { boat: "Pardal", skipper: "João Pardal Monteiro", club: "ANL" },
          {
            boat: "Super Açor XIS – Portugal Getaways",
            skipper: "Gonçalo Vaz Botelho",
            club: "CNVFC",
          },
        ],
      },
    ],
  },
  {
    region: "centro",
    prova: "Troféu SAD (série consolidada)",
    date: "jan–mai",
    place: "Lisboa · Belém",
    classes: [
      {
        label: "Classe A",
        classKey: "ANC",
        rows: [{ boat: "Blu" }, { boat: "Senzo" }, { boat: "Harfang" }],
      },
      {
        label: "Classe B",
        classKey: "ANC",
        rows: [{ boat: "Mirage I" }, { boat: "Polaris" }, { boat: "Sherazade" }],
      },
    ],
    note: "Série da Algés e Dafundo (líderes por classe), não uma prova única.",
  },
];
