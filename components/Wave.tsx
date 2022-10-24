import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./Wave.module.css";

interface WaveProps {
  width?: number;
  height?: number;
  amplitude?: number;
  frequency?: number;
  segments?: number;
  color?: string;
  delay?: number;
}

export default function Wave({
  width = 800,
  height = 100,
  amplitude = 40,
  frequency = 3,
  segments = 100,
  color = "#fff",
  delay = 0,
}: WaveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const waveRef = useRef<SVGPolylineElement>(null);
  useEffect(() => {
    if (!svgRef.current || !waveRef.current) {
      return;
    }
    const svg = svgRef.current;
    const wave = waveRef.current;
    const animations: gsap.core.Tween[] = [];

    const bottomLeftPoint = svg.createSVGPoint();
    bottomLeftPoint.x = 0;
    bottomLeftPoint.y = height;
    wave.points.appendItem(bottomLeftPoint);

    for (var i = 0; i < segments + 1; i++) {
      var norm = i / (segments - 1);
      const point = svg.createSVGPoint();
      const interval = width / segments;
      point.x = i * interval;
      point.y = amplitude / 2;
      wave.points.appendItem(point);
      const animation = gsap
        .to(point, { duration: 2, y: -point.y, repeat: -1, ease: "sine.inOut", yoyo: true })
        .progress(norm * frequency)
        .delay(delay);
      animations.push(animation);
    }
    const bottomRightPoint = svg.createSVGPoint();
    bottomRightPoint.x = width;
    bottomRightPoint.y = height;
    wave.points.appendItem(bottomRightPoint);
    wave.points.appendItem(bottomLeftPoint);
    return () => {
      animations.forEach((a) => a.kill());
      wave.points.clear();
    };
  }, [amplitude, delay, frequency, height, segments, width]);

  return (
    <svg ref={svgRef} style={{ width: "100%", aspectRatio: width / height }} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(0, ${amplitude / 2})`}>
        <polyline id="wave" ref={waveRef} className={styles.wave} fill={color} />
      </g>
    </svg>
  );
}
