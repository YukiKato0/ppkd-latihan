/* Dynamic Typewriter Effect */
const typewriterPhrases = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "React.js Specialist",
  "Web Innovator"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function typeEffect() {
  const currentPhrase = typewriterPhrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

/* Mobile Menu Toggle */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  if (mobileMenu.classList.contains('hidden')) {
    menuIcon.className = 'fa-solid fa-bars text-2xl';
  } else {
    menuIcon.className = 'fa-solid fa-xmark text-2xl';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.className = 'fa-solid fa-bars text-2xl';
  });
});

/* Back To Top & Scroll Handler */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Toast Notification Helper (No Alert) */
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastContent = document.getElementById('toastContent');
  const toastMessage = document.getElementById('toastMessage');

  toastMessage.textContent = message;

  if (isError) {
    toastContent.className = 'glass-panel border border-rose-500/40 text-rose-400 px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium';
  } else {
    toastContent.className = 'glass-panel border border-emerald-500/40 text-emerald-400 px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium';
  }

  toast.classList.remove('toast-enter', 'pointer-events-none');
  toast.classList.add('toast-show');

  setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-enter', 'pointer-events-none');
  }, 3500);
}

/* Contact Form Submission Handling */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById('submitBtn');

  // Feedback animation
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Mengirim...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showToast('Pesan berhasil terkirim! Saka Bayu akan merespon segera.');
    form.reset();
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane text-xs"></i> Kirim Pesan';
    submitBtn.disabled = false;
  }, 1200);
}

/* Project Demo & Modal Display */
function showProjectDemo(title, imageSrc) {
  const modal = document.getElementById('demoModal');
  document.getElementById('modalTitle').textContent = title + ' - Interactive Demo';
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalDesc').textContent = 'Menampilkan pratinjau live dari ' + title + '. Aplikasi ini sepenuhnya dioptimalkan untuk performa desktop dan seluler.';

  modal.classList.remove('opacity-0', 'pointer-events-none');
}

function showProjectCode(title) {
  showToast('Membuka repositori GitHub untuk ' + title);
}

function closeModal() {
  const modal = document.getElementById('demoModal');
  modal.classList.add('opacity-0', 'pointer-events-none');
}

/* Set Current Year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Initialize typewriter on load */
window.addEventListener('load', () => {
  typeEffect();
});