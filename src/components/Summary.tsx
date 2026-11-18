type SummaryProps = {
  label: string;
  color: string;
  value: string;
};

export const Summary = ({ label, color, value }: SummaryProps) => {
  return (
    <div className="space-y-1 font-mono text-xs">
      <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
        <span className={`break-all ${color} text-sm tracking-wide`}>{value}</span>
      </div>
    </div>
  );
};
