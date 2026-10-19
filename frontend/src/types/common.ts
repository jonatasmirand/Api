export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type BaseProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
