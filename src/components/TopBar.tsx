import React from 'react';
import { Search, Bell, Sun, User, Command } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TopBar() {
  return (
    <div className="h-16 border-b border-white/5 glass-dark flex items-center justify-between px-6 z-10 sticky top-0">
      {/* Spacer to help center search */}
      <div className="flex-1 hidden md:block" />

      {/* Search Bar */}
      <div className="flex-1 max-w-xl px-4 md:absolute md:left-1/2 md:-translate-x-1/2 w-full">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 note-transition" />
          <input 
            type="text" 
            placeholder="Search notes, tags, or commands..." 
            className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl py-2 pl-10 pr-12 text-sm text-slate-200 placeholder:text-slate-500 outline-none note-transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-slate-500 flex items-center gap-0.5 hidden sm:flex">
              <Command className="w-2.5 h-2.5" />
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-1 flex items-center justify-end gap-3">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg note-transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900" />
        </button>
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg note-transition">
          <Sun className="w-5 h-5" />
        </button>
        <div className="h-6 w-px bg-white/5 mx-2" />
        <button className="flex items-center gap-2 pl-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 note-transition">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white note-transition hidden sm:block">John Doe</span>
        </button>
      </div>
    </div>
  );
}
