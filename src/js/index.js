import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // إذا كنت تحتاج JS
import '../scss/main.scss'; // Sass الخاص بك
function importAllImages(r) {
  return r.keys().map(r);
}

const images = importAllImages(require.context('../assets/images', false, /\.(png|jpe?g|svg|webp)$/));

const gallery = document.getElementById('gallery');
images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'صورة';
  gallery.appendChild(img);
});