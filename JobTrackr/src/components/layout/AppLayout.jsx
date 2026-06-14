/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import useAuth from '../../hooks/useAuth';
import { jobService } from '../../services/jobService';
import { setJobs } from '../../store/jobsSlice';
import toast from 'react-hot-toast';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/jobs': 'My Jobs',
  '/add-job': 'Add Job',
  '/analytics': 'Analytics',
  '/notes': 'Notes & Reminders',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (user?.uid) {
      setLoadingJobs(true);
      jobService.getJobs(user.uid)
        .then((fetchedJobs) => {
          dispatch(setJobs(fetchedJobs));
        })
        .catch((error) => {
          console.error(error);
          toast.error('Failed to load job applications.');
        })
        .finally(() => {
          setLoadingJobs(false);
        });
    }
  }, [user?.uid, dispatch]);

  const title = PAGE_TITLES[location.pathname]
    || (location.pathname.startsWith('/jobs/') ? 'Job Details' : 'JobTrackr');

  if (loadingJobs) {
    return (
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
            <div className="absolute w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider animate-pulse uppercase">
            Loading database...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
