const BOT_TOKEN = '7563958637:AAFWLdH8ok1EVc4SF8OJTEcv6UCV2aZMqIA';
const CHAT_ID = '@javascriptprocets';

const form = document.querySelector('.order-form');
const successMsg = form.querySelector('.success-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const phonePattern = /^\+?\d{9,15}$/;

  if (name === '' || !phonePattern.test(phone)) {
    alert('Iltimos, ismingiz va to‘g‘ri telefon raqamini kiriting.');
    return;
  }

  const message = `🍔 Yangi buyurtma!\n👤 Ism: ${name}\n📞 Telefon: ${phone}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      successMsg.style.display = 'block';
      form.reset();
    } else {
      alert('Xabar yuborishda xato: ' + data.description);
    }
  })
  .catch(err => alert('Tarmoq xatosi: ' + err));
});

// Slayder
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === i);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
setInterval(nextSlide, 5000);
showSlide(currentSlide);