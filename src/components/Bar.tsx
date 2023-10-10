import * as d3 from "d3";
import {useRef, useEffect, FC} from "react";

interface BarProps {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Bar = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: BarProps) => {
  console.log(data);

  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);
  const gline = useRef<SVGGElement | null>(null);

  const x = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  const line = d3.scaleLinear().domain([0, 42.195]).range([0, 600]);

  // const y = d3
  //   .scaleLinear()
  //   .domain(d3.extent(data) as [number, number])
  //   .range([height - marginBottom, marginTop]);

  // const line = d3
  //   .line<number>()
  //   .x((d, i) => x(i))
  //   .y(y);

  useEffect(() => {
    if (gx.current) {
      d3.select(gx.current).call(d3.axisBottom(x));
    }
  }, [gx, x]);

  useEffect(() => {
    if (gline.current) {
      // d3.select(gline.current)
    }
  }, [gline, line]);

  return (
    <>
      <div>
        {data.map((text, idx) => {
          return (
            <div key={idx}>
              <p>property: {idx}</p>
              <p>value: {text}</p>
            </div>
          );
        })}
      </div>
      <svg width={width} height={height}>
        <g ref={gline} transform={`translate(0,${height})`} />

        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        {/* <g ref={gy} transform={`translate(${marginLeft},0)`} /> */}
      </svg>
    </>
  );
};
