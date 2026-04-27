import React from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  Hash, 
  FolderIcon, 
  Settings, 
  ChevronLeft,
  Pin,
  Clock,
  Sparkles,
  Archive,
  User,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Folder } from '../types';

interface SidebarProps {
  activeFolder: string;
  onFolderSelect: (folder: any) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onNewNote: () => void;
}

export default function Sidebar({ activeFolder, onFolderSelect, isCollapsed, setIsCollapsed, onNewNote }: SidebarProps) {
  const folders: { name: Folder; icon: any }[] = [
    { name: 'All', icon: LayoutGrid },
    { name: 'Drafts', icon: Clock },
    { name: 'Personal', icon: User },
    { name: 'Work', icon: Sparkles },
    { name: 'Archive', icon: Archive },
  ];

  const tags = ['Ideas', 'Design', 'Development', 'Product', 'Meeting'];

  return (
    <div 
      className={cn(
        "glass-dark h-screen border-r border-white/5 flex flex-col note-transition",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SmartNotes</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* New Note Button */}
      <div className="px-4 mb-6">
        <button 
          onClick={onNewNote}
          className={cn(
            "w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 py-3 flex items-center justify-center gap-2 note-transition active:scale-95 group",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 note-transition" />
          {!isCollapsed && <span className="font-medium">New Note</span>}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 space-y-8 scrollbar-hide">
        {/* Folders */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Workspace</p>
          )}
          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => onFolderSelect(folder.name)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg note-transition group",
                activeFolder === folder.name 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <folder.icon className={cn("w-4 h-4", activeFolder === folder.name ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
              {!isCollapsed && <span className="text-sm font-medium">{folder.name}</span>}
            </button>
          ))}
        </div>

        {/* Tags */}
        {!isCollapsed && (
          <div className="space-y-1">
            <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tags</p>
            {tags.map((tag) => (
              <button
                key={tag}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-slate-400 hover:text-slate-200 rounded-lg note-transition group"
              >
                <Hash className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                <span className="text-sm">{tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg note-transition"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
          {!isCollapsed && <span className="text-sm">Collapse sidebar</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg note-transition mt-1">
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </button>
      </div>
    </div>
  );
}
