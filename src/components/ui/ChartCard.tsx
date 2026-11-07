import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <section
      className={`bg-white dark:bg-[#242C27] p-4 sm:p-6 rounded-2xl border shadow-sm space-y-4 min-w-0 ${className}`}
    >
      <header>
        <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
