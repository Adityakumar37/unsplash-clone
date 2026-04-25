import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../services/unsplash';
import PhotoCard from '../components/PhotoCard/PhotoCard';
import './Home.css';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(page);
        setPhotos((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError(`Failed to load photos: ${err.message || 'Please try again later.'}`);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="home-container">
      {error && <div className="error-message">{error}</div>}

      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
        ))}
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {!loading && photos.length > 0 && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
