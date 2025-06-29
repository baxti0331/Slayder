// Константы для Телеграм-бота
const BOT_TOKEN = '8133373573:AAEXj8mS0CNSiFc1v4qMcH8lYdvwUNR1eVA;
const CHAT_ID = '@javascriptprocets'; // Например, @bistro24_orders

// Форма заказа
const form = document.querySelector('.order-form');
const successMsg = form.querySelector('.success-msg');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const phonePattern = /^\+?\d{9,15}$/;

  if (name === '' || !phonePattern.test(phone)) {
    alert('Пожалуйста, введите корректное имя и номер телефона.');
    return;
  }

  const message = `🍔 Новый заказ в Bistro 24!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      successMsg.style.display = 'block';
      form.reset();
    } else {
      alert('Ошибка при отправке: ' + data.description);
    }
  })
  .catch(err => {
    alert('Сетевая ошибка: ' + err);
  });
});

// Слайдер изображений
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
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

// Автоматическая смена слайдов
setInterval(nextSlide, 5000);

// Показать первый слайд сразу
showSlide(currentSlide);