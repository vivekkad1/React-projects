import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, isAuthenticated, loading, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated && isConfigured) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, isConfigured, navigate]);

  const handleGoogleSignIn = async () => {
    if (signingIn) return;
    setSigningIn(true);
    const loadingToast = toast.loading('Signing in with Google...');
    try {
      await login();
      toast.dismiss(loadingToast);
      toast.success('Welcome to JobTrackr!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Login error:', error);
      
      // User-friendly error messages
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled. Please keep the window open.');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network failure. Please check your connection.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        toast.error('Sign-in request cancelled.');
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-4 font-bold text-xl">
            ⚠️
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Firebase Setup Required</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
            Please create a <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-semibold text-xs text-rose-500">.env</code> file in your project root and copy the variables from <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-semibold text-xs text-zinc-600 dark:text-zinc-400">.env.example</code> with your actual Firebase API keys.
          </p>
          <div className="text-left bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 font-mono text-xs text-zinc-500 space-y-1 select-all">
            <div>VITE_FIREBASE_API_KEY=...</div>
            <div>VITE_FIREBASE_AUTH_DOMAIN=...</div>
            <div>VITE_FIREBASE_PROJECT_ID=...</div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
          <div className="absolute w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-800/30 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-lg shadow-slate-200 dark:shadow-none mb-4 animate-bounce">
            <Briefcase size={24} className="text-white dark:text-zinc-900" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">JobTrackr</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm font-medium">Organize your job hunt professionally</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 shadow-sm">
          <h2 className="text-zinc-900 dark:text-zinc-50 font-semibold text-xl mb-3 text-center">Welcome Back</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs text-center mb-8">
            Access your application tracking database from any device.
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={signingIn}
            className="w-full bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {signingIn ? 'Connecting...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}
