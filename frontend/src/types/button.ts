export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
  'aria-label'?: string;
}
