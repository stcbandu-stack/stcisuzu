// preload เฉพาะ "รุ่นที่แสดงอยู่จริง ๆ" + รุ่นที่ยูสเซอร์เลือกเพิ่มทีหลัง
(function () {
  const preloaded = new Set(); // กันโหลดรูปเดิมซ้ำ

  function preloadConfig(config) {
    if (!config) return;

    config.querySelectorAll('.swatch').forEach(function (swatch) {
      const url = swatch.getAttribute('data-img');
      if (url && !preloaded.has(url)) {
        preloaded.add(url);
        const img = new Image();
        img.src = url;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1) ตอนโหลดหน้า ให้ preload เฉพาะ car-config ที่มองว่า "กำลังแสดง"
    let visibleConfigs = document.querySelectorAll('.car-config[data-visible="true"]');

    if (visibleConfigs.length > 0) {
      visibleConfigs.forEach(preloadConfig);
    } else {
      // ถ้าไม่ได้ใช้ data-visible ก็เอาอันแรกในหน้าแทน
      const first = document.querySelector('.car-config');
      preloadConfig(first);
    }

    // 2) ถ้ามี dropdown เลือกรุ่น (.model-select) → preload รูปของรุ่นนั้นตอนเปลี่ยน
    const modelSelect = document.querySelector('.model-select');
    if (modelSelect) {
      modelSelect.addEventListener('change', function () {
        const val = modelSelect.value;
        const cfg = document.querySelector('.car-config[data-model="' + val + '"]');
        preloadConfig(cfg);
      });
    }
  });
})();
