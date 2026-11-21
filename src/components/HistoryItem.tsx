import type { Coefficients } from "@ics4u-assignment-02/types";

type historyItemProps = {
  item: Coefficients;
  onLoad: (item: Coefficients) => void;
};

export const HistoryItem = ({ item, onLoad }: historyItemProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 rounded-md bg-slate-950/50">
      <div
        className="history-item flex flex-row justify-between gap-24 rounded-xl border border-slate-700 bg-gray-800/50 px-16 py-4 font-mono text-m text-white hover:bg-cyan-950/75"
        onClick={() => onLoad(item)}
      >
        <div className="w-3 text-white text-xs">{item.a}</div>
        <div className="w-3 text-white text-xs">{item.b}</div>
        <div className="w-3 text-white text-xs">{item.c}</div>
        <div className="w-3 text-white text-xs">{item.d}</div>
      </div>
      <button className="delete-btn rounded-lg border border-red-900 bg-red-800/25 p-2 font-mono text-red-400 text-xs text-y-center hover:bg-red-600/25">
        Delete
      </button>
    </div>
  );
};
