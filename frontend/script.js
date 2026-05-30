const API = 'https://my-portfolio-u1kx.onrender.com';

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setStatus(msg, isError = false, persist = false) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('show');
  if (isError) el.classList.add('error'); else el.classList.remove('error');
  if (!persist) {
    setTimeout(() => { el.classList.remove('show'); el.classList.add('hidden'); }, 6000);
  }
}

function checkResponse(r) {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Initial API health check to set visible online/offline status
function checkAPIStatus() {
  fetch(`${API}/api`).then(r => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  }).then(data => {
    // show briefly that API is online
    setStatus('API online');
    console.log('API status:', data.message || 'online');
  }).catch(e => {
    console.error('API root error:', e);
    setStatus('⚠️ Offline — API unreachable', true, true);
  });
}

checkAPIStatus();

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
fetch(`${API}/api/profile`).then(checkResponse).then(data => {
  setText('hero-name', data.name.split(' ')[0] || data.name);
  setText('hero-title', data.title);
  setText('hero-location', `📍 ${data.location}`);
  setText('hero-bio', data.bio || '');
  setText('about-name', data.name);
  setText('about-role', data.title);
  setText('about-location', data.location);
  setText('c-email', data.email);
}).catch(e => { console.error('Profile error:', e); setStatus('Could not load profile — API unavailable', true, true); });

// Load contact
fetch(`${API}/api/contact`).then(checkResponse).then(data => {
  setText('c-github', data.github ? data.github.replace(/^https?:\/\//,'') : 'github.com/rebeccashauri');
  setText('c-linkedin', data.linkedin ? data.linkedin.replace(/^https?:\/\//,'') : 'linkedin.com/in/rebeccashauri');
  setText('c-twitter', data.twitter ? data.twitter.replace(/^https?:\/\//,'') : '@rebeccashauri');
  setText('c-phone', data.phone || '');
}).catch(e => { console.error('Contact error:', e); setStatus('Could not load contact details', true); });

// Load skills
fetch(`${API}/api/skills`).then(checkResponse).then(data => renderSkills(data.skills || [])).catch(e => { console.error('Skills error:', e); setStatus('Could not load skills', true); });

// Load projects
fetch(`${API}/api/projects`).then(checkResponse).then(data => renderProjects(data.projects || [])).catch(e => { console.error('Projects error:', e); setStatus('Could not load projects', true); });