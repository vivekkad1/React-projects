import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJob } from '../store/jobsSlice';
import { formatDate, daysUntil, isReminderSoon, isReminderOverdue } from '../utils/dateHelpers';
import StatusBadge from '../components/jobs/StatusBadge';
import { Bell, Pencil, Check, X, StickyNote, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Notes() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs?.jobs ?? []);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const jobsWithNotes = jobs.filter((job) => job.notes);
  const reminders = jobs
    .filter((job) => job.reminderDate)
    .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));

  const startEdit = (job) => {
    setEditingId(job.id);
    setEditValue(job.notes || '');
  };

  const saveEdit = (job) => {
    dispatch(updateJob({ ...job, notes: editValue }));
    setEditingId(null);
    toast.success('Note saved');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Notes & Reminders</h2>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed">Centralized view of your correspondence and key application dates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-6 flex items-center gap-2 uppercase tracking-wider">
            <StickyNote size={14} /> Active Notes ({jobsWithNotes.length})
          </h3>
          {jobsWithNotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm">
              <p className="text-sm font-medium text-zinc-300">No notes found.</p>
              <Link to="/jobs" className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 hover:underline mt-2 inline-block">View jobs to add notes</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobsWithNotes.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-50 transition-colors"
                      >
                       {job.role}
                      </Link>
                      <p className="text-[11px] font-semibold text-zinc-300 uppercase mt-0.5">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <StatusBadge status={job.status} />
                      {editingId !== job.id && (
                        <button
                          onClick={() => startEdit(job)}
                          className="p-1.5 rounded-lg text-zinc-300 hover:text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {editingId === job.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-300 transition-all resize-none shadow-inner"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(job)}
                          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white text-[11px] font-semibold uppercase rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-all shadow-sm"
                        >
                          <Check size={13} /> Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase text-zinc-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all"
                        >
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">{job.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>


        <div>
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-6 flex items-center gap-2 uppercase tracking-wider">
            <Bell size={14} /> Milestone Calendar ({reminders.length})
          </h3>
          {reminders.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm">
              <p className="text-sm font-medium text-zinc-300">Everything up to date.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((job) => {
                const d = daysUntil(job.reminderDate);
                const soon = isReminderSoon(job.reminderDate);
                const overdue = isReminderOverdue(job.reminderDate);

                return (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className={`block p-6 rounded-2xl border transition-all shadow-sm ${
                      overdue
                        ? 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/50 hover:border-rose-300'
                        : soon
                        ? 'bg-amber-50/50 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/50 hover:border-amber-300'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-200 dark:border-zinc-700 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-none mb-1 group-hover:text-zinc-900 dark:text-zinc-50 transition-colors">{job.role}</p>
                        <p className="text-[10px] font-semibold text-zinc-300 uppercase">{job.company}</p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`p-1.5 rounded-lg ${overdue ? 'bg-rose-500/10' : soon ? 'bg-amber-500/10' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                        <Calendar size={13} className={overdue ? 'text-rose-500' : soon ? 'text-amber-500' : 'text-zinc-300'} />
                      </div>
                      <p className={`text-[11px] font-semibold uppercase tracking-tight ${overdue ? 'text-rose-600' : soon ? 'text-amber-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {formatDate(job.reminderDate)}
                        {overdue && ` — OVERDUE ${Math.abs(d)} D`}
                        {!overdue && d === 0 && ' — DUE TODAY'}
                        {!overdue && d > 0 && ` — IN ${d} D`}
                      </p>
                    </div>
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
