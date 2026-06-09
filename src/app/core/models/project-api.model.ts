export interface ProjectApiModel {
  id: number;
  title?: string;
  description?: string;
  titulo?: string;
  descricao?: string;
  tipo: string;
  modalidade: string;
  vagas: number;
  status: string;
  statusModeracao: string; 
  startDate?: string | null;
  endDate?: string | null;
}
