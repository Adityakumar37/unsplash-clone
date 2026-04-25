const ACCESS_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.unsplash.com'

const request = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Unsplash request failed: ${response.status}`)
  }

  return response.json()
}

export const fetchPhotos = async (page = 1) => {
  return request(`/photos?page=${page}&order_by=popular`)
}

export const searchPhotos = async (query, page = 1) => {
  return request(
    `/search/photos?query=${encodeURIComponent(query)}&page=${page}`,
  )
}

export const fetchPhoto = async (id) => {
  return request(`/photos/${id}`)
}

export { ACCESS_KEY }
