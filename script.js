// theme
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    themeBtn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
  });
}

// year + print
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('printBtn').addEventListener('click', () => window.print());

// ==================== PROJETOS ====================
const projects = [
  // — Prioridade para prender atenção do recrutador —
  {
    title: 'Spotify Edit (UI clone)',
    img: 'img/spotfy.png',
    desc: 'Recriação visual inspirada no Spotify Web. Foco em fidelidade de design e responsividade.',
    tags: ['html','css','js'],
    links: { repo:'https://github.com/LU1SED/Spotfy-Edit', demo:'' }
  },
  {
    title: 'Previsão do Tempo',
    img: 'img/tempo.png',
    desc: 'Aplicação de clima com consumo de API pública, exibição dinâmica e UI moderna.',
    tags: ['js','api'],
    links: { repo:'https://github.com/LU1SED/Previs-o-do-tempo', demo:'' }
  },

  // — Seus estudos já existentes (padronizados para ler de /img quando for arquivo local) —
  {
    title: 'Landing Starbucks (estudo)',
    img: 'img/Projeto.png', // se o arquivo existir localmente; ajuste o nome se necessário
    desc: 'Reprodução de layout com foco em tipografia, Hero e responsividade.',
    tags: ['html','css','js'],
    links: { repo:'https://github.com/LU1SED/Starbucks', demo:'' }
  },
  {
    title: 'CheckMed (case de estudo)',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop',
    desc: 'Conceito de fila de atendimento; UI limpa e atualizada por checklist.',
    tags: ['js'],
    links: { repo:'https://github.com/LU1SED', demo:'' }
  },
  {
    title: 'BioBov (conceito)',
    img: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop',
    desc: 'Catálogo simples + contato via WhatsApp; foco em organização e semântica.',
    tags: ['html','js'],
    links: { repo:'https://github.com/LU1SED', demo:'' }
  }
];

const grid = document.getElementById('grid');
function cardTemplate(p){
  return `
    <article class="project">
      <img src="${p.img}" alt="${p.title}">
      <div class="inner">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="badges">${p.tags.map(t=>`<span class="badge">${t.toUpperCase()}</span>`).join('')}</div>
        <div class="links">
          ${p.links.repo ? `<a href="${p.links.repo}" target="_blank" rel="noopener">GitHub</a>`:''}
          ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>`:''}
        </div>
      </div>
    </article>
  `;
}
function render(list){
  grid.innerHTML = list.map(cardTemplate).join('');
}
render(projects);

// ===== busca + filtros =====
const search = document.getElementById('search');
const chips  = [...document.querySelectorAll('[data-filter]')];
let current = 'all';

function apply(){
  const q = (search.value || '').toLowerCase();
  const out = projects.filter(p=>{
    const hasQ = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.join(' ').includes(q);
    const hasF = current === 'all' || p.tags.includes(current);
    return hasQ && hasF;
  });
  render(out);
}

chips.forEach(c => c.addEventListener('click', ()=>{
  chips.forEach(x=>x.classList.remove('is-active'));
  c.classList.add('is-active');
  current = c.dataset.filter;
  apply();
}));

let t;
search.addEventListener('input', ()=>{
  clearTimeout(t);
  t = setTimeout(apply, 120);
});
