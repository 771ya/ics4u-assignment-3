import { type SyntheticEvent, useState } from "react";
import { CubicInput } from "./components/CubicInput";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import type { Results, Coefficients } from "./types";
import { calculateResult } from "./utils/calculation";

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
        <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
          <Header />
        </div>
        <main className="space-y-12">
          <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] p-6 shadow-2xl">
            <form className="flex flex-wrap items-center justify-between gap-6" id="form">
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

        <div>
          <div className="grid grid-cols-2 gap-12">
            <section className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">01 // ANALYSIS</h2>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[p] parameter</span>
                  <span className="font-medium text-slate-200" id="p">
                    0.0000
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[q] parameter</span>
                  <span className="font-medium text-slate-200" id="q">
                    0.0000
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[Δ] discriminant</span>
                  <span className="font-bold text-amber-400 tracking-wide" id="discriminant">
                    0.0000
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r1] root alpha</span>
                  <span className="text-emerald-400" id="root-one">
                    x: N/A | y: N/A
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r2] root beta</span>
                  <span className="text-emerald-400" id="root-two">
                    x: N/A | y: N/A
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[r3] root gamma</span>
                  <span className="text-emerald-400" id="root-three">
                    x: N/A | y: N/A
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[min] critical point</span>
                  <span className="text-cyan-400" id="minimum">
                    x: N/A | y: N/A
                  </span>
                </div>
                <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
                  <span className="text-slate-500">[max] critical point</span>
                  <span className="text-purple-400" id="maximum">
                    x: N/A | y: N/A
                  </span>
                </div>
              </div>
            </section>
            <section className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">02 // SUMMARY</h2>
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
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
