import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isConfigured } = useAuth();

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-4 font-bold text-xl">
            ⚠️
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Firebase Setup Required</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
            Please create a <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-850 rounded font-semibold text-xs text-rose-500">.env</code> file in your project root and copy the variables from <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-850 rounded font-semibold text-xs text-zinc-600 dark:text-zinc-400">.env.example</code> with your actual Firebase API keys.
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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
          <div className="absolute w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
        </div>
        <p className="mt-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide animate-pulse">
          Initializing session...
        </p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
