const openButton = document.getElementById('openInvitation');
const opening = document.getElementById('opening');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const petals = document.getElementById('petals');

let isOpened = false;

async function playMusic() {
  try {
    await music.play();
    musicButton.classList.add('is-playing');
  } catch (_) {
    musicButton.classList.remove('is-playing');
  }
}

openButton.addEventListener('click', () => {
  if (isOpened) return;
  isOpened = true;
  opening.classList.add('is-opening');
  openButton.classList.add('opening-animation');
  openButton.setAttribute('aria-disabled', 'true');
  playMusic();

  window.setTimeout(() => {
    opening.classList.add('is-opened');
    mainContent.classList.add('is-visible');
    mainContent.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('locked');
    musicButton.hidden = false;
    createPetals();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 2250);
});

musicButton.addEventListener('click', async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    musicButton.classList.remove('is-playing');
  }
});

const weddingDate = new Date('2026-08-15T18:00:00+05:00').getTime();
const countdownElements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const distance = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };

  Object.entries(values).forEach(([key, value]) => {
    countdownElements[key].textContent = String(value).padStart(2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function createPetals() {
  const total = window.innerWidth < 600 ? 16 : 24;
  for (let i = 0; i < total; i += 1) {
    window.setTimeout(() => spawnPetal(), i * 220);
  }
  window.setInterval(spawnPetal, 1000);
}

function spawnPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${8 + Math.random() * 7}s`;
  petal.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
  petal.style.setProperty('--rotate', `${220 + Math.random() * 520}deg`);
  petal.style.transform = `scale(${0.65 + Math.random() * 0.75})`;
  petals.appendChild(petal);
  window.setTimeout(() => petal.remove(), 16000);
}
