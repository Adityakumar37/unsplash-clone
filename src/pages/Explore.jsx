import { useState, useEffect } from 'react'
import { fetchPhotos } from '../services/unsplash'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import './Explore.css'

function Explore() {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true)
        const data = await fetchPhotos(page)
        setPhotos((prev) => (page === 1 ? data : [...prev, ...data]))
      } catch (err) {
        console.error('Error fetching photos:', err)
        setError(
          `Failed to load photos: ${err.message || 'Please try again later.'}`
        )
      } finally {
        setLoading(false)
      }
    }

    loadPhotos()
  }, [page])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <div className="explore-page">
      <div className="explore-hero">
        <h1 className="explore-title">Explore</h1>
        <p className="explore-subtitle">
          Discover the world's best photos, curated by our community.
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
        ))}
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {!loading && photos.length > 0 && (
        <button
          className="load-more-btn"
          onClick={handleLoadMore}
          id="explore-load-more"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default Explore
