const API = 'http://localhost:3000';

// Show avatar fallback if no image
const img = document.querySelector('.hero-img');
const avatar = document.getElementById('avatar-fallback');
if (img) {
  img.onerror = function () {
    this.style.display = 'none';
    avatar.style.display = 'flex';
  };
  img.onload = function () {
    avatar.style.display = 'none';
  };
}

// Load Profile
fetch(`${API}/api/profile`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('hero-title').textContent = data.title;
    document.getElementById('hero-location').textContent = '📍 ' + data.location;
    document.getElementById('about-name').textContent = data.name;
    document.getElementById('about-title').textContent = data.title;
    document.getElementById('about-location').textContent = data.location;
    document.getElementById('c-email').textContent = data.email;
  });

// Load Contact
fetch(`${API}/api/contact`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('c-github').textContent = 'github.com/rebeccashauri';
    document.getElementById('c-linkedin').textContent = 'linkedin.com/in/rebeccashauri';
    document.getElementById('c-twitter').textContent = '@rebeccashauri';
  });

  // Hide fallback since we have a real image
document.getElementById('fallback').style.display = 'none';
document.querySelector('.hero-img').style.display = 'block';