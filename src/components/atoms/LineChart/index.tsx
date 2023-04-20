// import React from 'react';

// interface ILineChartProps {
//   data: { x: number; y: number }[];
//   width: number;
//   height: number;
//   stroke: string;
// }

// export const LineChart: React.FC<ILineChartProps> = ({
//   data,
//   width,
//   height,
//   stroke,
// }) => {
//   const xScale = React.useMemo(() => {
//     const xValues = data.map((d) => d.x);
//     const xMin = Math.min(...xValues);
//     const xMax = Math.max(...xValues);
//     return (value: number) =>
//       ((value - xMin) / (xMax - xMin)) * (width - 20) + 10;
//   }, [data, width]);

//   const yScale = React.useMemo(() => {
//     const yValues = data.map((d) => d.y);
//     const yMin = Math.min(...yValues);
//     const yMax = Math.max(...yValues);
//     return (value: number) =>
//       ((value - yMin) / (yMax - yMin)) * (height - 20) + 10;
//   }, [data, height]);

//   const path = React.useMemo(() => {
//     return data
//       .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.x)} ${yScale(d.y)}`)
//       .join(' ');
//   }, [data, xScale, yScale]);

//   return (
//     <svg width={width} height={height}>
//       <path d={path} stroke={stroke} fill="none" />
//     </svg>
//   );
// };

// import React, { useRef, useEffect } from 'react';

// interface IDataPoint {
//   x: number;
//   y: number;
// }

// interface IProps {
//   width: number;
//   height: number;
//   data: IDataPoint[];
// }

// export const LineChart: React.FC<IProps> = ({ width, height, data }) => {
//   const chartRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const svg = chartRef.current;

//     // calcula os limites do gráfico
//     const minX = Math.min(...data.map((d) => d.x));
//     const maxX = Math.max(...data.map((d) => d.x));
//     const minY = Math.min(...data.map((d) => d.y));
//     const maxY = Math.max(...data.map((d) => d.y));

//     // calcula as escalas para x e y
//     const xScale = (width - 20) / (maxX - minX);
//     const yScale = (height - 20) / (maxY - minY);

//     // cria o path do gráfico
//     let path = '';
//     for (let i = 0; i < data.length; i++) {
//       const d = data[i];
//       if (i === 0) {
//         path += `M ${d.x * xScale} ${(maxY - d.y) * yScale} `;
//       } else {
//         const c1x =
//           data[i - 1].x * xScale + (d.x - data[i - 1].x) * xScale * 0.3;
//         const c1y =
//           (maxY - data[i - 1].y) * yScale +
//           (d.y - data[i - 1].y) * yScale * 0.3;
//         const c2x = d.x * xScale - (d.x - data[i - 1].x) * xScale * 0.3;
//         const c2y =
//           (maxY - d.y) * yScale - (d.y - data[i - 1].y) * yScale * 0.3;
//         path += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${d.x * xScale} ${
//           (maxY - d.y) * yScale
//         } `;
//       }
//     }

//     // cria o elemento path no SVG
//     const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//     line.setAttribute('d', path);
//     line.setAttribute('stroke', 'black');
//     line.setAttribute('fill', 'none');

//     // adiciona o elemento path ao SVG
//     svg.appendChild(line);
//   }, [width, height, data]);

//   return <svg ref={chartRef} width={width} height={height} />;
// };

import React, { useRef, useEffect } from 'react';

interface IProps {
  data: { x: number; y: number }[];
  width: number;
  height: number;
  color?: string;
}

export const LineChart: React.FC<IProps> = ({
  data,
  width,
  height,
  color = 'blue',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const stepX = width / (data.length - 1);
        const maxY = Math.max(...data.map((d) => d.y));
        const stepY = height / maxY;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(0, height - data[0].y * stepY);
        for (let i = 1; i < data.length; i++) {
          const prev = data[i - 1];
          const curr = data[i];
          const cpx = (prev.x + curr.x) / 2;
          const cpy = height - ((prev.y + curr.y) / 2) * stepY;
          ctx.quadraticCurveTo(
            prev.x * stepX,
            height - prev.y * stepY,
            cpx * stepX,
            cpy,
          );
        }
        ctx.stroke();
      }
    }
  }, [data, width, height, color]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
