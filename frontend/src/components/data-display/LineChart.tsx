import React from 'react';
import { LineChartProps } from '@/types';

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  showLegend = true,
  showTooltip = true,
  height = 300,
  smooth = false,
  showPoints = true,
  showArea = false,
  showGrid = true,
  seriesLabel,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-neutral-200 p-6 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>}
        <div className="text-center text-neutral-500 py-8">Sem dados para exibir</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const chartHeight = height - 60;
  const chartWidth = 600;
  const padding = 50;

  const defaultColor = '#22c55e';
  const color = data[0].color || defaultColor;

  const getX = (index: number) =>
    data.length === 1 ? padding + chartWidth / 2 : padding + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) =>
    chartHeight + 40 - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight;

  const baseline = chartHeight + 40;
  const linearPath = data
    .map((item, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(item.value)}`)
    .join(' ');

  const getSmoothPath = () => {
    if (data.length < 2) return linearPath;
    let path = `M ${getX(0)} ${getY(data[0].value)}`;
    for (let i = 1; i < data.length; i++) {
      const x0 = getX(i - 1);
      const y0 = getY(data[i - 1].value);
      const x1 = getX(i);
      const y1 = getY(data[i].value);
      const cx = (x0 + x1) / 2;
      path += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return path;
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
          viewBox={`0 0 ${chartWidth + 100} ${height}`}
          role="img"
          aria-label={`${title ?? seriesLabel ?? 'Gráfico de linha'}: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}
        >
          {showGrid && (
            <>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = chartHeight - ratio * chartHeight + 40;
                return (
                  <line
                    key={ratio}
                    x1={padding}
                    y1={y}
                    x2={padding + chartWidth}
                    y2={y}
                    stroke="#e5e5e5"
                    strokeWidth={1}
                  />
                );
              })}
            </>
          )}
          {showArea && data.length > 1 && (
            <path
              d={`${smooth ? getSmoothPath() : linearPath} L ${getX(data.length - 1)} ${baseline} L ${getX(0)} ${baseline} Z`}
              fill={color}
              fillOpacity={0.15}
            />
          )}
          <path
            d={smooth ? getSmoothPath() : linearPath}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {(showPoints || data.length === 1) &&
            data.map((item, index) => (
              <circle
                key={index}
                cx={getX(index)}
                cy={getY(item.value)}
                r={4}
                fill="#ffffff"
                stroke={color}
                strokeWidth={2}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                {showTooltip && <title>{`${item.label}: ${item.value}`}</title>}
              </circle>
            ))}
          {data.map((item, index) => (
            <text
              key={index}
              x={getX(index)}
              y={chartHeight + 55}
              textAnchor="middle"
              className="text-xs fill-neutral-500"
            >
              {item.label}
            </text>
          ))}
        </svg>
      </div>
      {showLegend && (seriesLabel || title) && (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
          <span className="text-sm text-neutral-600">{seriesLabel ?? title}</span>
        </div>
      )}
    </div>
  );
};
