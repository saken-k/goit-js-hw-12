import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function renderGallery(images, gallery) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img 
              class="gallery-image" 
              src="${webformatURL}" 
              alt="${tags}" 
            />
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
          </a>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
  });
}
