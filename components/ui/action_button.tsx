import { cn } from '@/lib/utils';
import React from 'react'
import { IconType } from 'react-icons';

type ActionButtonProps = {
    icon: IconType;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
};

const ActionButton = ({ icon: Icon, onClick, children, isLoading, className, disabled }: ActionButtonProps) => {
    return (
        <button
            className={cn('flex flex-col gap-2 p-2 pr-10 rounded-lg border-2 border-black/20 font-medium', className)}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            <Icon />
            {children}
        </button>
    )
}

export default ActionButton