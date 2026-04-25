import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchPhotos } from '../services/unsplash'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import './Search.css'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPhotos([])
    setPage(1)
    setError(null)
  }, [query])

  useEffect(() => {
    if (!query) return

    const load = async () => {
      try {
        setLoading(true)
        const data = await searchPhotos(query, page)
        const results = data.results || data
        setPhotos((prev) => (page === 1 ? results : [...prev, ...results]))
      } catch (err) {
        setError('Failed to search photos.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [query, page])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  if (!query) {
    return (
      <div className="search-container">
        <div className="search-empty">
          <h2>Search for photos</h2>
          <p>Use the search bar above to find beautiful photos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="search-container">
      <h2 className="search-heading">Results for "{query}"</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
        ))}
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {!loading && photos.length === 0 && (
        <div className="search-empty">
          <p>No photos found for "{query}"</p>
        </div>
      )}

      {!loading && photos.length > 0 && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  )
}

export default Search
