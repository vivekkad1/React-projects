/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate, daysUntil } from '../utils/dateHelpers';
import StatusBadge from '../components/jobs/StatusBadge';
import {
  Briefcase, Send, Users, Trophy, XCircle, Plus, Bell, ArrowRight,
} from 'lucide-react';

const STAT_CARDS = [
  { label: 'Total',     key: 'All',       icon: Briefcase, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
  { label: 'Applied',   key: 'Applied',   icon: Send,      color: 'text-sky-600 dark:text-sky-400',       bg: 'bg-sky-50 dark:bg-sky-950/40' },
  { label: 'Interview', key: 'Interview', icon: Users,     color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { label: 'Offer',     key: 'Offer',     icon: Trophy,    color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  { label: 'Rejected',  key: 'Rejected',  icon: XCircle,   color: 'text-rose-600 dark:text-rose-400',     bg: 'bg-rose-50 dark:bg-rose-950/30' },
];

export default function Dashboard() {
  const jobs = useSelector((state) => state.jobs?.jobs ?? []);
  const user = useSelector((state) => state.auth.user);

  const countByStatus = (status) =>
    status === 'All' ? jobs.length : jobs.filter((job) => job.status === status).length;

  const recent = [...jobs].slice(0, 5);

  const upcomingReminders = jobs
    .filter((job) => {
      const d = daysUntil(job.reminderDate);
      return d !== null && d >= 0 && d <= 7;
    })
    .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">{greeting}, {user?.name || 'Explorer'}</h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mb-0 sm:!mb-0">Monitor your job search progress and upcoming reminders.</p>
        </div>
        <Link
          to="/add-job"
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-50 dark:text-zinc-900 text-white text-sm font-medium p-3 sm:px-5 sm:py-2.5 rounded-xl shadow-sm transition-colors w-full sm:w-auto"
          title="Add Application"
        >
          <Plus size={18} /> <span className="sm:inline">Add Application</span>
        </Link>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

        {STAT_CARDS.map(({ label, key, icon: Icon, color, bg }) => (
          <div key={key} className="relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col gap-2 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-600/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent dark:before:from-white/5 dark:before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 before:pointer-events-none hover:before:opacity-100">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3 shadow-inner`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1">{countByStatus(key)}</p>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Recent Applications</h3>
            <Link to="/jobs" className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-900 dark:text-zinc-200 flex items-center gap-1 group transition-colors">
              View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-medium text-zinc-300">No applications tracked yet.</p>
              <Link to="/add-job" className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 hover:underline mt-2 inline-block">Add your first job</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-100 hover:border-zinc-200 dark:hover:border-zinc-300 hover:bg-white dark:hover:bg-zinc-800/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-50 dark:text-zinc-700 dark:text-zinc-300 font-semibold text-base border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0">
                    {job.company?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{job.role}</p>
                    <p className="text-xs font-medium text-zinc-500 truncate mt-0.5">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <StatusBadge status={job.status} />
                    <p className="text-[10px] font-medium text-zinc-300 uppercase tracking-tighter">{formatDate(job.appliedDate)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>


        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-rose-50 dark:bg-rose-900/20 rounded-lg">
              <Bell size={16} className="text-rose-500" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Reminders</h3>
          </div>
          {upcomingReminders.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-zinc-200/50 dark:border-zinc-700/50 rounded-xl">
              <p className="text-xs font-medium text-zinc-300">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.map((job) => {
                const d = daysUntil(job.reminderDate);
                return (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="block p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-zinc-200 dark:border-zinc-700 dark:hover:border-slate-800 transition-all shadow-sm"
                  >
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{job.role}</p>
                    <p className="text-[10px] font-medium text-zinc-500 uppercase mt-0.5">{job.company}</p>
                    <p className={`text-[10px] mt-2 font-semibold uppercase ${d === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                      {d === 0 ? 'Due Today' : `${d} Day${d !== 1 ? 's' : ''} Left`}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
