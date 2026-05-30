const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/portfolio', express.static(path.join(__dirname, '..', 'frontend')));

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ===== IN-MEMORY DATA =====
let profile = {
  name: "Rebecca Shauri",
  title: "Data Scientist & AI Engineer",
  bio: "I turn complex data into clear decisions. Specialising in machine learning, deep learning and AI-powered systems that solve real-world problems — one dataset at a time.",
  email: "rebeccashauri@gmail.com",
  location: "Dar es Salaam, Tanzania"
};

let skills = [
  { id: 1, name: "Python", category: "Programming", level: 90 },
  { id: 2, name: "Machine Learning", category: "AI / ML", level: 85 },
  { id: 3, name: "Data Analysis", category: "Analytics", level: 88 },
  { id: 4, name: "Deep Learning", category: "AI / ML", level: 80 },
  { id: 5, name: "SQL & Databases", category: "Database", level: 78 },
  { id: 6, name: "Node.js & APIs", category: "Backend", level: 72 }
];

let projects = [
  { id: 1, title: "Data Dashboard", description: "Real-time analytics dashboard for business insights", tech: ["React", "D3.js"], status: "Live", link: "#" },
  { id: 2, title: "ML Predictor", description: "Predictive model achieving 94% accuracy on test data", tech: ["Scikit-learn", "Pandas"], status: "In Progress", link: "#" }
];

let contact = {
  email: "rebeccashauri@gmail.com",
  phone: "0692657806",
  github: "https://github.com/rebeccashauri",
  linkedin: "https://linkedin.com/in/rebeccashauri",
  twitter: "https://twitter.com/rebeccashauri"
};

// ===== PROFILE ROUTES =====
app.get('/api/profile', (req, res) => res.json(profile));
app.put('/api/profile', (req, res) => {
  profile = { ...profile, ...req.body };
  res.json({ message: 'Profile updated!', profile });
});

// ===== SKILLS ROUTES =====
app.get('/api/skills', (req, res) => res.json({ skills }));

app.post('/api/skills', (req, res) => {
  const newSkill = { id: Date.now(), ...req.body };
  skills.push(newSkill);
  res.json({ message: 'Skill added!', skill: newSkill });
});

app.put('/api/skills/:id', (req, res) => {
  const id = parseInt(req.params.id);
  skills = skills.map(s => s.id === id ? { ...s, ...req.body } : s);
  res.json({ message: 'Skill updated!', skills });
});

app.delete('/api/skills/:id', (req, res) => {
  const id = parseInt(req.params.id);
  skills = skills.filter(s => s.id !== id);
  res.json({ message: 'Skill deleted!', skills });
});

// ===== PROJECTS ROUTES =====
app.get('/api/projects', (req, res) => res.json({ projects }));

app.post('/api/projects', (req, res) => {
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  res.json({ message: 'Project added!', project: newProject });
});

app.put('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  projects = projects.map(p => p.id === id ? { ...p, ...req.body } : p);
  res.json({ message: 'Project updated!', projects });
});

app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  projects = projects.filter(p => p.id !== id);
  res.json({ message: 'Project deleted!', projects });
});

// ===== CONTACT ROUTES =====
app.get('/api/contact', (req, res) => res.json(contact));
app.put('/api/contact', (req, res) => {
  contact = { ...contact, ...req.body };
  res.json({ message: 'Contact updated!', contact });
});

// ===== ROOT =====
app.get('/api', (req, res) => {
  res.json({
    message: "Rebecca Portfolio API is running!",
    port: PORT,
    endpoints: [
      "GET  /api/profile",
      "PUT  /api/profile",
      "GET  /api/skills",
      "POST /api/skills",
      "PUT  /api/skills/:id",
      "DELETE /api/skills/:id",
      "GET  /api/projects",
      "POST /api/projects",
      "PUT  /api/projects/:id",
      "DELETE /api/projects/:id",
      "GET  /api/contact",
      "PUT  /api/contact"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}`);
});