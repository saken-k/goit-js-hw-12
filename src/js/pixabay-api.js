const API_KEY = '47316716-03762433f8b0cf1d8516e073f';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  });
}
