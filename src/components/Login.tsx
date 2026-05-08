import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginProps {
  onSuccess: () => void;
  onNavigateSignup: () => void;
}

export default function Login({ onSuccess, onNavigateSignup }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fakeEmail = `${username.toLowerCase().trim()}@topheroes.app`;
      await signInWithEmailAndPassword(auth, fakeEmail, password);
      onSuccess();
    } catch (err: any) {
      setError('Username ou password incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md glass-panel rounded-xl p-8 shadow-2xl relative border-outline-variant/30"
    >
      <header className="mb-8">
        <h2 className="font-display text-2xl font-bold text-on-surface mb-1">Welcome Back, Operator</h2>
        <p className="font-sans text-sm text-on-surface-variant font-medium">Ready to resume your quest?</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary-container flex items-center gap-2 uppercase tracking-widest">
            <User size={14} /> USERNAME
          </label>
          <input 
            className="quest-input w-full rounded-t-lg" 
            placeholder="OPERATOR_X" 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary-container flex items-center gap-2 uppercase tracking-widest">
            <Lock size={14} /> PASSWORD
          </label>
          <input 
            className="quest-input w-full rounded-t-lg" 
            placeholder="••••••••" 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest">{error}</p>
        )}

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-display font-black text-xs py-4 rounded-xl tracking-widest uppercase shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Game'}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      <footer className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
        <p className="font-sans text-on-surface-variant text-sm font-medium">
          New operator?
          <button 
            onClick={onNavigateSignup}
            className="text-primary hover:underline underline-offset-4 ml-1 font-bold"
          >
            Create Account
          </button>
        </p>
      </footer>
    </motion.div>
  );
}