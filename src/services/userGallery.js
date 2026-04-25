const SUBMISSIONS_STORAGE_KEY = 'unsplashCloneSubmissions'
const WISHLIST_STORAGE_KEY = 'unsplashCloneWishlist'
const DATA_CHANGE_EVENT = 'unsplashCloneDataChanged'

const readList = (key) => {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeList = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const notifyGalleryChange = () => {
  window.dispatchEvent(new Event(DATA_CHANGE_EVENT))
}

export const getGalleryEventName = () => DATA_CHANGE_EVENT

export const getSubmissions = () => readList(SUBMISSIONS_STORAGE_KEY)

export const addSubmission = (submission) => {
  const submissions = getSubmissions()
  submissions.unshift(submission)
  writeList(SUBMISSIONS_STORAGE_KEY, submissions)
  notifyGalleryChange()
}

export const getWishlist = () => readList(WISHLIST_STORAGE_KEY)

const toWishlistedPhoto = (photo) => ({
  id: photo.id,
  alt_description: photo.alt_description || 'Photo',
  urls: {
    small: photo.urls?.small || photo.urls?.regular,
    regular: photo.urls?.regular || photo.urls?.small,
  },
  user: {
    name: photo.user?.name || 'Unknown artist',
    username: photo.user?.username || 'unknown',
    profile_image: {
      small: photo.user?.profile_image?.small || photo.user?.profile_image?.medium,
      medium: photo.user?.profile_image?.medium || photo.user?.profile_image?.small,
    },
  },
  likes: typeof photo.likes === 'number' ? photo.likes : 0,
  savedAt: new Date().toISOString(),
})

export const isWishlisted = (photoId) => {
  const id = String(photoId)
  return getWishlist().some((photo) => String(photo.id) === id)
}

export const toggleWishlistPhoto = (photo) => {
  const id = String(photo.id)
  const wishlist = getWishlist()
  const existingIndex = wishlist.findIndex((item) => String(item.id) === id)

  if (existingIndex >= 0) {
    wishlist.splice(existingIndex, 1)
    writeList(WISHLIST_STORAGE_KEY, wishlist)
    notifyGalleryChange()
    return false
  }

  wishlist.unshift(toWishlistedPhoto(photo))
  writeList(WISHLIST_STORAGE_KEY, wishlist)
  notifyGalleryChange()
  return true
}
