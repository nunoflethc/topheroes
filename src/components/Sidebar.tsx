import { LayoutGrid, ListChecks, Award, Settings2, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  onAddTask: () => void;
}

export default function Sidebar({ onAddTask }: SidebarProps) {
  const menuItems = [
    { icon: LayoutGrid, label: 'Overview', active: false },
    { icon: ListChecks, label: 'Tasks', active: true },
    { icon: Award, label: 'Achievements', active: false },
    { icon: Settings2, label: 'Settings', active: false },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen py-6 w-64 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/30 shadow-xl z-50">
      <div className="px-6 mb-8">
        <h1 className="font-display text-2xl font-black tracking-tighter text-primary-container">QUESTLOG</h1>
        
        <div className="mt-8 flex items-center gap-3 p-3 glass-panel rounded-xl border-outline-variant/30">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwoz0c8VAWGeRcTBLKsB4JMnemHoeC631BuMQbw3EWZgSDe9WVnwk3v1_70cVoDoTRiy5jcLacO5tNQ0wTb0RyTI0QctkioTHya0jRIuM9VYno92rRaSvsYPOKoOkxSLL-Lh03jZ1pO-8LWQGpUIcnnCLkV501kIj-u9IBpoooly-vPmDsvwY1S0PWHLOUk_sZtQBuGg1fUsq3oFRgkgBvhRyFEciWNWI85c-UI6OLiOv0FO2whwQzagseqF1NgS-fP09IZR4glyo" 
            alt="Operator avatar" 
            className="w-10 h-10 rounded-lg object-cover border border-outline-variant"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-bold text-primary truncate">OPERATOR_01</p>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-mono whitespace-nowrap">LVL 84 COMPL</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              item.active 
                ? 'bg-primary-container/10 border-r-4 border-primary-container text-primary-container' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'
            }`}
          >
            <item.icon size={18} className={item.active ? 'text-primary-container' : ''} />
            <span className="font-sans text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 mt-auto">
        <button 
          onClick={onAddTask}
          className="w-full py-4 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-display font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
        >
          Add Task
        </button>
      </div>

      <div className="mt-8 px-6 pb-4">
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
