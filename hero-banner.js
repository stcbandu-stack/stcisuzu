/* ===========================
   HERO CAROUSEL (stc-hero)
   =========================== */
(function () {
  const root = document.querySelector('.stc-hero');
  if (!root) return;

  const bgEl = root.querySelector('.stc-hero-bg');
  const logoEl = root.querySelector('.stc-hero-logo');
  const priceEl = root.querySelector('.stc-hero-price-value');
  const btnEl = root.querySelector('.stc-hero-btn');
  const track = root.querySelector('.stc-hero-track');
  const cards = Array.from(root.querySelectorAll('.stc-hero-thumb'));

  if (!bgEl || !logoEl || !priceEl || !btnEl || !track || !cards.length) return;

  function setActiveCard(card, options) {
    const opts = Object.assign({ scrollToCenter: false }, options);

    const hero = card.dataset.hero || '';
    const logo = card.dataset.logo || '';
    const price = card.dataset.price || '';
    const link = card.dataset.link || '#';

    if (hero) {
      bgEl.style.backgroundImage = "url('" + hero + "')";
    }
    if (logo) {
      logoEl.src = logo;
      logoEl.style.display = 'block';
    } else {
      logoEl.style.display = 'none';
    }
    if (price) {
      priceEl.textContent = price;
    }
    if (link) {
      btnEl.href = link;
    }

    cards.forEach(function (c) {
      c.classList.remove('stc-hero-thumb--active');
    });
    card.classList.add('stc-hero-thumb--active');

    // เลื่อนการ์ดให้มาอยู่กลาง track เวลา click
    if (opts.scrollToCenter) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const offset =
        cardRect.left +
        cardRect.width / 2 -
        (trackRect.left + trackRect.width / 2);

      track.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  }

  // คลิกการ์ด → เปลี่ยนแบนเนอร์
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      setActiveCard(card, { scrollToCenter: true });
    });
  });

  // เลื่อนด้วยนิ้ว/เมาส์ → หาตัวที่อยู่กลางสุดให้เป็น active
  let scrollTimeout = null;
  track.addEventListener('scroll', function () {
    if (scrollTimeout) window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(function () {
      const trackRect = track.getBoundingClientRect();
      let closestCard = cards[0];
      let closestDist = Infinity;

      cards.forEach(function (card) {
        const rect = card.getBoundingClientRect();
        const center =
          rect.left + rect.width / 2 - (trackRect.left + trackRect.width / 2);
        const dist = Math.abs(center);
        if (dist < closestDist) {
          closestDist = dist;
          closestCard = card;
        }
      });

      if (closestCard) {
        setActiveCard(closestCard, { scrollToCenter: false });
      }
    }, 80); // หน่วงนิดนึงให้การเลื่อนนิ่งก่อนค่อยเช็ค
  });

  // เริ่มต้น: ใช้ใบที่มี data-initial="true" ถ้าไม่มีก็ใช้ใบแรก
  const initialCard =
    cards.find(function (c) {
      return c.dataset.initial === 'true';
    }) || cards[0];

  if (initialCard) {
    setActiveCard(initialCard, { scrollToCenter: false });
  }
})();
