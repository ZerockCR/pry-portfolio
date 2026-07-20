export interface ExperienceEntry {
  company: string
  location: string
  roleKey: string
  periodKey: string
  current: boolean
  bulletsKey: string
}

export const experience: ExperienceEntry[] = [
  {
    company: 'GPG — Global Professional Group',
    location: 'San José, Costa Rica',
    roleKey: 'experience.gpg_lead.role',
    periodKey: 'experience.gpg_lead.period',
    current: true,
    bulletsKey: 'experience.gpg_lead.bullets',
  },
  {
    company: 'GPG — Global Professional Group',
    location: 'San José, Costa Rica',
    roleKey: 'experience.gpg_backend.role',
    periodKey: 'experience.gpg_backend.period',
    current: false,
    bulletsKey: 'experience.gpg_backend.bullets',
  },
]
