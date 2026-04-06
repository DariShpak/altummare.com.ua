// Слайдер сертифікатів
const track = document.querySelector('.certificates-track');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const certificateLinks = document.querySelectorAll('.certificate-link');
const modal = document.getElementById('certificateModal');
const modalClose = document.querySelector('.certificate-modal-close');
const modalOverlay = document.querySelector('.certificate-modal-overlay');
const certificateImage = document.getElementById('certificateImage');
const certificateDownload = document.getElementById('certificateDownload');

let currentIndex = 0;
let itemsPerView = 1;

// Визначення кількості елементів на екран
function getItemsPerView() {
  if (window.innerWidth >= 1024) {
    return 3;
  } else if (window.innerWidth >= 768) {
    return 2;
  }
  return 1;
}

// Оновлення позиції слайдера
function updateSlider() {
  itemsPerView = getItemsPerView();
  const items = document.querySelectorAll('.certificate-item');
  const maxIndex = items.length - itemsPerView;

  // Обмеження індексу
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  // Розрахунок зміщення
  const itemWidth = items[0].offsetWidth;
  const gap = itemsPerView === 1 ? 16 : (itemsPerView === 2 ? 24 : 32);
  const offset = -(currentIndex * (itemWidth + gap));

  track.style.transform = `translateX(${offset}px)`;

  // Оновлення стану кнопок
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
}

// Навігація вперед
nextBtn.addEventListener('click', () => {
  const items = document.querySelectorAll('.certificate-item');
  const maxIndex = items.length - itemsPerView;

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

// Навігація назад
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Оновлення при зміні розміру вікна
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateSlider();
  }, 250);
});

// Відкриття модального вікна з сертифікатом
function openCertificateModal(imageUrl, pdfUrl) {
  certificateImage.src = imageUrl;
  certificateDownload.href = pdfUrl;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Закриття модального вікна
function closeCertificateModal() {
  modal.classList.add('hidden');
  certificateImage.src = '';
  certificateDownload.href = '';
  document.body.style.overflow = '';
}

// Обробники кліків на сертифікати
certificateLinks.forEach(link => {
  link.addEventListener('click', () => {
    const pdfUrl = link.getAttribute('data-pdf');
    const imageUrl = link.querySelector('img').src;
    if (pdfUrl && imageUrl) {
      openCertificateModal(imageUrl, pdfUrl);
    }
  });
});

// Закриття модального вікна
modalClose.addEventListener('click', closeCertificateModal);
modalOverlay.addEventListener('click', closeCertificateModal);

// Закриття модального вікна клавішею Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeCertificateModal();
  }
});

// Ініціалізація
updateSlider();
