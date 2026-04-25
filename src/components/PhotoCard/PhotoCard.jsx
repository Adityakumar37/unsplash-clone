import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isWishlisted, toggleWishlistPhoto } from '../../services/userGallery'
import './PhotoCard.css'

const PhotoCard = ({ photo }) => {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(isWishlisted(photo.id))

  const handleDownload = async (e) => {
    e.stopPropagation()
    try {
      const url = photo.links?.download || photo.urls?.regular
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `photo-${photo.id}.jpg`
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch {
      // fallback: open in new tab
      window.open(photo.links?.download || photo.urls?.regular, '_blank')
    }
  }

  const handleToggleWishlist = (event) => {
    event.stopPropagation()
    const nextState = toggleWishlistPhoto(photo)
    setSaved(nextState)
  }

  return (
    <div
      className="photo-card"
      onClick={() => navigate(`/photo/${photo.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/photo/${photo.id}`)}
      aria-label={`Photo by ${photo.user?.name}`}
    >
      <img
        src={photo.urls.regular || photo.urls.small}
        alt={photo.alt_description || `Photo by ${photo.user?.name}`}
        loading="lazy"
        className="photo-card-img"
      />

      {/* Hover overlay */}
      <div className="photo-card-overlay">
        {/* Top actions */}
        <div className="card-top">
          <button
            className={`card-action-btn${saved ? ' liked' : ''}`}
            onClick={handleToggleWishlist}
            aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
            title={saved ? 'Saved' : 'Save'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={saved ? 'currentColor' : 'none'}
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Bottom: user info */}
        <div className="card-bottom">
          <div className="card-user">
            <img
              src={photo.user?.profile_image?.small}
              alt={photo.user?.name}
              className="card-avatar"
            />
            <span className="card-username">{photo.user?.name}</span>
          </div>
        </div>
      </div>

      {/* Always-visible download button */}
      <button
        className="card-download-btn"
        onClick={handleDownload}
        aria-label="Download photo"
        title="Download free"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
      </button>
    </div>
  )
}

export default PhotoCard
