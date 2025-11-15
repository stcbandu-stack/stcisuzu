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
