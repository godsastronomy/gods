/*
  GODS — EDITABLE SCIENTIFIC CONTENT
  Update this file to add people, papers, datasets/software and events.
  Do not change the field names. Empty arrays are intentional: the website
  does not display invented publications, researchers or activities.
*/
window.GODS_CONTENT = {
  group: {
    email: '',                  // e.g. your officially designated GODS email
    github: '',                 // e.g. https://github.com/your-organization
    institutionUrl: 'https://www.gov.br/observatorio/pt-br'
  },

  people: [
    {
      name: 'Gustavo Oliveira Madeira',
      role: 'Principal Investigator',
      group: 'Leadership',
      affiliation: 'Observatório Nacional, Rio de Janeiro, Brazil',
      summary: 'Research interests include the formation and dynamical evolution of satellite systems, planetary rings, and small-body systems.',
      image: '',                // assets/images/name.webp, optional
      url: '',                  // professional profile, optional
      orcid: ''                 // https://orcid.org/..., optional
    }
    // Add members here, separating entries with commas.
  ],

  publications: {
    group: [
      /* EXAMPLE (delete the comment markers and replace ALL sample values):
      {
        title: 'Your published paper title',
        authors: 'Author A., Author B., & Author C.',
        journal: 'Journal name, volume, article number',
        year: 2026,
        doi: 'https://doi.org/10.XXXX/EXAMPLE',
        arxiv: '',
        pdf: ''
      },
      */
    ],
    related: [
      // Publications by members not produced as part of GODS research.
    ]
  },

  resources: [
    /* Example: {title:'Name of dataset', kind:'Dataset', description:'Description',
       url:'https://doi.org/...', citation:'Authors, year', year:2026} */
    /* Or: {title:'Software name', kind:'Software', description:'Description',
       url:'https://github.com/...', citation:'', year:2026} */
  ],

  events: [
    /* Example: {title:'Official event title', date:'2027-04-12',
       endDate:'2027-04-15', location:'City, Country',
       type:'Conference', description:'What the group will present or organize',
       url:'https://official-event-page.example'} */
  ]
};
