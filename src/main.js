import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderGallery,
  showError,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox;

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = form.elements['image-name'].value.trim();
  if (!query) {
    showError('Please enter a search query!');
    return;
  }
  clearGallery(gallery);
  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      renderGallery(data.hits, gallery);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
          overlayOpacity: 0.8,
        });
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      showError('Something went wrong. Please try again later.');
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});
