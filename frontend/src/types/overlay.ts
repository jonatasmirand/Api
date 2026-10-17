export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Área de ações fixada no rodapé do modal. */
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  /** Rótulo acessível quando não há `title`. */
  ariaLabel?: string;
  role?: 'dialog' | 'alertdialog';
  className?: string;
}

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  /** Conteúdo adicional abaixo da descrição. */
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  /** Exibe carregamento no botão de confirmação e bloqueia o cancelamento. */
  loading?: boolean;
  className?: string;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  align?: 'left' | 'right';
  className?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export interface TabOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}
