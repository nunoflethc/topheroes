import { ListChecks, Terminal, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface SidebarProps {
  onAddTask: () => void;
  username: string;
  onLogout: () => void;
}

export default function Sidebar({ onAddTask, username, onLogout }: SidebarProps) {
  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen py-6 w-64 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/30 shadow-xl z-50">
      <div className="px-6 mb-8">
        <h1 className="font-display text-2xl font-black tracking-tighter text-primary-container">TOPHEROES</h1>
        
        <div className="mt-6 flex items-center gap-3 p-3 glass-panel rounded-xl border-outline-variant/30">
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center">
            <span className="font-display font-black text-primary-container text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-bold text-primary truncate uppercase">{username}</p>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-mono">Operator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container/10 border-r-4 border-primary-container text-primary-container">
          <ListChecks size={18} />
          <span className="font-sans text-sm font-medium">Tasks</span>
        </button>
      </nav>

      <div className="px-6 mt-auto space-y-3">
        <button 
          onClick={onAddTask}
          className="w-full py-4 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-display font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
        >
          Add Task
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 flex items-center justify-center gap-2 text-on-surface-variant hover:text-error border border-outline-variant/30 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all hover:border-error/40"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      <div className="mt-6 px-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={14} className="text-primary-container" />
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">System Sync: v4.2</span>
        </div>
        <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            className="h-full bg-primary-container shadow-[0_0_8px_#00d2ff]"
          />
        </div>
      </div>
    </aside>
  );
}