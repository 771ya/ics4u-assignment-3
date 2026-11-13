import type { AnalysisProps } from "@ics4u-assignment-02/types";

export const Analysis = ({ label, value, color }: AnalysisProps) => {
  return (
    <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
      <span className="text-slate-500">{label}</span>
      <span className={`${color} font-medium`}>{value}</span>
    </div>
  );
};
