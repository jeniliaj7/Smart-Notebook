/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import NoteList from './components/NoteList';
import Workspace from './components/Workspace';
import { Note, Folder } from './types';
import { Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Welcome to SmartNotes 🚀',
    content: '# Welcome to SmartNotes\n\nSmartNotes is a premium, modern markdown note-taking platform designed for professionals. \n\n### Key Features:\n- **Glassmorphism UI**: Beautifully blurred interfaces.\n- **Live Preview**: See your changes in real-time.\n- **Intelligent Organization**: Tag-based filtering and folder management.\n\n```javascript\n// Intelligent note-taking\nconst note = new IntelligentNote();\nnote.think();\n```\n\n> "The best way to predict the future is to create it." - Peter Drucker',
    tags: ['Product', 'Personal'],
    lastEdited: Date.now(),
    isPinned: true,
    folder: 'Personal'
  },
  {
    id: '2',
    title: 'Q2 Product Roadmap',
    content: '## Goals for Q2\n- Finish the new editor UI\n- Integrate Gemini AI for smart summaries\n- Add collaborative editing support\n\n---\n\n### Milestones\n1. [ ] UI Refresh\n2. [ ] Performance Audit\n3. [ ] Beta Testing',
    tags: ['Work', 'Product'],
    lastEdited: Date.now() - 1000 * 60 * 60 * 24,
    isPinned: false,
    folder: 'Work'
  },
  {
    id: '3',
    title: 'Creative Writing Ideas',
    content: 'Think about a world where notes are alive. \n\n- They move around the page\n- They react to your mood\n- They summarize themselves every morning',
    tags: ['Ideas'],
    lastEdited: Date.now() - 1000 * 60 * 60 * 48,
    isPinned: false,
    folder: 'Personal'
  }
];

export default function App() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeFolder, setActiveFolder] = useState<Folder>('All');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0].id);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredNotes = useMemo(() => {
    if (activeFolder === 'All') return notes;
    return notes.filter(n => n.folder === activeFolder);
  }, [notes, activeFolder]);

  const selectedNote = useMemo(() => {
    return notes.find(n => n.id === selectedNoteId) || null;
  }, [notes, selectedNoteId]);

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, lastEdited: Date.now() } : n));
    if (updates.content || updates.title) {
       // Debounced toast would be better, but for demo:
       // showToast('Changes saved');
    }
  };

  const createNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      content: '',
      tags: [],
      lastEdited: Date.now(),
      isPinned: false,
      folder: activeFolder === 'All' ? 'Drafts' : activeFolder
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    showToast('New note created');
  };

  return (
    <div className="flex h-screen w-full premium-gradient overflow-hidden">
      <Sidebar 
        activeFolder={activeFolder} 
        onFolderSelect={setActiveFolder}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onNewNote={createNote}
      />
      
      <main className="flex-1 flex flex-col min-w-0 bg-transparent">
        <TopBar />
        
        <div className="flex-1 flex overflow-hidden">
          <NoteList 
            notes={filteredNotes} 
            selectedNoteId={selectedNoteId} 
            onNoteSelect={setSelectedNoteId} 
          />
          
          <Workspace 
            note={selectedNote} 
            onUpdate={updateNote} 
          />
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl shadow-2xl z-[60] flex items-center gap-3 border-indigo-500/30"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-white">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Mobile / Quick Access */}
      <AnimatePresence>
        {!selectedNoteId && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={createNote}
            className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-600/40 flex items-center justify-center hover:bg-indigo-500 hover:scale-110 active:scale-95 note-transition z-50 md:hidden"
          >
            <Plus className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}

