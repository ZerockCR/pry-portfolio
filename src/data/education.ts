export interface EducationEntry {
  degreeKey: string
  institution: string
  location: string
  periodKey: string
  current: boolean
}

export const education: EducationEntry[] = [
  {
    degreeKey: 'education.fidelitas.degree',
    institution: 'Universidad Fidélitas',
    location: 'San José, Costa Rica',
    periodKey: 'education.fidelitas.period',
    current: true,
  },
  {
    degreeKey: 'education.uaca.degree',
    institution: 'Universidad Americana de Costa Rica',
    location: 'San José, Costa Rica',
    periodKey: 'education.uaca.period',
    current: false,
  },
]
