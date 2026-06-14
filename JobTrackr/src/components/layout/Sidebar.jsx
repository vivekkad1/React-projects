/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Briefcase, PlusCircle, BarChart3,
  StickyNote, LogOut, X,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs',      label: 'My Jobs',   icon: Briefcase },
  { to: '/add-job',   label: 'Add Job',   icon: PlusCircle },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/notes',     label: 'Notes',     icon: StickyNote },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 w-[270px] relative z-20">
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-sm">
            <Briefcase size={20} className="text-white dark:text-zinc-900" />
          </div>
          <span className="font-semibold text-xl text-zinc-900 dark:text-zinc-50 tracking-tight">JobTrackr</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-zinc-300 hover:text-zinc-700 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <p className="px-4 mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-300 dark:text-zinc-500">Main Menu</p>

        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors group ${
                isActive
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={19} className={isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6">
        <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-4 mb-3 border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name || 'User'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-200 text-sm font-semibold border border-zinc-300 dark:border-zinc-600">
                {user?.name?.[0] || user?.email?.[0] || 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate uppercase tracking-tight">{user?.name || 'User'}</p>
              <p className="text-[10px] text-zinc-500 truncate font-semibold">{user?.email || ''}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
