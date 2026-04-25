import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPhoto } from '../services/unsplash'
import { isWishlisted, toggleWishlistPhoto } from '../services/userGallery'
import './PhotoDetail.css'

const PhotoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchPhoto(id).then((data) => {
      setPhoto(data)
      setSaved(isWishlisted(data.id))
    })
  }, [id])

  const handleToggleWishlist = () => {
    if (!photo) {
      return
    }

    const nextState = toggleWishlistPhoto(photo)
    setSaved(nextState)
  }

  if (!photo) return <div className="detail-loading">Loading...</div>

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-container">
        <div className="detail-image-wrap">
          <img src={photo.urls.regular} alt={photo.alt_description} />
        </div>
        <div className="detail-info">
          <div className="detail-user">
            <img src={photo.user.profile_image.medium} alt={photo.user.name} />
            <div>
              <p className="detail-username">{photo.user.name}</p>
              <p className="detail-handle">@{photo.user.username}</p>
            </div>
          </div>
          <div className="detail-stats">
            <div className="stat">
              <span className="stat-num">{photo.likes.toLocaleString()}</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-num">{photo.downloads?.toLocaleString() ?? '—'}</span>
              <span className="stat-label">Downloads</span>
            </div>
            <div className="stat">
              <span className="stat-num">{photo.views?.toLocaleString() ?? '—'}</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
          {photo.description && (
            <p className="detail-desc">{photo.description}</p>
          )}
          <a
            href={`${photo.links.download}?force=true`}
            target="_blank"
            rel="noreferrer"
            className="detail-download"
          >
            Download Free
          </a>
          <button
            type="button"
            className={`detail-wishlist ${saved ? 'saved' : ''}`}
            onClick={handleToggleWishlist}
          >
            {saved ? 'Remove from wishlist' : 'Save to wishlist'}
          </button>
          {photo.tags?.length > 0 && (
            <div className="detail-tags">
              {photo.tags.slice(0, 10).map(t => (
                <span key={t.title} className="tag">{t.title}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
