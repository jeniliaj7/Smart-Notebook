import React from 'react';
import { format } from 'date-fns';
import { Pin, Hash, Clock } from 'lucide-react';
import { Note } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
}

export default function NoteList({ notes, selectedNoteId, onNoteSelect }: NoteListProps) {
  return (
    <div className="w-80 border-r border-white/5 flex flex-col bg-black/20">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Most Recent</h2>
        <span className="text-[10px] text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">{notes.length}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="p-2 space-y-1">
          <AnimatePresence initial={false}>
            {notes.map((note) => (
              <motion.button
                key={note.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onNoteSelect(note.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl note-transition group relative overflow-hidden",
                  selectedNoteId === note.id 
                    ? "glass bg-white/10 shadow-xl shadow-indigo-500/10" 
                    : "hover:bg-white/5"
                )}
              >
                {/* Active Indicator */}
                {selectedNoteId === note.id && (
                  <motion.div 
                    layoutId="active-note"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-500 rounded-full"
                  />
                )}

                <div className="flex items-start justify-between mb-1">
                  <h3 className={cn(
                    "text-sm font-semibold truncate pr-4",
                    selectedNoteId === note.id ? "text-white" : "text-slate-300 group-hover:text-white"
                  )}>
                    {note.title || "Untitled Note"}
                  </h3>
                  {note.isPinned && (
                    <Pin className="w-3 h-3 text-indigo-400 rotate-45" />
                  )}
                </div>
                
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                  {note.content || "Empty content..."}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] bg-white/5 px-1.5 py-0.5 rounded-md text-slate-400 border border-white/5">
                        <Hash className="w-2.5 h-2.5 text-indigo-500/70" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Clock className="w-2.5 h-2.5" />
                    {format(note.lastEdited, 'MMM d')}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
