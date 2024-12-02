import axios from 'axios';

const API_KEY = '47316716-03762433f8b0cf1d8516e073f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(`HTTP Error: ${error.response?.status || error.message}`);
  }
}
