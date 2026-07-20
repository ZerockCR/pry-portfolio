export interface SkillGroup {
  labelKey: string
  sublabelKey: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'skills.groups.backend.label',
    sublabelKey: 'skills.groups.backend.sublabel',
    skills: ['C#', '.NET Core', 'Python', 'Flask', 'SQLAlchemy', 'SQL Server', 'MySQL', 'REST', 'SOAP', 'JWT', 'BPMN'],
  },
  {
    labelKey: 'skills.groups.frontend.label',
    sublabelKey: 'skills.groups.frontend.sublabel',
    skills: ['Vue 3', 'TypeScript', 'JavaScript'],
  },
  {
    labelKey: 'skills.groups.tools.label',
    sublabelKey: 'skills.groups.tools.sublabel',
    skills: ['Git', 'GitHub', 'Bitbucket', 'Postman', 'VS Code', 'Visual Studio'],
  },
]

// Index boundary: skills before this index in the Backend group get weight 500
export const BACKEND_CORE_COUNT = 4
