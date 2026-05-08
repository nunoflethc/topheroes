import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskItem from './components/TaskItem';
import Login from './components/Login';
import Signup from './components/Signup';
import { Task, AppScreen } from './types';
import { auth } from './firebase';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Initialize Avatar Rigging Protocols', status: 'active', priority: 'routine' },
  { id: '2', title: 'Finalize Neon District Environment Map', status: 'active', priority: 'high' },
  { id: '3', title: 'Resource Extraction: 15 Rare Ore Samples', status: 'active', priority: 'routine' },
  { id: '4', title: 'System Diagnostic & Team Performance Review', status: 'active', priority: 'scheduled' },
  { id: '5', title: 'Update Security Encryption Keys', status: 'active', priority: 'security' },
];

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  const username = auth.currentUser?.displayName || 'Operator';

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return t.status === 'active';
    if (filter === 'done') return t.status === 'completed';
    return true;
  });

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === 'active' ? 'completed' : 'active' } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Mission Protocol',
      status: 'active',
      priority: 'routine'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleLogout = () => {
    setTasks(INITIAL_TASKS);
    setScreen('login');
  };

  return (
    <div className="min-h-screen font-sans bg-surface">
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {(screen === 'login' || screen === 'signup') && (
            <motion.div
              key="auth-view"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-12 flex flex-col items-center">
                <motion.h1
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-display text-4xl font-black text-primary-container tracking-[0.3em] uppercase mb-2"
                >
                  TOPHEROES
                </motion.h1>
                <div className="h-1 w-12 bg-primary-container rounded-full neon-glow" />
              </div>

              {screen === 'login' ? (
                <Login
                  onSuccess={() => setScreen('dashboard')}
                  onNavigateSignup={() => setScreen('signup')}
                />
              ) : (
                <Signup
                  onSuccess={() => setScreen('dashboard')}
                  onNavigateLogin={() => setScreen('login')}
                />
              )}

              <footer className="mt-12 text-center pointer-events-none opacity-40">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Shield size={14} />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Encrypted Session Secure</span>
                </div>
              </footer>
            </motion.div>
          )}

          {screen === 'dashboard' && (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex"
            >
              <Sidebar
                onAddTask={addTask}
                username={username}
                onLogout={handleLogout}
              />

              <div className="flex-1 lg:pl-64 w-full">
                <div className="max-w-4xl mx-auto py-12 px-6">
                  <section className="glass-panel border-outline-variant/20 rounded-3xl p-8 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div>
                        <h2 className="font-display text-2xl font-black text-on-surface uppercase tracking-tight">Quest Log</h2>
                        <p className="font-sans text-sm text-on-surface-variant font-medium">Active missions, {username}</p>
                      </div>
                      <div className="flex gap-4 p-1 bg-surface-container-high/50 rounded-lg backdrop-blur-sm border border-outline-variant/30">
                        {(['all', 'active', 'done'] as const).map(f => (
                          <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all ${
                              filter === f ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {filteredTasks.map(task => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={addTask}
                      className="w-full py-6 border-2 border-dashed border-outline-variant/30 rounded-2xl text-on-surface-variant font-mono text-xs font-bold hover:border-primary-container/50 hover:text-primary transition-all flex items-center justify-center gap-3 uppercase tracking-widest group"
                    >
                      <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                      Add New Mission
                    </button>
                  </section>
                </div>
              </div>

              {/* Mobile FAB */}
              <button
                onClick={addTask}
                className="lg:hidden fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,210,255,0.5)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 neon-glow-strong"
              >
                <Plus size={32} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}