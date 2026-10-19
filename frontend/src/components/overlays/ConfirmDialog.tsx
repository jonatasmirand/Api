'use client';

import React from 'react';
import { ButtonVariant, ConfirmDialogProps } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from './Modal';
import { StatusIcon } from '@/components/feedback/feedbackStyles';

const variantConfig: Record<
  NonNullable<ConfirmDialogProps['variant']>,
  { button: ButtonVariant; icon: 'error' | 'warning' | 'info'; iconClasses: string }
> = {
  danger: { button: 'danger', icon: 'error', iconClasses: 'bg-error-50 text-error-600' },
  warning: { button: 'primary', icon: 'warning', iconClasses: 'bg-warning-50 text-warning-600' },
  info: { button: 'primary', icon: 'info', iconClasses: 'bg-info-50 text-info-600' },
};

/** Diálogo de confirmação construído sobre o `Modal`, com mensagem e ações configuráveis. */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  description = 'Tem certeza que deseja realizar esta ação?',
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  loading = false,
  className = '',
}) => {
  const config = variantConfig[variant];
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      role="alertdialog"
      ariaLabel={title}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
      className={className}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={config.button} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconClasses}`}>
          <StatusIcon variant={config.icon} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}
          {children && <div className="mt-3 text-sm text-neutral-700">{children}</div>}
        </div>
      </div>
    </Modal>
  );
};
