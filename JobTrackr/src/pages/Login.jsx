import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login({ name: data.email.split('@')[0], email: data.email }));
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-800/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-lg shadow-slate-200 dark:shadow-none mb-4">
            <Briefcase size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">JobTrackr</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Organize your job hunt professionally</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 shadow-sm">
          <h2 className="text-zinc-900 dark:text-zinc-50 font-semibold text-xl mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Enter a valid email' },
                })}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 placeholder-slate-400 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-300 transition text-sm"
              />
              {errors.email && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 placeholder-slate-400 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-300 transition text-sm"
              />
              {errors.password && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white font-semibold py-2.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50 text-center">
            <p className="text-zinc-300 dark:text-zinc-500 text-xs">
              Demo access: Use any email and a 6+ character password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

