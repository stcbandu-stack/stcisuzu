/* ------------------------
       ส่วนสลับสี (เหมือนโค้ดเดิม)
       ------------------------ */
    document.querySelectorAll(".car-config").forEach(function(config) {
      const carImage   = config.querySelector(".car-image");
      const colorName  = config.querySelector(".color-name");
      const swatches   = config.querySelectorAll(".swatch");

      swatches.forEach(function(swatch) {
        swatch.addEventListener("click", function() {
          const newImg  = swatch.getAttribute("data-img");
          const newName = swatch.getAttribute("data-color-name");

          if (newImg) {
            carImage.src = newImg;
          }
          if (newName && colorName) {
            colorName.textContent = newName;
          }

          swatches.forEach(function(s) { s.classList.remove("active"); });
          swatch.classList.add("active");
        });
      });
    });

    /* ------------------------
       ส่วนเพิ่มใหม่: เลือกรุ่นรถ
       ------------------------ */
    const modelSelect = document.getElementById("modelSelect");
    const configs = document.querySelectorAll(".car-config");

    function showModel(modelValue) {
      configs.forEach(function(cfg) {
        if (cfg.dataset.model === modelValue) {
          cfg.dataset.visible = "true";
        } else {
          cfg.dataset.visible = "false";
        }
      });
    }

    // เวลาเปลี่ยนค่า select
    modelSelect.addEventListener("change", function(e) {
      showModel(e.target.value);
    });

    // แสดงรุ่นแรกตอนโหลด

    showModel(modelSelect.value);

function showModel(modelValue) {
  configs.forEach(function(cfg) {
    if (cfg.dataset.model === modelValue) {
      cfg.dataset.visible = "true";

      // ★ อัปเดตราคา
      const priceText = cfg.dataset.price || "";
      const priceBox = cfg.querySelector(".price-value");
      if (priceBox) priceBox.textContent = priceText;

    } else {
      cfg.dataset.visible = "false";
    }
  });
}

  // การ์ดไฮไลท์
  
  (function() {
    const track = document.getElementById('highlightTrack');
    const cards = track.querySelectorAll('.highlight-card');
    const dotsContainer = document.getElementById('highlightDots');

    // เคลียร์ dot เก่าออก (เผื่อเคยเขียนมือไว้)
    dotsContainer.innerHTML = '';

    // สร้าง dot ตามจำนวนการ์ด
    const dots = [];
    cards.forEach((card, index) => {
      const dot = document.createElement('div');
      dot.className = 'highlight-dot' + (index === 0 ? ' active' : '');
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    // คลิก dot → scroll ไปที่การ์ด
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index || 0);
        const target = cards[index];
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
        }
      });
    });

    // เลื่อนด้วยนิ้ว/เมาส์ → เปลี่ยน active dot ให้ตรงใบที่อยู่กลาง ๆ
    track.addEventListener('scroll', () => {
      const trackRect = track.getBoundingClientRect();

      let activeIndex = 0;
      let closest = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const offset = Math.abs(rect.left - trackRect.left);
        if (offset < closest) {
          closest = offset;
          activeIndex = index;
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    });
  })();
