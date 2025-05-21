import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // إذا كنت تحتاج JS
import '../scss/main.scss'; // Sass الخاص بك
import '@fortawesome/fontawesome-free/css/all.min.css';

function importAllImages(r) {
  return r.keys().map(r);
}

document.addEventListener("DOMContentLoaded", () => {
  // تأكد أن العنصر موجود داخل هذا البلوك
  const container = document.getElementById("gallery"); // مثلاً
  if (container) {
    const img = document.createElement("img");
    img.src = "image.jpg";
    container.appendChild(img);
  } else {
    console.error("العنصر غير موجود في الصفحة");
  }
});
