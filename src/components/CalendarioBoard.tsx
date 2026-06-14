import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { RaceClass, Regata, Region } from "@constants/calendario2026";

interface Props {
  regatas: Regata[];
  /** ISO yyyy-mm-dd; injected for deterministic rendering, defaults to today. */
  todayISO?: string;
}

type StatusFilter = "upcoming" | "past" | "all";
type SortDir = "asc" | "desc";

const REGIONS: Region[] = [
  "Centro",
  "Norte",
  "Madeira",
  "Sul",
  "Açores",
  "Nacional",
];

const CLASSES: RaceClass[] = ["ANC", "ORC", "NHC", "2T", "Cruzeiros", "Open"];

const MONTHS_PT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

function formatRange(startISO: string, endISO: string): string {
  const a = parts(startISO);
  const b = parts(endISO);
  if (startISO === endISO) return `${a.d} ${MONTHS_PT[a.m - 1]}`;
  if (a.m === b.m) return `${a.d}-${b.d} ${MONTHS_PT[a.m - 1]}`;
  return `${a.d} ${MONTHS_PT[a.m - 1]} - ${b.d} ${MONTHS_PT[b.m - 1]}`;
}

export default function CalendarioBoard({ regatas, todayISO }: Props) {
  const today = todayISO ?? new Date().toISOString().slice(0, 10);

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [raceClass, setRaceClass] = useState<RaceClass | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("upcoming");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const fuse = useMemo(
    () =>
      new Fuse(regatas, {
        keys: ["name", "local", "club"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [regatas]
  );

  const rows = useMemo(() => {
    const base =
      query.length > 1 ? fuse.search(query).map(r => r.item) : regatas;

    const filtered = base.filter(r => {
      // A race counts as "past" once its last day is behind us.
      const isPast = r.endDate < today;
      if (status === "upcoming" && isPast) return false;
      if (status === "past" && !isPast) return false;
      if (region !== "all" && r.region !== region) return false;
      if (raceClass !== "all" && !r.classes.includes(raceClass)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      const cmp = a.startDate.localeCompare(b.startDate);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [regatas, fuse, query, region, raceClass, status, sortDir, today]);

  const resetDisabled =
    query === "" &&
    region === "all" &&
    raceClass === "all" &&
    status === "upcoming";

  return (
    <div className="calendario">
      <div className="filters">
        <input
          type="text"
          className="filter-search"
          placeholder="Procurar prova, local ou clube…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
        />

        <select
          className="filter-select"
          value={region}
          onChange={e => setRegion(e.target.value as Region | "all")}
          aria-label="Região"
        >
          <option value="all">Todas as regiões</option>
          {REGIONS.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={raceClass}
          onChange={e => setRaceClass(e.target.value as RaceClass | "all")}
          aria-label="Classe"
        >
          <option value="all">Todas as classes</option>
          {CLASSES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={status}
          onChange={e => setStatus(e.target.value as StatusFilter)}
          aria-label="Estado"
        >
          <option value="upcoming">Próximas</option>
          <option value="past">Já realizadas</option>
          <option value="all">Todas</option>
        </select>

        <button
          type="button"
          className="filter-reset"
          onClick={() => {
            setQuery("");
            setRegion("all");
            setRaceClass("all");
            setStatus("upcoming");
          }}
          disabled={resetDisabled}
        >
          Limpar
        </button>
      </div>

      <p className="count">
        {rows.length} {rows.length === 1 ? "prova" : "provas"}
      </p>

      {/* Desktop / tablet: table */}
      <table className="board hidden md:table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className="sort-btn"
                onClick={() => setSortDir(d => (d === "asc" ? "desc" : "asc"))}
              >
                Data {sortDir === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th>Prova</th>
            <th>Região</th>
            <th>Local</th>
            <th>Classe</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.name}-${r.startDate}-${i}`} className={r.featured ? "featured" : ""}>
              <td className="nowrap">{formatRange(r.startDate, r.endDate)}</td>
              <td>
                {r.featured && <span className="star">★</span>}
                {r.name}
              </td>
              <td>{r.region}</td>
              <td>{r.local}</td>
              <td>{r.classes.length ? r.classes.join(" · ") : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: cards */}
      <ul className="cards md:hidden">
        {rows.map((r, i) => (
          <li
            key={`${r.name}-${r.startDate}-${i}`}
            className={`card ${r.featured ? "featured" : ""}`}
          >
            <div className="card-top">
              <span className="card-date">{formatRange(r.startDate, r.endDate)}</span>
              <span className="card-region">{r.region}</span>
            </div>
            <h3 className="card-name">
              {r.featured && <span className="star">★</span>}
              {r.name}
            </h3>
            <p className="card-local">{r.local}</p>
            {r.classes.length > 0 && (
              <p className="card-classes">{r.classes.join(" · ")}</p>
            )}
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="empty">Nenhuma prova corresponde aos filtros.</p>
      )}
    </div>
  );
}
