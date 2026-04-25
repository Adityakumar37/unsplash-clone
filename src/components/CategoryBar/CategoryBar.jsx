import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './CategoryBar.css';

const categories = [
  'Wallpapers',
  '3D Renders',
  'Nature',
  'Textures',
  'Film',
  'Architecture',
  'Street Photography',
  'Experimental',
  'Travel',
  'People',
];

const CategoryBar = () => {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('q');

  return (
    <div className="category-bar-wrapper">
      <nav className="category-bar">
        <NavLink
          to="/feed"
          className={({ isActive }) => isActive ? "category-link active" : "category-link"}
          end
        >
          Featured
        </NavLink>
        <div className="category-divider"></div>
        {categories.map((category) => (
          <NavLink
            key={category}
            to={`/search?q=${encodeURIComponent(category)}`}
            className={`category-link ${currentQuery === category ? 'active' : ''}`}
          >
            {category}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategoryBar;
