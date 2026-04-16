export const STATUS_OPTIONS = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export const STATUS_COLORS = {
  Wishlist:  { bg: 'bg-zinc-50 dark:bg-zinc-900/60',     text: 'text-zinc-400 dark:text-zinc-500',               border: 'border-zinc-300 dark:border-zinc-700 border-dashed', mui: '#a1a1aa' },
  Applied:   { bg: 'bg-zinc-100 dark:bg-zinc-800',       text: 'text-zinc-700 dark:text-zinc-300',               border: 'border-zinc-300 dark:border-zinc-600 border-solid',  mui: '#71717a' },
  Interview: { bg: 'bg-zinc-200 dark:bg-zinc-700',       text: 'text-zinc-900 dark:text-zinc-100',               border: 'border-zinc-400 dark:border-zinc-500 border-solid',  mui: '#52525b' },
  Offer:     { bg: 'bg-zinc-900 dark:bg-zinc-100',       text: 'text-white dark:text-zinc-900 font-semibold',    border: 'border-zinc-900 dark:border-zinc-100 border-solid',  mui: '#09090b' },
  Rejected:  { bg: 'bg-transparent',                     text: 'text-zinc-400 dark:text-zinc-600 line-through',  border: 'border-zinc-200 dark:border-zinc-800 border-dotted', mui: '#d4d4d8' },
};

export const STATUS_ORDER = ['Wishlist', 'Applied', 'Interview', 'Offer'];
