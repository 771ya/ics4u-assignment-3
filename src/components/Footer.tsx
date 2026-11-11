
export const Footer = () => {
    return (
        <footer className="mx-auto mt-12 w-full max-w-6xl border-slate-800 border-t px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-200 text-sm tracking-wide">Cubic Equation Solver</h3>
              <p className="font-mono text-slate-500 text-xs">v2.0.0 - JavaScript + Tailwind CSS</p>
            </div>
            <div className="flex gap-8 font-mono text-slate-500 text-xs">
              <a className="transition hover:text-cyan-400" href="#">Documentation</a>
              <a className="transition hover:text-cyan-400" href="#">GitHub</a>
              <a className="transition hover:text-cyan-400" href="#">Contact</a>
            </div>
            <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">&copy; 2026 Agincourt CI</div>
          </div>
        </footer>
    );
};