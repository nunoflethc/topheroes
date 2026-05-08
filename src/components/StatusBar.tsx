import { motion } from 'motion/react';

export default function StatusBar() {
  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <img 
          className="w-full h-full object-cover grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAicR5HubxEbSUnGosMEv1VSVz89hRKsTxMuGKF-UeRx1YyrHevgOw30ybo6pU_ydWjC23j9IPbUM_Ozju7vabs78Fi68F-mkAVmQiHX0ftdjskx-GhgZXpjg8vxfyM0depbnm7pEZ5ByWoWoiYac_jDnDTCtr88VcGrTZPEOH-8u7TK07_TQkR_LbBMzpwPtZjdtMvohgU7GnF8Bov2DfilhvCBG2kR5mTBqZt-6mcbT92ecFEmf3CSQCVSg2DqG7nzw_D0mPLlKQ" 
          alt="Technical decoration"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="relative flex items-center justify-center w-40 h-40">
          <svg className="w-full h-full -rotate-90">
            <circle 
              className="text-surface-container-highest" 
              cx="80" cy="80" fill="transparent" r="70" 
              stroke="currentColor" strokeWidth="8"
            />
            <motion.circle 
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 110 }}
              className="text-primary-container" 
              cx="80" cy="80" fill="transparent" r="70" 
              stroke="currentColor" strokeDasharray="440" 
              strokeWidth="8"
              strokeLinecap="round"
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold text-primary">75%</span>
            <span className="font-mono text-[9px] text-on-surface-variant tracking-[0.2em]">EFFICIENCY</span>
          </div>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h1 className="font-display text-4xl md:text-5xl font-black text-on-surface tracking-tighter uppercase">
            System Status: <span className="text-primary-container neon-glow">STABLE</span>
          </h1>
          <p className="font-sans text-on-surface-variant font-medium max-w-lg leading-relaxed">
            Track and execute your daily operations. You have 12 pending tasks requiring immediate attention.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <div className="flex flex-col px-6 py-3 bg-surface-container-high/50 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
              <span className="font-display text-xl font-bold text-primary">12</span>
              <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Tasks Pending</span>
            </div>
            <div className="flex flex-col px-6 py-3 bg-surface-container-high/50 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
              <span className="font-display text-xl font-bold text-secondary">08</span>
              <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Completed Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
