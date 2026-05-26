import { Project } from '../models/project.model';

export const visitorMockProjects: Project[] = [
  {
    id: 1,
    name: 'Projeto de Extensão Social',
    description: 'Desenvolver ações comunitárias e apoiar iniciativas sociais com engajamento estudantil.',
    status: 'pending',
    startDate: '2026-06-10',
    endDate: '2026-11-20',
  },
  {
    id: 2,
    name: 'Pesquisa em Energias Renováveis',
    description: 'Análise de soluções sustentáveis para reduzir o consumo de energia no campus.',
    status: 'in_progress',
    startDate: '2026-05-01',
    endDate: '2026-12-15',
  },
  {
    id: 3,
    name: 'Aplicativo de Gestão de Eventos',
    description: 'Criar uma plataforma mobile para divulgar eventos acadêmicos e facilitar inscrições.',
    status: 'done',
    startDate: '2026-01-20',
    endDate: '2026-04-30',
  },
  {
    id: 4,
    name: 'Estudo de Acessibilidade Web',
    description: 'Avaliar e melhorar a experiência de uso de plataformas digitais para pessoas com deficiência.',
    status: 'archived',
    startDate: '2025-09-15',
    endDate: '2025-12-01',
  },
  {
    id: 5,
    name: 'Lab de Tecnologia Educacional',
    description: 'Implementar ferramentas interativas para aprimorar o ensino híbrido e colaborativo.',
    status: 'pending',
    startDate: '2026-07-05',
    endDate: null,
  },
];
