import { motion } from 'motion/react';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAFYBNWWvyhm0haJYSvWRd_fubnveW6URjrvPNbLx-ynTtQrQYIKQCUCe3k-V_mUB4LEUgrIo_JoySSKdNM85Clzv32_svKu8gcBKTr6GTQpD9xWPcU_hsCm1-c6sNuYSQzy2BciBlWZ1BE-S5xs0zAtyiLoiAHQK6rkP64wkdo6T4nzi-LOQqYN2EqqaZedX22R60mF97PJEQONPsHbV3nhJPiWf1zKukwOXQwfZJL2zWxQV__odII-rkZqxys9rD8lDO_O4SE70" 
        alt="Background" 
        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface" />
      
      {/* Decorative neon streaks */}
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-0 w-[800px] h-[1px] bg-primary-container/20 blur-[2px] -rotate-12"
      />
      <motion.div 
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute top-1/2 left-0 w-[600px] h-[1px] bg-secondary-container/20 blur-[2px] rotate-12"
      />
    </div>
  );
}
