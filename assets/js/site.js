(function(){
  'use strict';
  document.documentElement.classList.add('js');
  const site=window.GODS_CONTENT||{people:[],publications:{group:[],related:[]},events:[],resources:[],group:{}};
  const byId=id=>document.getElementById(id);
  const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl=u=>{try{let x=new URL(String(u),document.baseURI);return ['https:','http:','mailto:'].includes(x.protocol)?x.href:''}catch{return ''}};
  const safeImage=u=>/^assets\/images\/[a-z0-9_./-]+$/i.test(String(u||''))?String(u):safeUrl(u);
  const ext=(url,text)=>{const u=safeUrl(url);return u?`<a href="${safe(u)}" target="_blank" rel="noopener noreferrer">${safe(text)} ↗</a>`:''};
  const empty=(title,description)=>`<div class="empty-state"><h3>${safe(title)}</h3><p>${safe(description)}</p></div>`;
  const dateOnly=s=>{if(!/^\d{4}-\d\d-\d\d$/.test(String(s)))return null;let d=new Date(s+'T12:00:00Z');return Number.isNaN(d.getTime())?null:d};
  const prettyDate=s=>{let d=dateOnly(s);return d?d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}):String(s||'')};

  const nav=byId('primary-nav'),toggle=byId('nav-toggle');
  if(nav&&toggle){
    toggle.addEventListener('click',()=>{const on=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(on));toggle.setAttribute('aria-label',on?'Close menu':'Open menu')});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}});
  }
  const io=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{rootMargin:'0px 0px -45px 0px',threshold:.07}):null;
  document.querySelectorAll('.reveal').forEach(n=>{if(io)io.observe(n);else n.classList.add('visible')});

  // Footer copyright is refreshed locally without requiring deployment changes.
  const yr=byId('current-year'); if(yr)yr.textContent=new Date().getFullYear();
  // Editable contact information is drawn from content.js.
  document.querySelectorAll('[data-contact-email]').forEach(el=>{let email=String(site.group?.email||'').trim();if(email&&/^\S+@\S+\.\S+$/.test(email)){let a=document.createElement('a');a.href='mailto:'+email;a.textContent=email;el.replaceChildren(a)}else{el.textContent='Contact details will be announced here.'}});
  document.querySelectorAll('[data-github-link]').forEach(el=>{let u=safeUrl(site.group?.github);if(u){el.setAttribute('href',u);el.style.display='inline-flex'}else el.remove()});

  function setupPublications(){
    const list=byId('publications-list');if(!list)return;
    const search=byId('publication-search'),year=byId('publication-year'),count=byId('publication-count');
    const tabs=[...document.querySelectorAll('[data-publication-tab]')];
    let active=location.hash==='#related'?'related':'group';
    let items=Array.isArray(site.publications?.[active])?site.publications[active]:[];
    function updateYears(){items=Array.isArray(site.publications?.[active])?site.publications[active]:[];
      const years=[...new Set(items.map(i=>Number(i.year)).filter(Number.isFinite))].sort((a,b)=>b-a);
      let current=year.value;year.innerHTML='<option value="">All years</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('');
      if(years.includes(Number(current)))year.value=current;
    }
    function render(){
      tabs.forEach(t=>{let on=t.dataset.publicationTab===active;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
      let q=(search?.value||'').trim().toLowerCase(),y=year?.value||'';
      let rows=items.filter(p=>(!y||String(p.year)===y)&&(!q||[p.title,p.authors,p.journal,p.year].join(' ').toLowerCase().includes(q))).sort((a,b)=>Number(b.year)-Number(a.year));
      count.textContent=`${rows.length} ${rows.length===1?'publication':'publications'}`;
      if(!rows.length){list.innerHTML=empty(q||y?'No matching publications.':'The publication archive is being prepared.',q||y?'Try changing your search or year filter.':'Published records, journal references and DOIs will be listed here as the group bibliography is finalized.');return}
      list.innerHTML='<ol class="pub-list">'+rows.map(p=>`<li class="pub-entry"><div class="pub-year">${safe(p.year)}</div><div><h3>${safe(p.title)}</h3><p>${safe(p.authors)}</p><p><i>${safe(p.journal)}</i></p><div class="pub-links">${ext(p.doi,'DOI')}${ext(p.arxiv,'arXiv')}${ext(p.pdf,'PDF')}</div></div><div class="pub-kind">${active==='group'?'Group research':'Related work'}</div></li>`).join('')+'</ol>';
    }
    tabs.forEach(tab=>tab.addEventListener('click',()=>{active=tab.dataset.publicationTab;history.replaceState(null,'',active==='related'?'#related':'#group');updateYears();render()}));
    search.addEventListener('input',render);year.addEventListener('change',render);updateYears();render();
  }
  // Render the people directory. Profiles are edited in content.js.
  function setupPeople() {
    const slot = byId('principal-investigator');
    if (!slot) return;

    const people = Array.isArray(site.people) ? site.people : [];
    const lead = people.find(person => person.group === 'Leadership');

    function initials(name) {
      const words = String(name || '').trim().split(/\s+/).filter(Boolean);
      return ((words[0] || 'G')[0] + (words[words.length - 1] || 'M')[0]).toUpperCase();
    }

    // A monogram remains visible if an image has not yet been uploaded.
    function portrait(person, isLeader) {
      const path = person.image ? safeImage(person.image) : '';
      const monogram = isLeader
        ? `<span class="person-monogram" aria-hidden="true">${safe(initials(person.name))}</span>`
        : `<span class="member-monogram" aria-hidden="true">${safe(initials(person.name))}</span>`;
      const photo = path
        ? `<img class="person-photo" src="${safe(path)}" alt="Portrait of ${safe(person.name)}" loading="lazy">`
        : '';

      return isLeader
        ? `<div class="person-picture">${monogram}${photo}</div>`
        : `<div class="member-portrait">${monogram}${photo}</div>`;
    }

    function emailText(address) {
        const email = String(address || '').trim();
        if (!email) return '';

        return `<span class="person-email">${safe(email)}</span>`;
    }

    function profileLinks(person, leader) {
      const links = leader
        ? [
            ext(person.website || person.url, 'Personal website'),
            ext(person.orcid, 'ORCID'),
            ext(person.lattes, 'Lattes'),
            emailText(person.email)
          ]
        : [
            ext(person.orcid, 'ORCID'),
            ext(person.lattes, 'Lattes'),
            emailText(person.email)
        ];

      const visibleLinks = links.filter(Boolean);
      return visibleLinks.length
        ? `<div class="person-links${leader ? '' : ' member-links'}">${visibleLinks.join('')}</div>`
        : '';
    }

    if (lead) {
      slot.innerHTML = `
        <article class="person-feature">
          ${portrait(lead, true)}
          <div class="person-content">
            <div class="role">${safe(lead.role)}</div>
            <h3 class="display">${safe(lead.name)}</h3>
            <div class="text-label">${safe(lead.affiliation)}</div>
            ${lead.summary ? `<p>${safe(lead.summary)}</p>` : ''}
            ${profileLinks(lead, true)}
          </div>
        </article>
      `;
    } else {
      slot.innerHTML = empty(
        'Leadership profile coming soon.',
        'Leadership information will appear here.'
      );
    }

    const out = byId('team-groups');
    if (!out) return;

    // Only Researchers and Students; no Collaborators or Alumni.
    const groups = [
      ['Researchers', 'Researchers'],
      ['Students', 'Students']
    ];

    function interestText(person) {
      const interests = Array.isArray(person.interests)
        ? person.interests.filter(Boolean)
        : (person.interests ? [person.interests] : []);
      return interests.length
        ? `<p class="member-interests"><strong>Research interests:</strong> ${safe(interests.join(', '))}</p>`
        : '';
    }

    out.innerHTML = groups.map(([heading, kind]) => {
      const members = people.filter(person => person.group === kind);
      const entries = members.map(person => `
        <article class="person-small">
          ${portrait(person, false)}
          <div class="member-details">
            <h4>${safe(person.name)}</h4>
            ${person.role ? `<div class="text-label">${safe(person.role)}</div>` : ''}
            ${person.affiliation ? `<p class="member-affiliation">${safe(person.affiliation)}</p>` : ''}
            ${interestText(person)}
            ${profileLinks(person, false)}
          </div>
        </article>
      `).join('');

      return `
        <section class="roster-group">
          <h3>${safe(heading)}</h3>
          ${members.length
            ? `<div class="roster-grid">${entries}</div>`
            : `<div class="blank-panel"><p>${safe(heading)} profiles will appear here as the directory is updated.</p></div>`}
        </section>
      `;
    }).join('');

    // Missing images fall back to initials rather than displaying broken icons.
    document.querySelectorAll('#main .person-photo').forEach(img => {
      img.addEventListener('error', () => img.remove());
    });
  }
  function setupData(){
    const out=byId('resources-list');if(!out)return;
    const tabs=[...document.querySelectorAll('[data-resource-tab]')];let active='all';
    const items=Array.isArray(site.resources)?site.resources:[];
    function render(){tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.resourceTab===active)));
      const rows=items.filter(x=>active==='all'||(x.kind||'').toLowerCase()===active).sort((a,b)=>Number(b.year)-Number(a.year));
      out.innerHTML=rows.length?'<div class="data-grid">'+rows.map(r=>`<article class="data-card"><div class="data-kind">${safe(r.kind)}${r.year?' / '+safe(r.year):''}</div><h3>${safe(r.title)}</h3><p>${safe(r.description)}</p>${r.citation?'<p class="small">Citation: '+safe(r.citation)+'</p>':''}${ext(r.url,'View resource')}</article>`).join('')+'</div>':empty('Open research resources will be listed here.','Datasets, numerical tools and software from the group will be linked to their repositories and documentation when released.');
    }
    tabs.forEach(t=>t.addEventListener('click',()=>{active=t.dataset.resourceTab;render()}));render();
  }
  function setupEvents(){
    const out=byId('events-list');if(!out)return;
    let active='upcoming';const tabs=[...document.querySelectorAll('[data-events-tab]')];
    const today=new Date();today.setHours(0,0,0,0);
    const events=Array.isArray(site.events)?site.events:[];
    function render(){tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.eventsTab===active)));
      const rows=events.filter(e=>{let d=dateOnly(e.endDate||e.date);return d&&(active==='upcoming'?d>=today:d<today)}).sort((a,b)=>(active==='upcoming'?1:-1)*String(a.date).localeCompare(String(b.date)));
      out.innerHTML=rows.length?'<ol class="pub-list">'+rows.map(e=>`<li class="pub-entry"><div class="pub-year">${safe(new Date(e.date+'T12:00:00Z').getUTCFullYear())}</div><div><h3>${safe(e.title)}</h3><p>${safe(prettyDate(e.date))}${e.endDate?' – '+safe(prettyDate(e.endDate)):''} &nbsp;·&nbsp; ${safe(e.location||'')}</p><p>${safe(e.description||'')}</p><div class="pub-links">${ext(e.url,'Event details')}</div></div><div class="pub-kind">${safe(e.type||'Event')}</div></li>`).join('')+'</ol>':empty(active==='upcoming'?'Upcoming events will appear here.':'The event archive is being assembled.',active==='upcoming'?'The group’s seminars, conferences, talks and other activities will be announced as dates are confirmed.':'Past meetings, scientific conferences and group activities will be listed as the record is updated.');
    }
    tabs.forEach(t=>t.addEventListener('click',()=>{active=t.dataset.eventsTab;render()}));render();
  }
  function setupHome(){const p=byId('home-news');if(!p)return;const ev=[...(site.events||[])].filter(x=>dateOnly(x.date)&&dateOnly(x.date)>=new Date()).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(0,2);if(ev.length)p.innerHTML=ev.map(e=>`<div style="padding:16px 0;border-top:1px solid #97a6ae"><div class="text-label">${safe(prettyDate(e.date))}</div><strong style="font:700 22px var(--display)">${safe(e.title)}</strong><p>${safe(e.location||'')}</p></div>`).join('');}
  setupPublications();setupPeople();setupData();setupEvents();setupHome();
})();
