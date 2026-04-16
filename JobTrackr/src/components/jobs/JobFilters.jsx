import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setSearchQuery } from '../../store/uiSlice';
import { Search } from 'lucide-react';

const STATUSES = ['All', 'Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobFilters() {
  const dispatch = useDispatch();
  const { statusFilter, searchQuery } = useSelector((state) => state.ui);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-10">

      <div className="relative flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
        <input
          type="text"
          placeholder="Search jobs, companies, or locations..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-11 pr-4 py-2.5 text-sm rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-300 outline-none transition-all placeholder:text-zinc-300"
        />
      </div>


      <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setStatusFilter(status))}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all shrink-0 ${
              statusFilter === status
                ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-slate-900 dark:border-slate-100'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-200 dark:hover:border-zinc-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

