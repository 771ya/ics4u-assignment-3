import { Footer } from "./components/Footer";
import { Header } from "./components/Header";


export const App = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16">
        <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
          <Header />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
