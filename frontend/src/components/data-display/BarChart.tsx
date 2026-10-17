import React from 'react';
import { BarChartProps } from '@/types';

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  showLegend = true,
  showTooltip = true,
  height = 300,
  horizontal = false,
  showGrid = true,
  showLabels = true,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-neutral-200 p-6 ${className}`}>
        <div className="text-center text-neutral-500 py-8">Sem dados para exibir</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value)) || 1;
  const chartHeight = height - 60;
  const chartWidth = horizontal ? 400 : 600;
  const barWidth = horizontal ? 30 : (chartWidth / data.length) * 0.6;
  const gap = horizontal ? 40 : (chartWidth / data.length) * 0.4;

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

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      )}
      <div className="relative" style={{ height: `${height}px` }}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${chartWidth + 60} ${height}`}
          role="img"
          aria-label={`${title ?? 'Gráfico de barras'}: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}
        >
          {showGrid && (
            <>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = chartHeight - ratio * chartHeight + 40;
                return (
                  <line
                    key={ratio}
                    x1={50}
                    y1={y}
                    x2={chartWidth + 50}
                    y2={y}
                    stroke="#e5e5e5"
                    strokeWidth={1}
                  />
                );
              })}
            </>
          )}
          {data.map((item, index) => {
            const color = getColor(index);
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = horizontal ? 50 : 50 + index * (barWidth + gap) + gap / 2;
            const y = horizontal
              ? 40 + index * (barWidth + gap) + gap / 2
              : chartHeight - barHeight + 40;
            const width = horizontal ? (item.value / maxValue) * chartWidth : barWidth;
            const height = horizontal ? barWidth : barHeight;

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  rx={4}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {showTooltip && <title>{`${item.label}: ${item.value}`}</title>}
                </rect>
                {showLabels && (
                  <text
                    x={horizontal ? x + width + 5 : x + barWidth / 2}
                    y={horizontal ? y + barWidth / 2 + 4 : y - 5}
                    textAnchor={horizontal ? 'start' : 'middle'}
                    className="text-xs fill-neutral-600"
                  >
                    {item.value}
                  </text>
                )}
                <text
                  x={horizontal ? 40 : x + barWidth / 2}
                  y={horizontal ? y + barWidth / 2 + 4 : chartHeight + 55}
                  textAnchor={horizontal ? 'end' : 'middle'}
                  className="text-xs fill-neutral-500"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-4 mt-4">
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
