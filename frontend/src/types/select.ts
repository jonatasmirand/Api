export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

export interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export interface SwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export interface DatePickerProps {
  id?: string;
  name?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}
