'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  isLoading = false,
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
}) => {
  const baseStyles =
    'inline-flex rounded-full hover:brightness-90 items-center justify-center focus:outline-none border-2 font-medium';
  const variantStyles = {
    primary: 'text-white bg-primary border-primary',
    outline: 'text-black bg-transparent border-black/10',
    danger: 'text-white bg-red-700 border-red-700',
  };
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-7 py-2',
  };
  const loadingStyles = 'cursor-not-allowed';
  const disabledStyles = 'cursor-not-allowed opacity-50';

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        {
          [loadingStyles]: isLoading,
          [disabledStyles]: disabled,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
