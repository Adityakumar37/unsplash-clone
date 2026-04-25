import React from 'react';
import { NavLink } from 'react-router-dom';
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
            className={({ isActive, isPending }) => 
              // React Router NavLink doesn't automatically match search params for isActive,
              // so we handle styling via CSS, or we can just use normal links and check search params manually.
              "category-link"
            }
          >
            {category}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategoryBar;
