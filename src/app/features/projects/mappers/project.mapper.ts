import { ProjectApiModel } from '../../../core/models/project-api.model';
import { Project, ProjectStatus } from '../models/project.model';

const normalizeStatus = (status: string): ProjectStatus => {
  const normalized = status?.toString().toLowerCase?.().trim();

  switch (normalized) {
    case 'pending':
    case 'pendente':
      return 'pending';
    case 'in_progress':
    case 'em progresso':
    case 'em andamento':
    case 'edicao':
    case 'edição':
      return 'in_progress';
    case 'done':
    case 'publicado':
      return 'done';
    case 'archived':
    case 'encerrado':
      return 'archived';
    default:
      return 'pending';
  }
};

const getProjectName = (model: ProjectApiModel): string => {
  return model.title || model.titulo || 'Projeto sem nome';
};

const getProjectDescription = (model: ProjectApiModel): string => {
  return model.description || model.descricao || 'Sem descrição';
};

export const toProject = (model: ProjectApiModel): Project => ({
  id: model.id,
  name: getProjectName(model),
  description: getProjectDescription(model),
  status: normalizeStatus(model.status),
    tipo: model.tipo,
  modalidade: model.modalidade,
  vagas: model.vagas,
  startDate: model.startDate ?? null,
  endDate: model.endDate ?? null,
  statusModeracao: model.statusModeracao
});

export const toProjects = (models: ProjectApiModel[]): Project[] => models.map(toProject);
