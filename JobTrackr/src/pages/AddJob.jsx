/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addJob, updateJob } from '../store/jobsSlice';
import { STATUS_OPTIONS } from '../utils/statusColors';
import {
  TextField, MenuItem, Select, InputLabel, FormControl,
  FormHelperText,
} from '@mui/material';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { jobService } from '../services/jobService';

const LOCATION_TYPES = ['Remote', 'Hybrid', 'On-site'];

export default function AddJob() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const existingJob = useSelector((state) => state.jobs.jobs.find((job) => job.id === jobId));
  const isEdit = !!jobId;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company: '',
      role: '',
      location: 'Remote',
      jobUrl: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      reminderDate: '',
      notes: '',
    },
  });

  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (isEdit && existingJob) {
      reset({
        company: existingJob.company || '',
        role: existingJob.role || '',
        location: existingJob.location || 'Remote',
        jobUrl: existingJob.jobUrl || '',
        status: existingJob.status || 'Applied',
        appliedDate: existingJob.appliedDate || '',
        reminderDate: existingJob.reminderDate || '',
        notes: existingJob.notes || '',
      });
      if (existingJob.resume) {
        setResumeFile(existingJob.resume);
      }
    }
  }, [isEdit, existingJob, reset]);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('You must be logged in to manage job applications.');
      return;
    }
    try {
      if (isEdit) {
        const updatedJob = { ...existingJob, ...data, resume: resumeFile };
        await jobService.updateJob(existingJob.id, updatedJob);
        dispatch(updateJob(updatedJob));
        toast.success('Application updated');
      } else {
        const newJob = {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          ...data,
          resume: resumeFile
        };
        const savedJob = await jobService.createJob(user.uid, newJob);
        dispatch(addJob(savedJob));
        toast.success('Application tracked');
      }
      navigate('/jobs');
    } catch (err) {
      toast.error(err.message || 'An error occurred while saving the application.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeFile({ name: file.name, data: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: 14,
      backgroundColor: 'transparent',
    },
    '& label': { fontSize: 13, fontWeight: 500 },
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">{isEdit ? 'Edit Application' : 'Track New Application'}</h2>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed">{isEdit ? 'Update the details of your job search progress.' : 'Enter details of the job you are applying for.'}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <TextField
                label="Company Name"
                fullWidth
                size="small"
                sx={inputSx}
                error={!!errors.company}
                helperText={errors.company?.message}
                {...register('company', { required: 'Company name is required' })}
              />
            </div>
            <div>
              <TextField
                label="Job Title / Role"
                fullWidth
                size="small"
                sx={inputSx}
                error={!!errors.role}
                helperText={errors.role?.message}
                {...register('role', { required: 'Job title is required' })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormControl fullWidth size="small" error={!!errors.location} sx={inputSx}>
              <InputLabel>Location Type</InputLabel>
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select 
                    label="Location Type" 
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {LOCATION_TYPES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth size="small" error={!!errors.status} sx={inputSx}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <Select 
                    label="Status" 
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {STATUS_OPTIONS.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                  </Select>
                )}
              />
              {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
            </FormControl>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <TextField
                label="Job Posting URL"
                fullWidth
                size="small"
                type="url"
                sx={inputSx}
                placeholder="https://..."
                error={!!errors.jobUrl}
                helperText={errors.jobUrl?.message}
                {...register('jobUrl')}
              />
            </div>
            <div className="relative">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <TextField
                label="Resume (PDF/Word)"
                fullWidth
                size="small"
                sx={{
                  ...inputSx,
                  '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    cursor: 'pointer',
                  }
                }}
                value={resumeFile ? resumeFile.name : ''}
                placeholder="Choose file..."
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <Upload size={16} className={resumeFile ? "text-zinc-900 dark:text-zinc-50 mr-2 shrink-0" : "text-zinc-300 mr-2 shrink-0"} />
                  ),
                }}
                onClick={() => document.getElementById('resume-upload').click()}
              />
              {resumeFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setResumeFile(null);
                  }}
                  className="absolute -bottom-5 left-1 text-[11px] font-semibold text-rose-500 hover:underline text-left pointer-events-auto"
                >
                  Remove file
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextField
              label="Applied Date"
              fullWidth
              size="small"
              type="date"
              sx={inputSx}
              InputLabelProps={{ shrink: true }}
              error={!!errors.appliedDate}
              helperText={errors.appliedDate?.message}
              {...register('appliedDate', { required: 'Applied date is required' })}
            />
            <TextField
              label="Reminder Date"
              fullWidth
              size="small"
              type="date"
              sx={inputSx}
              InputLabelProps={{ shrink: true }}
              {...register('reminderDate')}
            />
          </div>

          <div>
            <TextField
              label="Notes / Brief Description"
              fullWidth
              multiline
              rows={4}
              size="small"
              sx={inputSx}
              placeholder="Add any specific details about the role or interview..."
              {...register('notes')}
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-50 dark:text-zinc-900 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-colors disabled:opacity-50 text-sm"
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Details' : 'Track Application'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
