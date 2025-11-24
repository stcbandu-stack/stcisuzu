document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('campaignCarousel');
  const slides = Array.from(carousel.querySelectorAll('.campaign-slide'));
  const cta = document.getElementById('campaignCta');

  if (!slides.length) return;

  let currentIndex = 0;

  /* ตั้งค่า class ซ้าย-กลาง-ขวา จาก currentIndex */
  function updateSlides() {
    const total = slides.length;

    slides.forEach((slide, i) => {
      slide.classList.remove('is-active', 'is-left', 'is-right');
    });

    const leftIndex  = (currentIndex - 1 + total) % total;
    const rightIndex = (currentIndex + 1) % total;

    slides[currentIndex].classList.add('is-active');
    slides[leftIndex].classList.add('is-left');
    slides[rightIndex].classList.add('is-right');

    const link = slides[currentIndex].dataset.link;
    if (link) cta.href = link;
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % slides.length;        // วนลูปขวา
    updateSlides();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // วนลูปซ้าย
    updateSlides();
  }

  /* คลิกสไลด์:
     - ถ้าเป็นใบกลาง → เปิดลิงก์
     - ถ้าเป็นใบซ้าย/ขวา → ขยับ currentIndex ให้มันมาอยู่กลาง
  */
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (index === currentIndex) {
        const url = slide.dataset.link;
        if (url) window.open(url, '_blank');
      } else {
        currentIndex = index;
        updateSlides();
      }
    });
  });

  /* ----- Drag / Swipe ด้วย pointer events ----- */
  let isDragging = false;
  let startX = 0;
  let endX = 0;

  function onPointerDown(e) {
    isDragging = true;
    startX = e.clientX;
    endX = e.clientX;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    endX = e.clientX;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;

    const dx = endX - startX;
    const threshold = 40; // ลากเกิน 40px ค่อยเปลี่ยนสไลด์

    if (dx > threshold) {
      // ลากไปทางขวา → ขอ slide ก่อนหน้าให้มาอยู่กลาง
      goPrev();
    } else if (dx < -threshold) {
      // ลากไปทางซ้าย → slide ถัดไป
      goNext();
    }
  }

  carousel.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  /* เรียกครั้งแรก */
  updateSlides();
});
