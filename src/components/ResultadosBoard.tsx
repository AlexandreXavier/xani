import { useMemo, useState } from "react";
import {
  REGION_LABELS,
  REGION_ORDER,
  RESULT_CLASSES,
  canonicalBoat,
  type Region,
  type ResultEvent,
} from "@constants/resultados2026";

interface Props {
  events: ResultEvent[];
}

type RegionFilter = Region | "all";
type ClassFilter = (typeof RESULT_CLASSES)[number] | "all";

type Tally = {
  name: string;
  p1: number;
  p2: number;
  p3: number;
  total: number;
};

/** Podium presences (1st–3rd) per canonical boat, across every event & class. */
function computeTally(events: ResultEvent[]): Tally[] {
  const map = new Map<string, Tally>();
  for (const ev of events) {
    for (const cls of ev.classes ?? []) {
      cls.rows.forEach((row, i) => {
        if (i > 2) return;
        const key = canonicalBoat(row.boat);
        const t = map.get(key) ?? { name: key, p1: 0, p2: 0, p3: 0, total: 0 };
        if (i === 0) t.p1 += 1;
        else if (i === 1) t.p2 += 1;
        else t.p3 += 1;
        t.total += 1;
        map.set(key, t);
      });
    }
  }
  return [...map.values()]
    .filter(t => t.total >= 2)
    .sort(
      (a, b) =>
        b.total - a.total || b.p1 - a.p1 || a.name.localeCompare(b.name)
    );
}

/** Horizontal stacked-bar chart, plain SVG (no charting lib). */
function PodiumChart({ data }: { data: Tally[] }) {
  if (data.length === 0) return null;
  const rowH = 34;
  const padY = 6;
  const mL = 150;
  const mR = 46;
  const W = 900;
  const H = data.length * rowH + padY * 2;
  const max = Math.max(1, ...data.map(d => d.total));
  const x = (v: number) => mL + (v / max) * (W - mR - mL);

  return (
    <svg
      className="podium-chart"
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      role="img"
      aria-label="Barcos com mais presenças no pódio em 2026"
    >
      {data.map((d, i) => {
        const y = padY + i * rowH;
        const segs = (
          [
            ["p1", d.p1],
            ["p2", d.p2],
            ["p3", d.p3],
          ] as const
        ).filter(([, v]) => v > 0);
        let acc = 0;
        return (
          <g key={d.name} transform={`translate(0,${y})`}>
            <text
              className="name"
              x={mL - 12}
              y={rowH / 2}
              dy=".35em"
              textAnchor="end"
            >
              {d.name}
            </text>
            {segs.map(([cls, v]) => {
              const x0 = x(acc);
              const x1 = x(acc + v);
              acc += v;
              const w = Math.max(0, x1 - x0);
              return (
                <g key={cls}>
                  <rect
                    className={`bar ${cls}`}
                    x={x0}
                    y={8}
                    width={w}
                    height={rowH - 16}
                  />
                  {w > 16 && (
                    <text
                      className="seg"
                      x={(x0 + x1) / 2}
                      y={rowH / 2}
                      dy=".35em"
                      textAnchor="middle"
                    >
                      {v}
                    </text>
                  )}
                </g>
              );
            })}
            <text
              className="val"
              x={x(d.total) + 8}
              y={rowH / 2}
              dy=".35em"
            >
              {d.total}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Medal({ pos }: { pos: number }) {
  const cls = pos < 3 ? `p${pos + 1}` : "px";
  return <span className={`medal ${cls}`}>{pos + 1}</span>;
}

export default function ResultadosBoard({ events }: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [raceClass, setRaceClass] = useState<ClassFilter>("all");

  const q = query.trim().toLowerCase();

  // Stats + chart are computed from the full dataset, not the filtered view.
  const stats = useMemo(() => {
    const boats = new Set<string>();
    let podiums = 0;
    for (const ev of events) {
      for (const cls of ev.classes ?? []) {
        for (const row of cls.rows) {
          boats.add(canonicalBoat(row.boat));
          podiums += 1;
        }
      }
    }
    return {
      provas: events.length,
      boats: boats.size,
      podiums,
      regions: new Set(events.map(e => e.region)).size,
    };
  }, [events]);

  const tally = useMemo(() => computeTally(events), [events]);

  const ordered = useMemo(
    () =>
      [...events].sort(
        (a, b) => REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region)
      ),
    [events]
  );

  const eventMatchesBoat = (ev: ResultEvent) =>
    !q ||
    (ev.classes ?? []).some(c =>
      c.rows.some(r => r.boat.toLowerCase().includes(q))
    );

  const visible = ordered.filter(ev => {
    if (region !== "all" && ev.region !== region) return false;
    if (
      raceClass !== "all" &&
      !(ev.classes ?? []).some(c => c.classKey === raceClass)
    )
      return false;
    return eventMatchesBoat(ev);
  });

  const resetDisabled = query === "" && region === "all" && raceClass === "all";

  const statCards: Array<[number, string]> = [
    [stats.provas, "Provas mapeadas"],
    [stats.boats, "Barcos distintos"],
    [stats.podiums, "Lugares de pódio"],
    [stats.regions, "Regiões"],
  ];

  return (
    <div className="resultados">
      {/* Stats */}
      <div className="stats">
        {statCards.map(([n, label]) => (
          <div className="stat" key={label}>
            <div className="n">{n}</div>
            <div className="l">{label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {tally.length > 0 && (
        <div className="chart">
          <div className="sec-head">
            <h2>Barcos com mais pódios</h2>
            <span className="sub">época 2026 · todas as regiões e classes</span>
          </div>
          <div className="chart-card">
            <div className="legend">
              <span>
                <i className="p1" />
                1.º lugar
              </span>
              <span>
                <i className="p2" />
                2.º lugar
              </span>
              <span>
                <i className="p3" />
                3.º lugar
              </span>
            </div>
            <PodiumChart data={tally} />
            <div className="chart-foot">
              Presenças no pódio (1.º–3.º) somando todas as provas e classes.
              Nomes de patrocinador agregados ao mesmo barco.
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="controls-inner">
          <div className="search">
            <input
              type="text"
              placeholder="Pesquisar barco (ex.: Anthea, Bretoa, Mono Mania)…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
              aria-label="Pesquisar barco"
            />
          </div>

          <div className="chips">
            <button
              type="button"
              className={`chip ${region === "all" ? "active" : ""}`}
              data-region="all"
              onClick={() => setRegion("all")}
            >
              <span className="fdot" />
              Todas
            </button>
            {REGION_ORDER.map(r => (
              <button
                key={r}
                type="button"
                className={`chip ${region === r ? "active" : ""}`}
                data-region={r}
                onClick={() => setRegion(r)}
              >
                <span className="fdot" />
                {REGION_LABELS[r]}
              </button>
            ))}
          </div>

          <select
            className="classsel"
            value={raceClass}
            onChange={e => setRaceClass(e.target.value as ClassFilter)}
            aria-label="Classe"
          >
            <option value="all">Todas as classes</option>
            {RESULT_CLASSES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="reset"
            onClick={() => {
              setQuery("");
              setRegion("all");
              setRaceClass("all");
            }}
            disabled={resetDisabled}
          >
            Limpar
          </button>
        </div>
        <div className="count">
          {q ? (
            <>
              <b>{visible.length}</b> prova(s) com "<b>{query.trim()}</b>"
              {region !== "all" ? ` em ${REGION_LABELS[region]}` : ""}
            </>
          ) : (
            <>
              {visible.length} prova(s){" "}
              {region !== "all"
                ? `em ${REGION_LABELS[region]}`
                : "no total"}
              {raceClass !== "all" ? ` · classe ${raceClass}` : ""}
            </>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="event-grid">
        {visible.map((ev, idx) => (
          <article
            key={`${ev.prova}-${idx}`}
            className={`card ${ev.pending ? "pending" : ""}`}
            data-region={ev.region}
          >
            <div className="stripe" />
            <div className="body">
              <div className="rgn">
                <span className="fdot" />
                {REGION_LABELS[ev.region]}
              </div>
              <h3>{ev.prova}</h3>
              <div className="meta">
                <span className="mono">{ev.date}</span>
                <span>◦ {ev.place}</span>
              </div>

              {ev.pending ? (
                <div className="pendbox">
                  <span className="pulse" />
                  <div>
                    <div className="t">Aguarda publicação</div>
                    <div className="s">{ev.note}</div>
                  </div>
                </div>
              ) : (
                <>
                  {(ev.classes ?? []).map(cls => (
                    <div className="classblock" key={cls.label}>
                      <span className="classchip">{cls.label}</span>
                      <table className="res">
                        <tbody>
                          {cls.rows.map((row, i) => {
                            const hit =
                              q.length > 0 &&
                              row.boat.toLowerCase().includes(q);
                            return (
                              <tr
                                key={`${row.boat}-${i}`}
                                className={hit ? "hit" : ""}
                              >
                                <td className="pos">
                                  <Medal pos={i} />
                                </td>
                                <td className="boat">
                                  {row.boat}
                                  {row.skipper && (
                                    <span className="skip">{row.skipper}</span>
                                  )}
                                </td>
                                <td className="club">
                                  {row.club && (
                                    <span className="club-chip">
                                      {row.club}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ))}
                  {ev.note && <div className="note">{ev.note}</div>}
                </>
              )}
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <p className="empty">Nenhuma prova corresponde aos filtros.</p>
        )}
      </div>
    </div>
  );
}
