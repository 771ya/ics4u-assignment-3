export const Header = () => {
  return (
    <header className="flex flex-col justify-between gap-4 border-slate-800 border-b pb-6 md:flex-row md:items-end">
      <div>
        <span className="font-mono font-semibold text-cyan-500 text-xs uppercase tracking-widest">{"// AGINCOURT EDITION"}</span>
        <h1 className="mt-1 font-bold text-3xl text-white tracking-tight">Cubic Equation Solver</h1>
      </div>
      <p className="max-w-xs font-mono text-slate-500 text-xs md:text-right">Real-time cubic equation analysis tool</p>
    </header>
  );
};
