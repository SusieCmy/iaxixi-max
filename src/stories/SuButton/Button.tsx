import React from 'react';

export interface SuButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const SuButton: React.FC<SuButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  // DaisyUI 基础按钮类
  const baseClasses = 'btn';

  // DaisyUI 变体样式映射
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  // DaisyUI 尺寸样式映射
  const sizeClasses = {
    sm: 'btn-sm',
    md: '', // md 是默认尺寸，不需要额外类
    lg: 'btn-lg',
  };

  // 组合所有类名
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
    disabled ? 'btn-disabled': ''
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {
        loading && <span className="loading loading-spinner"></span>
      }
      {children}
    </button>
  );
};