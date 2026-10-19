export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  /** Tempo em ms até o fechamento automático. Use 0 para desativar. */
  duration?: number;
  /** @deprecated A posição é definida pelo `ToastContainer`. */
  position?: ToastPosition;
  /** Ação opcional (ex.: "Desfazer"). */
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}

export interface ToastItem extends Omit<ToastProps, 'onClose' | 'position' | 'className'> {
  id: string;
}

export interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
  className?: string;
}
