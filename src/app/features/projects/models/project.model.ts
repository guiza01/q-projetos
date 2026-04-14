export type ProjectStatus = 'pending' | 'in_progress' | 'done' | 'archived';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
}
