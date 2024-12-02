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
const loadMore = document.querySelector('.load-more');

let lightbox;
let page = 1;
let per_page = 15;

const STORAGE_KEY = 'query-to-pixabay';

function toggleVisibility(element, shouldShow) {
  element.style.display = shouldShow ? 'block' : 'none';
}

function resetPage() {
  page = 1;
}

toggleVisibility(loadMore, false);

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = form.elements['image-name'].value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(query));
  if (!query) {
    showError('Please enter a search query!');
    return;
  }

  resetPage();
  clearGallery(gallery);
  toggleVisibility(loader, true);

  try {
    const data = await fetchImages(query);
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

    if (data.totalHits > page * per_page) {
      toggleVisibility(loadMore, true);
    } else {
      toggleVisibility(loadMore, false);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    showError('Something went wrong. Please try again later.');
  }

  toggleVisibility(loader, false);
  form.reset();
});

loadMore.addEventListener('click', async () => {
  const query = JSON.parse(localStorage.getItem(STORAGE_KEY));

  toggleVisibility(loader, true);

  try {
    page += 1;
    const data = await fetchImages(query, page, per_page);
    const height = renderGallery(data.hits, gallery);

    if (lightbox) {
      lightbox.refresh();
    }

    if (page * per_page >= data.totalHits) {
      toggleVisibility(loadMore, false);
      showError("We're sorry, but you've reached the end of search results.");
    }

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    showError('Something went wrong. Please try again later.');
  }

  toggleVisibility(loader, false);
});
