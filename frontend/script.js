const API = 'https://rebecca-portfolio-api.onrender.com';

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// Image fallback
const img = document.querySelector('.hero-img');
const avatar = document.getElementById('fallback');
if (img) {
  img.onerror = function () {
    this.style.display = 'none';
    if (avatar) avatar.style.display = 'flex';
  };
  img.onload = function () {
    if (avatar) avatar.style.display = 'none';
  };
}

function renderSkills(skills) {
  const tbody = document.getElementById('skills-body');
  if (!tbody) return;
  tbody.innerHTML = skills.map(s => `
    <tr>
      <td class="td-bold">${s.name}</td>
      <td><span class="pill pill-v">${s.category}</span></td>
      <td><div class="bar"><div class="bar-fill" style="width:${s.level}%"></div></div></td>
      <td>${s.level}%</td>
    </tr>
  `).join('');
}

function renderProjects(projects) {
  const tbody = document.getElementById('projects-body');
  if (!tbody) return;
  tbody.innerHTML = projects.map((p, i) => `
    <tr>
      <td class="td-num">${String(i+1).padStart(2,'0')}</td>
      <td class="td-bold">${p.title}</td>
      <td class="td-muted">${p.description}</td>
      <td>${Array.isArray(p.tech) ? p.tech.map(t => `<span class="pill pill-v">${t}</span>`).join(' ') : p.tech}</td>
      <td><span class="pill pill-g">${p.status}</span></td>
    </tr>
  `).join('');
}

// Load profile
fetch(`${API}/api/profile`).then(r => r.json()).then(data => {
  setText('hero-name', data.name.split(' ')[0] || data.name);
  setText('hero-title', data.title);
  setText('hero-location', `📍 ${data.location}`);
  setText('hero-bio', data.bio || '');
  setText('about-name', data.name);
  setText('about-role', data.title);
  setText('about-location', data.location);
  setText('c-email', data.email);
}).catch(e => console.error('Profile error:', e));

// Load contact
fetch(`${API}/api/contact`).then(r => r.json()).then(data => {
  setText('c-github', data.github ? data.github.replace(/^https?:\/\//,'') : 'github.com/rebeccashauri');
  setText('c-linkedin', data.linkedin ? data.linkedin.replace(/^https?:\/\//,'') : 'linkedin.com/in/rebeccashauri');
  setText('c-twitter', data.twitter ? data.twitter.replace(/^https?:\/\//,'') : '@rebeccashauri');
  setText('c-phone', data.phone || '');
}).catch(e => console.error('Contact error:', e));

// Load skills
fetch(`${API}/api/skills`).then(r => r.json()).then(data => renderSkills(data.skills || [])).catch(e => console.error('Skills error:', e));

// Load projects
fetch(`${API}/api/projects`).then(r => r.json()).then(data => renderProjects(data.projects || [])).catch(e => console.error('Projects error:', e));
