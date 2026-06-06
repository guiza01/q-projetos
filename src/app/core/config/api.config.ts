import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiBaseUrl,
  projectsPath: '/projects',
  timeoutMs: 15000,
};
