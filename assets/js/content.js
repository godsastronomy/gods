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
      name: 'Gustavo Madeira',
      role: 'Principal Investigator',
      group: 'Leadership',
      affiliation: 'Observatório Nacional, Rio de Janeiro, Brazil',
      summary: 'His research focuses on the formation and dynamics of satellites, planetary rings, and small bodies, primarily through numerical simulations. He contributed to NASA’s DART mission and is a member of ESA’s Hera and RAMSES missions.',

      // Save your portrait at this path to display it automatically.
      image: 'assets/images/gustavo.png',

      // Fill in your links below. Leave blank to hide a link.
      website: 'https://gusmadeira.github.io/index.html',              // https://your-personal-website.example
      orcid: 'https://orcid.org/0000-0001-5138-230X',                // https://orcid.org/0000-0000-0000-0000
      lattes: 'http://lattes.cnpq.br/2751228869487751',               // http://lattes.cnpq.br/...
      email: 'madeira@on.br'       // Change if you prefer a different contact address
    }

    ,{
      name: 'Full Name',
      role: 'Researcher',       // Or: Master's Student, PhD Student, etc.
      group: 'Researchers',    // Or: 'Students'
      affiliation: 'University or institute, City, Country',
      interests: [
        'Satellite formation',
        'Orbital dynamics'
      ],
      image: 'assets/images/full-name.webp',
      orcid: 'https://orcid.org/0000-0000-0000-0000',
      lattes: 'http://lattes.cnpq.br/...',               // http://lattes.cnpq.br/...
      email: 'email@email.com'  
    }    
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
