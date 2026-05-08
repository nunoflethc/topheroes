/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Shield, Terminal as TerminalIcon } from 'lucide-react';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import TaskItem from './components/TaskItem';
import StatusBar from './components/StatusBar';
import Login from './components/Login';
import Signup from './components/Signup';
import { Task, AppScreen } from './types';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Initialize Avatar Rigging Protocols', status: 'completed', priority: 'routine', deadline: '09:45 AM' },
  { id: '2', title: "Finalize 'Neon District' Environment Map", status: 'active', priority: 'high', deadline: '18:00' },
  { id: '3', title: 'Resource Extraction: 15 Rare Ore Samples', status: 'active', priority: 'routine' },
  { id: '4', title: 'System Diagnostic & Teammate Performance Review', status: 'active', priority: 'scheduled', deadline: 'Tomorrow' },
  { id: '5', title: 'Update Security Encryption Keys', status: 'active', priority: 'security', deadline: 'Weekly' },
  { id: '6', title: 'Neural Link Calibration', status: 'completed', priority: 'routine' },
  { id: '7', title: 'Decrypt Transmission Signal', status: 'active', priority: 'high' },
];

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active': return tasks.filter(t => t.status === 'active');
      case 'done': return tasks.filter(t => t.status === 'completed');
      default: return tasks;
    }
  }, [tasks, filter]);

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
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="min-h-screen font-sans relative">
      <Background />

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
                  QUESTLOG
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
                <p className="font-mono text-[8px] tracking-widest uppercase">v4.8.2 // System.Status: Nominal</p>
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
              <Sidebar onAddTask={addTask} />
              
              <div className="flex-1 lg:pl-64 w-full">
                <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
                  <StatusBar />

                  <section className="glass-panel border-outline-variant/20 rounded-3xl p-8 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div>
                        <h2 className="font-display text-2xl font-black text-on-surface uppercase tracking-tight">Primary Task List</h2>
                        <p className="font-sans text-sm text-on-surface-variant font-medium">Active operational objectives</p>
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
                      Add New Mission to List
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

              {/* HUD Elements */}
              <div className="fixed top-8 left-8 hidden lg:block opacity-20 pointer-events-none">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-1 bg-primary-container neon-glow" />
                  <div className="w-8 h-1 bg-outline-variant" />
                  <div className="w-4 h-1 bg-outline-variant" />
                </div>
              </div>
              <div className="fixed bottom-8 right-8 hidden lg:block opacity-20 pointer-events-none text-right">
                <div className="flex flex-col items-end gap-2">
                  <span className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">Loc: Neon_City_Core</span>
                  <div className="w-24 h-[1px] bg-outline-variant" />
                  <span className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">TZ: UTC-08:00</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
