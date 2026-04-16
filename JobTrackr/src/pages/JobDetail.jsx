import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob, updateJob } from '../store/jobsSlice';
import StatusBadge from '../components/jobs/StatusBadge';
import { formatDate, isReminderSoon, isReminderOverdue } from '../utils/dateHelpers';
import { STATUS_ORDER } from '../utils/statusColors';
import {
  Pencil, Trash2, ExternalLink, MapPin, Calendar, Bell,
  FileText, Check, ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs.jobs.find((job) => job.id === jobId));
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');

  if (!job) {
    return (
      <div className="text-center py-24 text-zinc-300">
        <p>Job not found.</p>
        <button onClick={() => navigate('/jobs')} className="mt-4 text-zinc-900 dark:text-zinc-50 underline text-sm">
          Back to Jobs
        </button>
      </div>
    );
  }

  const reminderSoon = isReminderSoon(job.reminderDate);
  const reminderOverdue = isReminderOverdue(job.reminderDate);

  const handleDelete = () => {
    if (window.confirm('Delete this application?')) {
      dispatch(deleteJob(job.id));
      toast.success('Job deleted');
      navigate('/jobs');
    }
  };

  const startEditNotes = () => {
    setNotesValue(job.notes || '');
    setEditingNotes(true);
  };

  const saveNotes = () => {
    dispatch(updateJob({ ...job, notes: notesValue }));
    setEditingNotes(false);
    toast.success('Notes saved');
  };

  const currentStepIdx = STATUS_ORDER.indexOf(job.status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-50 transition-colors"
      >
        <ArrowLeft size={16} /> Back to My Applications
      </button>


      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-semibold text-zinc-900 dark:text-zinc-50 dark:text-zinc-700 dark:text-zinc-300 text-2xl shrink-0 border border-zinc-200 dark:border-zinc-700">
            {job.company?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 w-full min-w-0">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 leading-tight break-words">{job.role}</h2>
            <p className="text-lg font-medium text-zinc-500 mt-1">{job.company}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <StatusBadge status={job.status} />
              {job.location && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 bg-zinc-50 dark:bg-zinc-800/30 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">
                  <MapPin size={12} className="text-zinc-300" /> {job.location}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
            <button
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
              className="p-2 rounded-lg text-zinc-300 hover:text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-zinc-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 border border-zinc-200 dark:border-zinc-700 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>


        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
          <div>
            <p className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">Date Applied</p>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Calendar size={14} className="text-zinc-300" /> {formatDate(job.appliedDate)}
            </p>
          </div>
          {job.reminderDate && (
            <div>
              <p className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">Follow-up Reminder</p>
              <p className={`text-sm font-semibold flex items-center gap-2 ${
                reminderOverdue ? 'text-rose-600' : reminderSoon ? 'text-amber-600' : 'text-zinc-700 dark:text-zinc-300'
              }`}>
                <Bell size={14} />
                {formatDate(job.reminderDate)}
                {reminderOverdue && <span className="text-[10px] font-semibold uppercase">(Overdue)</span>}
              </p>
            </div>
          )}
          {job.jobUrl && (
            <div>
              <p className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">External Link</p>
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-900 dark:text-zinc-200 hover:underline flex items-center gap-1.5"
              >
                <ExternalLink size={14} /> View Posting
              </a>
            </div>
          )}
          {job.resume && (
            <div>
              <p className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">Resume Used</p>
              {typeof job.resume === 'object' && job.resume.data ? (
                <a
                  href={job.resume.data}
                  download={job.resume.name}
                  className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-900 dark:text-zinc-200 hover:underline flex items-center gap-1.5 truncate"
                >
                  <FileText size={14} className="shrink-0" /> <span className="truncate">{job.resume.name}</span>
                </a>
              ) : typeof job.resume === 'string' && job.resume.startsWith('http') ? (
                <a
                  href={job.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-900 dark:text-zinc-200 hover:underline flex items-center gap-1.5"
                >
                  <ExternalLink size={14} /> View Resume
                </a>
              ) : (
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <FileText size={14} className="text-zinc-300" /> {typeof job.resume === 'string' ? job.resume : job.resume?.name}
                </p>
              )}
            </div>
          )}
        </div>
      </div>


      {job.status !== 'Rejected' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-8">Application Status</h3>
          <div className="relative flex justify-between">

            <div className="absolute top-4 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800" />
            
            {STATUS_ORDER.map((step, idx) => {
              const isCompleted = idx <= currentStepIdx;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-4 transition-all ${
                    isCompleted
                      ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-200 dark:border-zinc-700 dark:border-zinc-700 text-white'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-700/50 text-zinc-300'
                  }`}>
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : idx + 1}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-tight ${isCompleted ? 'text-zinc-900 dark:text-slate-100' : 'text-zinc-300'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}


      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} /> Internal Notes
          </h3>
          {!editingNotes && (
            <button
              onClick={startEditNotes}
              className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-900 dark:text-zinc-200 hover:underline"
            >
              Edit Notes
            </button>
          )}
        </div>

        {editingNotes ? (
          <div className="space-y-4">
            <textarea
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-300 transition-all resize-none shadow-inner"
              placeholder="Add key details from interviews or correspondence..."
            />
            <div className="flex gap-2">
              <button
                onClick={saveNotes}
                className="px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-colors shadow-sm"
              >
                Save
              </button>
              <button
                onClick={() => setEditingNotes(false)}
                className="px-5 py-2 text-xs font-semibold text-zinc-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed min-h-[60px]">
              {job.notes || <span className="text-zinc-300 italic font-normal">No notes captured for this application.</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
