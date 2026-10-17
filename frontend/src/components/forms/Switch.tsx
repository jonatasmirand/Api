import React, { useId } from 'react';
import { SwitchProps } from '@/types';

export const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const labelId = `${switchId}-label`;
  const descriptionId = `${switchId}-description`;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">
        {label && (
          <label id={labelId} htmlFor={switchId} className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        {description && (
          <p id={descriptionId} className="text-sm text-neutral-500">{description}</p>
        )}
      </div>
      <div className="ml-4 shrink-0">
        {name && <input type="hidden" name={name} value={checked ? 'on' : 'off'} />}
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            checked ? 'bg-primary-600' : 'bg-neutral-200'
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              checked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
