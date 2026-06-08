import { LeadApiModel } from '../../../core/models/lead-api.model';
import { Lead } from '../models/lead.model';

const getLeadName = (model: LeadApiModel): string => model.nome || 'Sem nome';
const getLeadProject = (model: LeadApiModel): string => model.tituloProjeto || 'Projeto desconhecido';
const getLeadEmail = (model: LeadApiModel): string => model.email || 'Email não informado';
const getLeadModalidade = (model: LeadApiModel): string => model.modalidadePretendida || 'Modalidade não informada';
const getLeadSeriePeriodo = (model: LeadApiModel): string => model.seriePeriodo || 'Série/Período não informado';

export const toLead = (model: LeadApiModel): Lead => ({
  id: model.id,
  nome: getLeadName(model),
  tituloProjeto: getLeadProject(model),
  email: getLeadEmail(model),
  modalidadePretendida: getLeadModalidade(model),
  seriePeriodo: getLeadSeriePeriodo(model),
});

export const toLeads = (models: LeadApiModel[]): Lead[] => models.map(toLead);
