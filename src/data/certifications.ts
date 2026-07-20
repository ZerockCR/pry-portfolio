export interface Certification {
  name: string
  issuer: string
  dateKey: string
}

export const certifications: Certification[] = [
  {
    name: 'Scrum Master',
    issuer: 'Certiprof',
    dateKey: 'certifications.scrum.date',
  },
  {
    name: 'AuraQuantic Certificaciones',
    issuer: 'AuraQuantic',
    dateKey: 'certifications.auraquantic.date',
  },
  {
    name: 'Cisco CCNA',
    issuer: 'Academia de Tecnología UCR',
    dateKey: 'certifications.ccna.date',
  },
  {
    name: 'Cisco IT Essentials',
    issuer: 'Academia de Tecnología UCR',
    dateKey: 'certifications.itessentials.date',
  },
]
