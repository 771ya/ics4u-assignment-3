import type { Results } from "@ics4u-assignment-02/types";
import { formatNumber } from "@ics4u-assignment-02/utils/calculation";
import { Analysis } from "./Analysis";
import { Summary } from "./Summary";

type CubicTableProps = {
  results: Results | null;
};

export const CubicTable = ({results}: CubicTableProps) => {
  return (
    <>
      <section className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"01 // ANALYSIS"}</h2>
        </div>
        <div className="space-y-1 font-mono text-xs">
          <Analysis color="text-slate-200" label="[p] parameter" value={results ? formatNumber(results.p) : "0.0000"} />
          <Analysis color="text-slate-200" label="[q] parameter" value={results ? formatNumber(results.q) : "0.0000"} />
          <Analysis color="text-amber-400" label="[Δ] discriminant" value={results ? formatNumber(results.discriminant) : "0.0000"} />
          <Analysis
            color="text-emerald-400"
            label="[r1] root alpha"
            value={
              results?.r1
                ? `x: ${typeof results.r1.x === "number" ? formatNumber(results.r1.x) : results.r1.x} | y: ${typeof results.r1.y === "number" ? formatNumber(results.r1.y) : results.r1.y}`
                : "x: N/A | y: N/A"
            }
          />
          <Analysis
            color="text-emerald-400"
            label="[r2] root beta"
            value={
              results?.r2
                ? `x: ${typeof results.r2.x === "number" ? formatNumber(results.r2.x) : results.r2.x} | y: ${typeof results.r2.y === "number" ? formatNumber(results.r2.y) : results.r2.y}`
                : "x: N/A | y: N/A"
            }
          />
          <Analysis
            color="text-emerald-400"
            label="[r3] root gamma"
            value={
              results?.r3
                ? `x: ${typeof results.r3.x === "number" ? formatNumber(results.r3.x) : results.r3.x} | y: ${typeof results.r3.y === "number" ? formatNumber(results.r3.y) : results.r3.y}`
                : "x: N/A | y: N/A"
            }
          />
          <Analysis
            color="text-cyan-400"
            label="[min] critical point"
            value={
              results?.minimum
                ? `x: ${typeof results.minimum.x === "number" ? formatNumber(results.minimum.x) : results.minimum.x} | y: ${typeof results.minimum.y === "number" ? formatNumber(results.minimum.y) : results.minimum.y}`
                : "x: N/A | y: N/A"
            }
          />
          <Analysis
            color="text-purple-400"
            label="[max] critical point"
            value={
              results?.maximum
                ? `x: ${typeof results.maximum.x === "number" ? formatNumber(results.maximum.x) : results.maximum.x} | y: ${typeof results.maximum.y === "number" ? formatNumber(results.maximum.y) : results.maximum.y}`
                : "x: N/A | y: N/A"
            }
          />
        </div>
      </section>

      <section className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"02 // SUMMARY"}</h2>
        </div>
        <div className="space-y-1 font-mono text-xs">
          <Summary color="text-slate-200" label="f(x) expanded polynomial" value={results?.equation ? results.equation : "N/A"} />
          <Summary
            color="text-cyan-400"
            label="f'(x) first derivative"
            value={results?.firstDerivative ? results.firstDerivative : "N/A"}
          />
          <Summary
            color="text-purple-400"
            label="f''(x) second derivative"
            value={results?.secondDerivative ? results.secondDerivative : "N/A"}
          />
          <Summary color="text-emerald-400" label="roots" value={results?.roots ? results.roots : "N/A"} />
          <Summary color="text-white" label="factored form" value={results?.factored ? results.factored : "No real factorization"} />
        </div>
      </section>
    </>
  );
};
