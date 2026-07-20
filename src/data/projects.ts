export interface CaseStudyFigure {
  kind: 'diagram-pipeline' | 'diagram-firma' | 'image'
  src?: string
  altKey?: string
  captionKey: string
}

export interface CaseStudyParagraph {
  textKey: string
  figures?: CaseStudyFigure[]
}

export interface CaseStudySubBlock {
  headingKey: string
  paragraphs: CaseStudyParagraph[]
}

export interface CaseStudySection {
  headingKey: string
  figure?: CaseStudyFigure
  paragraphs?: CaseStudyParagraph[]
  subBlocks?: CaseStudySubBlock[]
  closingParagraphs?: CaseStudyParagraph[]
  /** Folds this section into the previous one's entry in the sticky nav rail. */
  mergeNavWithPrevious?: boolean
  /** Overrides the merged nav entry's label (otherwise headings are concatenated). */
  navLabelKey?: string
}

export interface StatItem {
  value: string
  labelKey: string
}

export interface ClosingCardData {
  statusLabelKey: string
  /** Translated headline, e.g. a stat summary. Takes priority over `headline`. */
  headlineKey?: string
  /** Literal, language-agnostic headline (e.g. a URL). */
  headline?: string
  noteKey?: string
  liveUrl?: string
}

export interface Project {
  slug: string
  title: string
  taglineKey: string
  yearKey: string
  stack: string[]
  tagsKey: string
  descriptionKey: string
  image: string | null
  featured: boolean
  /** Portada card treatment. Defaults to image (if set), else dark/light by `featured`. */
  cardVariant?: 'image' | 'dark' | 'light'
  caseTitleKey?: string
  caseTaglineKey?: string
  heroStats?: StatItem[]
  heroCard?: ClosingCardData
  resultCard?: ClosingCardData
  caseStudy?: CaseStudySection[]
}

export const projects: Project[] = [
  {
    slug: 'zonas-francas',
    title: 'Zonas Francas',
    taglineKey: 'projects.zonas_francas.tagline',
    yearKey: 'projects.zonas_francas.year',
    stack: ['C#', '.NET', 'SQL Server', 'SOAP', 'REST', 'plataforma BPMN'],
    tagsKey: 'projects.zonas_francas.tags',
    descriptionKey: 'projects.zonas_francas.description',
    image: null,
    featured: true,
    cardVariant: 'dark',
    caseTitleKey: 'projects.zonas_francas.caseTitle',
    caseTaglineKey: 'projects.zonas_francas.caseTagline',
    heroStats: [
      { value: '1000+', labelKey: 'projects.zonas_francas.heroStats.companies' },
      { value: '~100', labelKey: 'projects.zonas_francas.heroStats.dailyFilings' },
      { value: '10', labelKey: 'projects.zonas_francas.heroStats.filingTypes' },
    ],
    resultCard: {
      statusLabelKey: 'projects.zonas_francas.resultCard.statusLabel',
      headlineKey: 'projects.zonas_francas.resultCard.headline',
      noteKey: 'projects.zonas_francas.resultCard.note',
    },
    caseStudy: [
      {
        headingKey: 'projects.zonas_francas.case.problem.heading',
        paragraphs: [{ textKey: 'projects.zonas_francas.case.problem.p1' }],
      },
      {
        headingKey: 'projects.zonas_francas.case.decision.heading',
        paragraphs: [{ textKey: 'projects.zonas_francas.case.decision.p1' }],
      },
      {
        headingKey: 'projects.zonas_francas.case.challenges.heading',
        figure: { kind: 'diagram-pipeline', captionKey: 'diagrams.pipeline.caption' },
        subBlocks: [
          {
            headingKey: 'projects.zonas_francas.case.challenges.firma.heading',
            paragraphs: [
              {
                textKey: 'projects.zonas_francas.case.challenges.firma.p1',
                figures: [{ kind: 'diagram-firma', captionKey: 'diagrams.firma.caption' }],
              },
            ],
          },
          {
            headingKey: 'projects.zonas_francas.case.challenges.integration.heading',
            paragraphs: [{ textKey: 'projects.zonas_francas.case.challenges.integration.p1' }],
          },
        ],
        closingParagraphs: [{ textKey: 'projects.zonas_francas.case.challenges.closingP1' }],
      },
      {
        headingKey: 'projects.zonas_francas.case.role.heading',
        paragraphs: [{ textKey: 'projects.zonas_francas.case.role.p1' }],
      },
      {
        headingKey: 'projects.zonas_francas.case.result.heading',
        paragraphs: [{ textKey: 'projects.zonas_francas.case.result.p1' }],
      },
    ],
  },
  {
    slug: 'horizontes-salvajes',
    title: 'Horizontes Salvajes CR',
    taglineKey: 'projects.horizontes.tagline',
    yearKey: 'projects.horizontes.year',
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL 8', 'JWT', 'HTML', 'Bootstrap 5', 'JavaScript'],
    tagsKey: 'projects.horizontes.tags',
    descriptionKey: 'projects.horizontes.description',
    image: '/images/portadahorisalvajecr.webp',
    featured: false,
    cardVariant: 'dark',
    heroCard: {
      statusLabelKey: 'projects.horizontes.heroCard.statusLabel',
      headline: 'https://horizontesalvajecr.com/',
      liveUrl: 'https://horizontesalvajecr.com/',
    },
    caseStudy: [
      {
        headingKey: 'projects.horizontes.case.problem.heading',
        paragraphs: [{ textKey: 'projects.horizontes.case.problem.p1' }],
      },
      {
        headingKey: 'projects.horizontes.case.decision.heading',
        paragraphs: [{ textKey: 'projects.horizontes.case.decision.p1' }],
      },
      {
        headingKey: 'projects.horizontes.case.built.heading',
        paragraphs: [
          {
            textKey: 'projects.horizontes.case.built.p1',
            figures: [
              {
                kind: 'image',
                captionKey: 'projects.horizontes.case.built.figure1Caption',
                src: '/assets/projects/horizontes/detalle-destino.png',
                altKey: 'projects.horizontes.case.built.figure1Alt',
              },
            ],
          },
          {
            textKey: 'projects.horizontes.case.built.p2',
            figures: [
              {
                kind: 'image',
                captionKey: 'projects.horizontes.case.built.figure2Caption',
                src: '/assets/projects/horizontes/clima-en-vivo.png',
                altKey: 'projects.horizontes.case.built.figure2Alt',
              },
              {
                kind: 'image',
                captionKey: 'projects.horizontes.case.built.figure3Caption',
                src: '/assets/projects/horizontes/mareas-normalizadas.png',
                altKey: 'projects.horizontes.case.built.figure3Alt',
              },
            ],
          },
        ],
      },
      {
        headingKey: 'projects.horizontes.case.result.heading',
        paragraphs: [{ textKey: 'projects.horizontes.case.result.p1' }],
      },
      {
        headingKey: 'projects.horizontes.case.lesson.heading',
        mergeNavWithPrevious: true,
        navLabelKey: 'projects.horizontes.case.lesson.navLabel',
        paragraphs: [{ textKey: 'projects.horizontes.case.lesson.p1' }],
      },
    ],
  },
]
