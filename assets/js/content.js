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
      {
        title: 'Disruption Limits Around Triaxial Bodies and Implications for Ring-bearing Minor Bodies',
        authors: 'G. Madeira & T.F.L.L. Pinheiro',
        journal: 'The Planetary Science Journal',
        year: 2026,
        doi: 'https://doi.org/10.3847/PSJ/aebd8d',
        arxiv: 'https://arxiv.org/abs/2611.04800'
      },
      {
        title: 'Decoding transit variations: disentangling satellites from planets through numerical modulation',
        authors: 'T.F.L.L. Pinheiro, B. Morgado, G. Madeira, L. Esteves, J.I.B. Camargo, & F. Roig',
        journal: 'Monthly Notices of the Royal Astronomical Society, 548(4), stag761',
        year: 2026,
        doi: 'https://doi.org/10.1093/mnras/stag761',
        arxiv: 'https://doi.org/10.1093/mnras/stag761'
      },
      {
        title: 'Do self-gravitating hard-sphere disk simulations form Darwin ellipsoids?',
        authors: 'G. Madeira, L. Esteves & T.F.L.L. Pinheiro',
        journal: 'The European Physical Journal Special Topics, 234(25), 7787-7798',
        year: 2026,
        doi: 'https://doi.org/10.1140/epjs/s11734-025-01985-2',
        arxiv: 'https://doi.org/10.1140/epjs/s11734-025-01985-2'
      },
      {
        title: 'On the formation of satellites in dense solid-particle disks',
        authors: 'G. Madeira, L. Esteves, T.F.L.L. Pinheiro, P.V.S. Soares, N.S. Santos & B. Morgado',
        journal: 'Planetary and Space Science, 106168',
        year: 2025,
        doi: 'https://doi.org/10.1016/j.pss.2025.106168',
        arxiv: 'https://arxiv.org/abs/2507.04954'
      },
    ],
    related: [
      {
        title: 'Dynamical implications of the recently detected feature around Quaoar and constraints on the presence of additional satellites',
        authors: 'G. Madeira, L. Esteves, B.E. Morgado, P.V.S. Soares, S.M. Giuliatti Winter, O.C. Winter & B.S. Chagas',
        journal: 'The Planetary Science Journal, 7(7), 168',
        year: 2026,
        doi: 'https://doi.org/10.3847/PSJ/ae81a8',
        arxiv: 'https://arxiv.org/abs/2606.23850'
      }, 
      {
        title: 'Dynamical Environment and Stability around Centaur (2060) Chiron',
        authors: 'G. Madeira, B.E. Morgado, C.L. Pereira, G. Ramon, R. Sfair, F. Braga-Ribas',
        journal: 'The Astrophysical Journal, 994(2), 268',
        year: 2025,
        doi: 'https://doi.org/10.3847/1538-4357/ae169e',
        arxiv: 'https://arxiv.org/abs/2510.20693'
      }, 
    ],
    presentations: [
    {
        title: 'On the formation of satellites in dense solid-particle disks',
        presenters: 'G. Madeira',
        conference: 'Friends of Friends meeting 2026',
        location: 'Cordoba, Argentina',
        year: 2026,
        date: 'April 9, 2026',
        type: 'Oral presentation',
        url: 'https://fof.oac.uncor.edu/2026/',
        pdf: 'assets/talk/FOF_presentation.pdf'
    }
    ]
  },

  resources: [
  ],

  events: [
    /* Example: {title:'Official event title', date:'2027-04-12',
       endDate:'2027-04-15', location:'City, Country',
       type:'Conference', description:'What the group will present or organize',
       url:'https://official-event-page.example'} */
  ]
};
