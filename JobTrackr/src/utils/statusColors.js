export const STATUS_OPTIONS = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export const STATUS_COLORS = {
  Wishlist:  { bg: 'bg-indigo-50/50 dark:bg-indigo-950/20',     text: 'text-indigo-600 dark:text-indigo-400',               border: 'border-indigo-200/50 dark:border-indigo-900/30 border-dashed', mui: '#818cf8' },
  Applied:   { bg: 'bg-sky-50/50 dark:bg-sky-950/20',           text: 'text-sky-600 dark:text-sky-400',                     border: 'border-sky-200/50 dark:border-sky-900/30 border-solid',        mui: '#38bdf8' },
  Interview: { bg: 'bg-amber-50/50 dark:bg-amber-950/20',       text: 'text-amber-600 dark:text-amber-400',                 border: 'border-amber-200/50 dark:border-amber-900/30 border-solid',    mui: '#fbbf24' },
  Offer:     { bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',   text: 'text-emerald-600 dark:text-emerald-400 font-semibold', border: 'border-emerald-200/50 dark:border-emerald-900/30 border-solid',  mui: '#34d399' },
  Rejected:  { bg: 'bg-rose-50/30 dark:bg-rose-950/10',         text: 'text-rose-600/80 dark:text-rose-400/70 line-through', border: 'border-rose-200/30 dark:border-rose-900/20 border-dotted',    mui: '#f87171' },
};

export const STATUS_ORDER = ['Wishlist', 'Applied', 'Interview', 'Offer'];
