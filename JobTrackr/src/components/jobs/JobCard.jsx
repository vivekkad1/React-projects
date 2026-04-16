import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../store/jobsSlice';
import StatusBadge from './StatusBadge';
import { formatDate, isReminderSoon, isReminderOverdue, daysUntil } from '../../utils/dateHelpers';
import { MapPin, Pencil, Trash2, Eye, Calendar, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JobCard({ job }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete application at ${job.company}?`)) {
      dispatch(deleteJob(job.id));
      toast.success('Job removed');
    }
  };

  const reminderSoon = isReminderSoon(job.reminderDate);
  const reminderOverdue = isReminderOverdue(job.reminderDate);
  const daysLeft = daysUntil(job.reminderDate);

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
    >

      {(reminderSoon || reminderOverdue) && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-white dark:border-slate-950 z-10" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-semibold text-zinc-900 dark:text-zinc-50 dark:text-zinc-700 dark:text-zinc-300 text-base border border-zinc-200 dark:border-zinc-700">
          {job.company?.[0]?.toUpperCase() || '?'}
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-base mb-1 line-clamp-1">{job.role}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{job.company}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.location && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800/30 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            <MapPin size={12} className="text-zinc-300" /> {job.location}
          </div>
        )}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800/30 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          <Calendar size={12} className="text-zinc-300" /> {formatDate(job.appliedDate)}
        </div>
        {job.reminderDate && (
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border ${
            reminderOverdue 
              ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50' 
              : reminderSoon 
              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50' 
              : 'bg-zinc-50 dark:bg-zinc-800/30 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
          }`}>
            <Bell size={12} />
            {reminderOverdue
              ? `Overdue ${Math.abs(daysLeft)}d`
              : daysLeft === 0
              ? 'Today'
              : `In ${daysLeft}d`}
          </div>
        )}
      </div>


      <div className="flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Eye size={14} /> View
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}/edit`); }}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg text-zinc-900 dark:text-zinc-50 dark:text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-indigo-900/30 hover:bg-slate-200 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 flex items-center justify-center rounded-lg text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
