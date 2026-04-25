const ACCESS_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.pexels.com/v1'

const request = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: ACCESS_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`Pexels request failed: ${response.status}`)
  }

  return response.json()
}

export const fetchPhotos = async (page = 1) => {
  const data = await request(`/curated?page=${page}&per_page=20`)
  return data.photos.map(p => ({
    id: p.id,
    urls: {
      small: p.src.medium,
      regular: p.src.large,
    },
    alt_description: p.alt,
    likes: 0,
    user: {
      name: p.photographer,
      username: p.photographer_url,
      profile_image: {
        small: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=32`,
        medium: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=64`,
      },
    },
    links: { download: p.src.original },
    pexels_url: p.url,
  }))
}

export const searchPhotos = async (query, page = 1) => {
  const data = await request(
    `/search?query=${encodeURIComponent(query)}&page=${page}&per_page=20`
  )
  return {
    total: data.total_results,
    results: data.photos.map(p => ({
      id: p.id,
      urls: {
        small: p.src.medium,
        regular: p.src.large,
      },
      alt_description: p.alt,
      likes: 0,
      user: {
        name: p.photographer,
        username: p.photographer_url,
        profile_image: {
          small: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=32`,
          medium: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=64`,
        },
      },
      links: { download: p.src.original },
      pexels_url: p.url,
    })),
  }
}

export const fetchPhoto = async (id) => {
  const p = await request(`/photos/${id}`)
  return {
    id: p.id,
    urls: {
      small: p.src.medium,
      regular: p.src.large,
    },
    alt_description: p.alt,
    description: p.alt,
    likes: 0,
    downloads: null,
    views: null,
    user: {
      name: p.photographer,
      username: p.photographer_url,
      profile_image: {
        small: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=32`,
        medium: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.photographer)}&size=64`,
      },
    },
    links: { download: p.src.original },
    tags: [],
    pexels_url: p.url,
  }
}

export { ACCESS_KEY }
