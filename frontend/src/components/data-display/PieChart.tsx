import React from 'react';
import { PieChartProps } from '@/types';

export const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  showLegend = true,
  showTooltip = true,
  height = 300,
  donut = false,
  showLabels = true,
  innerRadius = 60,
  className = '',
}) => {
  const total = data?.reduce((sum, item) => sum + Math.max(0, item.value), 0) ?? 0;

  if (!data || data.length === 0 || total <= 0) {
    return (
      <div className={`bg-white rounded-lg border border-neutral-200 p-6 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>}
        <div className="text-center text-neutral-500 py-8">Sem dados para exibir</div>
      </div>
    );
  }

  const radius = 100;
  const center = 150;
  const outerRadius = donut ? radius : radius;
  const donutRadius = donut ? innerRadius : 0;

  const defaultColors = [
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
    '#14532d',
    '#4ade80',
    '#86efac',
    '#bbf7d0',
  ];

  const getColor = (index: number) => {
    return data[index].color || defaultColors[index % defaultColors.length];
  };

  // Ângulos iniciais pré-calculados (começando no topo), sem mutação durante o render.
  const angles = data.map((item) => (Math.max(0, item.value) / total) * 2 * Math.PI);
  const startAngles = angles.map(
    (_, index) => -Math.PI / 2 + angles.slice(0, index).reduce((sum, a) => sum + a, 0),
  );

  const slices = data.map((item, index) => {
    const percentage = Math.max(0, item.value) / total;
    // Uma fatia de 360° exata não é desenhável como arco; reduz minimamente.
    const angle = Math.min(angles[index], 2 * Math.PI - 0.0001);
    const startAngle = startAngles[index];
    const endAngle = startAngle + angle;

    const x1 = center + outerRadius * Math.cos(startAngle);
    const y1 = center + outerRadius * Math.sin(startAngle);
    const x2 = center + outerRadius * Math.cos(endAngle);
    const y2 = center + outerRadius * Math.sin(endAngle);

    const x3 = center + donutRadius * Math.cos(endAngle);
    const y3 = center + donutRadius * Math.sin(endAngle);
    const x4 = center + donutRadius * Math.cos(startAngle);
    const y4 = center + donutRadius * Math.sin(startAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    let path;
    if (donut) {
      path = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${donutRadius} ${donutRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    } else {
      path = `M ${center} ${center} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }

    const labelAngle = startAngle + angle / 2;
    const labelRadius = donut ? (outerRadius + donutRadius) / 2 : outerRadius * 0.7;
    const labelX = center + labelRadius * Math.cos(labelAngle);
    const labelY = center + labelRadius * Math.sin(labelAngle);

    return {
      path,
      color: getColor(index),
      labelX,
      labelY,
      percentage,
      ...item,
    };
  });

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      )}
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <svg
          width="300"
          height={height}
          viewBox="0 0 300 300"
          role="img"
          aria-label={`${title ? `${title}: ` : ''}${slices
            .map((s) => `${s.label} ${(s.percentage * 100).toFixed(0)}%`)
            .join(', ')}`}
        >
          {slices.map((slice, index) => (
            <g key={index}>
              <path
                d={slice.path}
                fill={slice.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                {showTooltip && (
                  <title>{`${slice.label}: ${slice.value} (${(slice.percentage * 100).toFixed(1)}%)`}</title>
                )}
              </path>
              {showLabels && slice.percentage > 0.05 && (
                <text
                  x={slice.labelX}
                  y={slice.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-white font-medium"
                >
                  {`${(slice.percentage * 100).toFixed(0)}%`}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded mr-2"
                style={{ backgroundColor: getColor(index) }}
              />
              <span className="text-sm text-neutral-600">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
