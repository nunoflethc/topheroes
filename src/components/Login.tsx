import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginProps {
  onSuccess: () => void;
  onNavigateSignup: () => void;
}

export default function Login({ onSuccess, onNavigateSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      setError('Credenciais inválidas. Tenta novamente.');
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
        <p className="font-sans text-sm text-on-surface-variant font-medium">Ready to resume your completionist journey?</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary-container flex items-center gap-2 uppercase tracking-widest">
            <Mail size={14} /> IDENTIFIER
          </label>
          <input 
            className="quest-input w-full rounded-t-lg" 
            placeholder="Email" 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-primary-container flex items-center gap-2 uppercase tracking-widest">
            <Lock size={14} /> ACCESS KEY
          </label>
          <div className="relative">
            <input 
              className="quest-input w-full rounded-t-lg" 
              placeholder="••••••••" 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
            >
              <Eye size={16} />
            </button>
          </div>
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
          New to the terminal? 
          <button 
            onClick={onNavigateSignup}
            className="text-primary hover:underline underline-offset-4 ml-1 font-bold"
          >
            Initialize Account
          </button>
        </p>
      </footer>
    </motion.div>
  );
}