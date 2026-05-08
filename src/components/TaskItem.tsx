import { Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'completed';

  const priorityColors = {
    high: 'text-error',
    routine: 'text-on-surface-variant',
    security: 'text-primary',
    scheduled: 'text-tertiary',
    low: 'text-outline-variant',
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`group flex items-center gap-6 p-5 rounded-2xl border transition-all duration-300 ${
        isCompleted 
          ? 'bg-surface-container/40 border-outline-variant/20 grayscale-[0.5]' 
          : 'bg-surface-container border-outline-variant/30 hover:border-primary-container/50 glass-panel cursor-pointer'
      }`}
      onClick={() => onToggle(task.id)}
    >
      <button 
        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
          isCompleted 
            ? 'bg-primary-container border-primary-container text-on-primary-container' 
            : 'border-outline-variant group-hover:border-primary-container'
        }`}
      >
        {isCompleted && <Check size={18} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <h4 className={`font-display text-base tracking-tight transition-all ${
          isCompleted ? 'text-on-surface-variant line-through' : 'text-on-surface'
        }`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-mono text-[9px] uppercase tracking-widest ${priorityColors[task.priority]}`}>
            {task.priority || 'routine'}
          </span>
          {task.deadline && (
            <>
              <span className="text-outline-variant text-[9px]">•</span>
              <span className="text-on-surface-variant font-mono text-[9px] uppercase tracking-widest">
                Deadline: {task.deadline}
              </span>
            </>
          )}
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-2 text-on-surface-variant hover:text-error transition-all"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
