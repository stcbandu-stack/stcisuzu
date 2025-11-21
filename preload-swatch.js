// ---------- Preload รูป Swatch ทั้งหมด ----------
document.addEventListener('DOMContentLoaded', function () {
  const urls = new Set();

  // ดึง URL รูปจากทุก swatch
  document.querySelectorAll('.swatch').forEach(function (swatch) {
    const url = swatch.getAttribute('data-img');
    if (url) {
      urls.add(url);
    }
  });

  // preload ทีละรูป
  urls.forEach(function (url) {
    const img = new Image();
    img.src = url;
  });
});
