export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartData {
  title?: string;
  data: ChartDataPoint[];
  showLegend?: boolean;
  showTooltip?: boolean;
  height?: number;
  className?: string;
}

export interface BarChartProps extends ChartData {
  horizontal?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
}

export interface LineChartProps extends ChartData {
  smooth?: boolean;
  showPoints?: boolean;
  showArea?: boolean;
  showGrid?: boolean;
  /** Nome da série exibido na legenda (ex.: "Saldo"). */
  seriesLabel?: string;
}

export interface PieChartProps extends ChartData {
  donut?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
}
