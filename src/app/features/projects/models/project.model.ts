export type ProjectStatus = 'pending' | 'in_progress' | 'done' | 'archived';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;

  tipo: string;
  modalidade: string;
  vagas: number;
  
  startDate: string | null;
  endDate: string | null;
  statusModeracao: string;
}
