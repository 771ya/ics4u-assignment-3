import { type SyntheticEvent, useState } from "react";
import { calculateResult } from "./utils/calculation";
import { CubicInput } from "./components/CubicInput";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HistoryItem } from "./components/HistoryItem";
import type { Coefficients, History, Results } from "./types";
import { CubicTable } from "./components/CubicTable";

export const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const coefficients: Coefficients = { a, b, c, d };
  const [history, setHistory] = useState<History>([]);

  const isValid = a !== 0 && [a, b, c, d].every(Number.isFinite);
  const results: Results | null = isValid ? calculateResult(coefficients) : null;

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) return;

    let isDuplicate = false;

    for (const item of history) {
      if (item.a === a && item.b === b && item.c === c && item.d === d) {
        isDuplicate = true;
        break;
      }
    }

    if (isDuplicate) return;

    setHistory([...history, coefficients]);
  };
  const handleLoad = (item: Coefficients) => {
    setA(item.a);
    setB(item.b);
    setC(item.c);
    setD(item.d);
  };

  const handleDelete = (target: Coefficients) => {
    setHistory(history.filter((item) => item.a !== target.a || item.b !== target.b || item.c !== target.c || item.d !== target.d));
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
            <form className="flex flex-wrap items-center justify-between gap-6" id="form" onSubmit={handleSubmit}>
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
          <CubicTable results={results}/>

          <section className="flex max-h-140 flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"03 // HISTORY"}</h2>
            </div>
            <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2 font-mono text-slate-400 text-xs" id="history">
              {history.map((item) => (
                <HistoryItem item={item} key={`${item.a},${item.b},${item.c},${item.d}`} onDelete={handleDelete} onLoad={handleLoad} />
              ))}
            </div>
          </section>

          <section className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"04 // GRAPH"}</h2>
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
