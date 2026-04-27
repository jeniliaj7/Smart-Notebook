export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: number;
  isPinned: boolean;
  folder?: string;
}

export type Folder = 'All' | 'Drafts' | 'Personal' | 'Work' | 'Archive';
