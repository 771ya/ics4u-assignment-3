import { type SyntheticEvent, useState } from "react";
import { calculateResult } from "./utils/calculation";
import { CubicInput } from "./components/CubicInput";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import type { Coefficients, Results } from "./types";
import { Analysis } from "./components/Analysis";

export const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const coefficients: Coefficients = { a, b, c, d };
  const [results, setResults] = useState<Results | null>(null);

  const handleOnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResults(calculateResult(coefficients));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16">
        <div className="bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
          <Header />
        </div>

        <main className="space-y-12">
          <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] p-6 shadow-2xl">
            <div className="absolute top-0 left-0 h-full w-1 bg-cyan-500"></div>
            <form className="flex flex-wrap items-center justify-between gap-6" id="form" onChange={handleOnChange}>
              <div className="flex flex-1 flex-wrap justify-start gap-4 sm:gap-6">
                <CubicInput label="a-value [x³]" setValue={setA} value={a} />
                <CubicInput label="b-value [x²]" setValue={setB} value={b} />
                <CubicInput label="c-value [x]" setValue={setC} value={c} />
                <CubicInput label="d-value [c]" setValue={setD} value={d} />
              </div>
              <input
                className="w-full cursor-pointer self-end rounded-md bg-cyan-500 px-6 py-3 text-center font-bold font-mono text-[#07090e] text-xs tracking-wider shadow-cyan-500/10 shadow-lg transition duration-150 hover:bg-cyan-400 active:scale-95 sm:w-auto sm:self-auto"
                type="submit"
                value="SAVE"
              />
            </form>
          </section>
        </main>

        <div className="grid grid-cols-2 gap-12">
          <section className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"01 // ANALYSIS"}</h2>
            </div>
            <div className="space-y-1 font-mono text-xs">
              <Analysis color="text-slate-200" label="[p] parameter" value={results?.p ?? "N/A"} />
              <Analysis color="text-slate-200" label="[q] parameter" value={results?.q ?? "N/A"} />
              <Analysis color="text-amber-400" label="[Δ] discriminant" value={results?.discriminant ?? "N/A"} />
              <Analysis color="text-emerald-400" label="[r1] root alpha" value={results?.r1 ? `${results.r1.x},${results.r1.y}` : "N/A"} />
              <Analysis color="text-emerald-400" label="[r2] root beta" value={results?.r2 ? `${results.r2.x},${results.r2.y}` : "N/A"} />
              <Analysis color="text-emerald-400" label="[r3] root gamma" value={results?.r3 ? `${results.r3.x},${results.r3.y}` : "N/A"} />
              <Analysis
                color="text-cyan-400"
                label="[min] critical point"
                value={results?.minimum ? `(${results.minimum.x}, ${results.minimum.y})` : "N/A"}
              />
              <Analysis
                color="text-purple-400"
                label="[max] critical point"
                value={results?.maximum ? `(${results.maximum.x}, ${results.maximum.y})` : "N/A"}
              />
            </div>
          </section>

          <section className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"02 // SUMMARY"}</h2>
            </div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">f(x) expanded polynomial</span>
                <span className="break-all text-slate-200 text-sm tracking-wide" id="equation">
                  N/A
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">f'(x) first derivative</span>
                <span className="break-all text-cyan-400 text-sm tracking-wide" id="first-derivative">
                  N/A
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">f''(x) second derivative</span>
                <span className="break-all text-purple-400 text-sm tracking-wide" id="second-derivative">
                  N/A
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">roots</span>
                <span className="break-all text-emerald-400 text-sm tracking-wide" id="roots">
                  N/A
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">factored form</span>
                <span className="wrap-break-word pt-1 text-left text-sm text-white tracking-wide" id="factored">
                  No real factorization
                </span>
              </div>
            </div>
          </section>
          <section className="flex max-h-140 flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">03 // HISTORY</h2>
            </div>
            <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2 font-mono text-slate-400 text-xs" id="history"></div>
          </section>
          <section className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">04 // GRAPH</h2>
            </div>
            <div className="flex-1 rounded-xl border border-slate-900 bg-[#0b0f19]/50 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] p-6 shadow-2xl">
              <canvas
                className="w-full rounded-md border border-slate-900 bg-[#04060a] shadow-inner"
                height="400"
                id="graph"
                width="400"
              ></canvas>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
};
