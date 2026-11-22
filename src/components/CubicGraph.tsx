import type { Coefficients, Results } from "@ics4u-assignment-02/types";
import { drawGraph } from "@ics4u-assignment-02/utils/drawGraph";
import { useEffect, useRef } from "react";

type CubicGraphProps = {
  coefficients: Coefficients;
  results: Results | null;
};

export const CubicGraph = ({ coefficients, results }: CubicGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawGraph(coefficients, results ?? {}, canvasRef.current);
    }
  }, [coefficients,results]);
  return (
    <canvas className="w-full rounded-md border border-slate-900 bg-[#04060a] shadow-inner" height="400" id="graph" ref={canvasRef} width="400"></canvas>
  );
};
