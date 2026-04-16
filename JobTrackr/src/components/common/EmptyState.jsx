import { BriefcaseIcon } from 'lucide-react';

export default function EmptyState({ title = 'No results found', subtitle = 'Try adjusting your filters or add a new entry to get started.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 border-dashed">
      <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-indigo-950 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 dark:border-zinc-700">
        <BriefcaseIcon size={32} className="text-zinc-900 dark:text-zinc-50 dark:text-zinc-700 dark:text-zinc-300" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
