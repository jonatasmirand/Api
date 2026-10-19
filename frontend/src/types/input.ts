export type InputSize = 'sm' | 'md' | 'lg';

export interface BaseInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  size?: InputSize;
  error?: string;
  className?: string;
}

export interface InputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'url';
  label?: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface PasswordInputProps extends BaseInputProps {
  label?: string;
  description?: string;
}

export interface TextareaProps extends BaseInputProps {
  label?: string;
  description?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface FormFieldProps {
  id?: string;
  htmlFor?: string;
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}
