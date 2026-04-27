import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Eye, Edit3, Maximize2, Share2, MoreHorizontal, Save, Sparkles } from 'lucide-react';
import { Note } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface WorkspaceProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Note>) => void;
}

export default function Workspace({ note, onUpdate }: WorkspaceProps) {
  const [viewMode, setViewMode] = useState<'both' | 'edit' | 'preview'>('both');

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-transparent">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="relative w-48 h-48 mx-auto bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-3xl shadow-2xl">
              <Sparkles className="w-20 h-20 text-indigo-400 opacity-80" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No note selected</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Choose a note from the sidebar or select a folder to start your intelligent writing journey.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 px-8 py-3 rounded-xl font-medium note-transition flex items-center gap-2 mx-auto active:scale-95 group">
            <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Create New Note
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/10">
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('edit')}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium note-transition flex items-center gap-2",
                viewMode === 'edit' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button 
              onClick={() => setViewMode('both')}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium note-transition flex items-center gap-2",
                viewMode === 'both' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Split
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium note-transition flex items-center gap-2",
                viewMode === 'preview' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>
          <div className="h-4 w-px bg-white/5" />
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <Save className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-[11px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-lg note-transition flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Smart Summary
          </button>
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 note-transition">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 note-transition">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="px-10 py-6 border-b border-white/5">
        <input 
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          placeholder="Note Title"
          className="w-full bg-transparent border-none outline-none text-4xl font-bold text-white placeholder:text-slate-800"
        />
        <div className="flex gap-2 mt-4">
          {note.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-indigo-400 note-transition cursor-pointer">
              #{tag}
            </span>
          ))}
          <button className="text-[10px] text-slate-600 hover:text-slate-400">+ Add tag</button>
        </div>
      </div>

      {/* Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        {(viewMode === 'edit' || viewMode === 'both') && (
          <div className="flex-1 overflow-y-auto px-10 py-8 border-r border-white/5">
            <textarea 
              value={note.content}
              onChange={(e) => onUpdate(note.id, { content: e.target.value })}
              className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-slate-300 leading-relaxed placeholder:text-slate-800 scrollbar-hide"
              placeholder="Start writing in markdown..."
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === 'preview' || viewMode === 'both') && (
          <div className="flex-1 overflow-y-auto px-10 py-8 bg-black/5">
            <div className="markdown-body">
              <ReactMarkdown>{note.content || "*No content to preview*"}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
