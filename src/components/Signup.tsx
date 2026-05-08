import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface SignupProps {
  onSuccess: () => void;
  onNavigateLogin: () => void;
}

export default function Signup({ onSuccess, onNavigateLogin }: SignupProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('As passwords não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      setError('Erro ao criar conta. Tenta outro email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md glass-panel rounded-xl p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-container to-secondary-container" />
      
      <header className="mb-8">
        <h2 className="font-display text-2xl font-bold text-on-surface mb-1">New Operator</h2>
        <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Initialize completionist profile</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary uppercase tracking-widest block">Username</label>
          <div className="relative">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={16} />
            <input 
              className="quest-input w-full pl-8" 
              placeholder="OPERATOR_X" 
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary uppercase tracking-widest block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={16} />
            <input 
              className="quest-input w-full pl-8" 
              placeholder="nexus@questlog.com" 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-primary uppercase tracking-widest block">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={16} />
              <input 
                className="quest-input w-full pl-8" 
                placeholder="••••••••" 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-primary uppercase tracking-widest block">Verify</label>
            <div className="relative">
              <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={16} />
              <input 
                className="quest-input w-full pl-8" 
                placeholder="••••••••" 
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest">{error}</p>
        )}

        <div className="pt-4 space-y-6">
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 neon-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Initializing...' : 'Create Account'}
            <ArrowRight size={16} />
          </button>

          <div className="flex items-center justify-center gap-2">
            <span className="h-px flex-grow bg-outline-variant/30" />
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-[0.2em] px-2 whitespace-nowrap">Already Enlisted?</span>
            <span className="h-px flex-grow bg-outline-variant/30" />
          </div>

          <button 
            type="button"
            onClick={onNavigateLogin}
            className="w-full text-center font-mono text-[10px] text-secondary hover:text-primary transition-colors uppercase tracking-widest"
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </motion.div>
  );
}