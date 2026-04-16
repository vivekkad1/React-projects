import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/uiSlice';
import { Sun, Moon, Menu, Bell } from 'lucide-react';

export default function TopBar({ onMenuClick, title }) {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.ui);
  const jobs = useSelector((state) => state.jobs?.jobs ?? []);

  const upcomingReminders = jobs.filter((job) => {
    if (!job.reminderDate) return false;
    const diff = Math.ceil((new Date(job.reminderDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 3;
  });

  return (
    <header className="h-18 md:h-20 flex items-center justify-between px-6 md:px-8 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {upcomingReminders.length > 0 && (
          <button className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 transition-colors group">
            <div className="relative">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-zinc-900 dark:bg-zinc-100 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
          </button>
        )}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2.5 rounded-xl text-zinc-500 hover:text-amber-500 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
