import { ProjectApiModel } from '../../../core/models/project-api.model';
import { Project, ProjectStatus } from '../models/project.model';

const normalizeStatus = (status: string): ProjectStatus => {
  if (status === 'pending' || status === 'in_progress' || status === 'done' || status === 'archived') {
    return status;
  }

  return 'pending';
};

export const toProject = (model: ProjectApiModel): Project => ({
  id: model.id,
  name: model.title,
  description: model.description,
  status: normalizeStatus(model.status),
  startDate: model.startDate,
  endDate: model.endDate,
});

export const toProjects = (models: ProjectApiModel[]): Project[] => models.map(toProject);
