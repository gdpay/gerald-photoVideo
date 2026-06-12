import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  as?: 'div' | 'section';
}

export function Container({ children, className, narrow, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-[960px]' : 'max-w-[1280px]',
        className
      )}
    >
      {children}
    </Tag>
  );
}
