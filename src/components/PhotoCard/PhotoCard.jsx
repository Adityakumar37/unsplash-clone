import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PhotoCard.css';

const PhotoCard = ({ photo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photo/${photo.id}`);
  };

  return (
    <div className="photo-card" onClick={handleClick}>
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || 'Unsplash Photo'}
        loading="lazy"
        className="photo-card-image"
      />
      <div className="photo-card-overlay">
        <div className="user-info">
          <img
            src={photo.user.profile_image.medium}
            alt={photo.user.name}
            className="user-avatar"
          />
          <span className="user-name">{photo.user.name}</span>
        </div>
        <div className="likes-info">
          <span>❤️ {photo.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
