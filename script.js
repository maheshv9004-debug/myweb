// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Smooth close menu on link tap (mobile)
document.querySelectorAll('.site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 900 && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu filter chips
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.menu-grid .card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const cat = chip.dataset.filter;
    cards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
    });
  });
});

// Simple testimonials slider
const slider = document.getElementById('slider');
const slides = Array.from(slider.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('sliderDots');
let idx = 0;
let timer = null;

// build dots
slides.forEach((_, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('is-active');
  b.addEventListener('click', () => goTo(i, true));
  dotsWrap.appendChild(b);
});

const dots = Array.from(dotsWrap.children);

function goTo(i, user = false) {
  slides[idx].classList.remove('is-active');
  dots[idx].classList.remove('is-active');
  idx = (i + slides.length) % slides.length;
  slides[idx].classList.add('is-active');
  dots[idx].classList.add('is-active');
  if (user) restart();
}

function next() { goTo(idx + 1); }
function prev() { goTo(idx - 1); }

slider.querySelector('.next').addEventListener('click', () => next());
slider.querySelector('.prev').addEventListener('click', () => prev());

// autoplay
function start() { timer = setInterval(next, 5000); }
function stop() { clearInterval(timer); }
function restart(){ stop(); start(); }

slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
start();

// Reservation form validation (client-side only demo)
const form = document.getElementById('reservationForm');
const formMsg = document.getElementById('formMsg');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());

  // Basic validation
  const required = ['name','email','phone','date','time','guests'];
  const missing = required.filter(k => !values[k]);
  if (missing.length) {
    formMsg.textContent = 'Please fill all required fields.';
    formMsg.style.color = '#ef4444';
    return;
  }

  // Naive email check
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    formMsg.textContent = 'Please enter a valid email.';
    formMsg.style.color = '#ef4444';
    return;
  }

  // Success (demo only)
  formMsg.textContent = 'Reservation received! Check your email for confirmation.';
  formMsg.style.color = '#f4b400';
  form.reset();
});

// Accessibility: reduce motion preference pauses autoplay
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) stop();
