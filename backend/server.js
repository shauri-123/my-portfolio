const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Profile Route
app.get('/api/profile', (req, res) => {
  res.json({
    name: "Rebecca Shauri",
    title: "Data Scientist & AI Engineer",
    bio: "Passionate Data Scientist and AI Engineer with expertise in machine learning, deep learning, and data-driven solutions. I transform complex datasets into actionable insights and build intelligent systems that solve real-world problems.",
    email: "rebecca@example.com",
    location: "Dar es Salaam, Tanzania",
    education: "BSc Computer Science",
    languages: "English, Swahili",
    availability: "Open to Work"
  });
});
// Skills Route
app.get('/api/skills', (req, res) => {
  res.json({
    skills: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Deep Learning",
      "TensorFlow",
      "Scikit-learn",
      "Pandas & NumPy",
      "SQL & Databases",
      "Power BI",
      "Node.js & APIs"
    ]
  });
});
// Projects Route
app.get('/api/projects', (req, res) => {
  res.json({
    projects: [
      {
        id: 1,
        title: "Data Dashboard",
        description: "Real-time interactive analytics dashboard for business insights.",
        tech: ["React", "D3.js", "SQL"],
        status: "Live",
        link: "#"
      },
      {
        id: 2,
        title: "ML Predictor",
        description: "Predictive machine learning model achieving 94% accuracy.",
        tech: ["Scikit-learn", "Pandas", "Python"],
        status: "In Progress",
        link: "#"
      }
    ]
  });
});

// Contact Route
app.get('/api/contact', (req, res) => {
  res.json({
    email: "rebecca@example.com",
    github: "https://github.com/rebeccashauri",
    linkedin: "https://linkedin.com/in/rebeccashauri",
    twitter: "https://twitter.com/rebeccashauri"
  });
});

// Root Route
app.get('/', (req, res) => {
  res.json({ message: "Rebecca's Portfolio API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});