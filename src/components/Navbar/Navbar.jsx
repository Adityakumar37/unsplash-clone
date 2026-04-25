import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="navbar" id="main-navbar">
      {/* ── Logo ─────────────────────────────── */}
      <Link to="/feed" className="navbar-logo" aria-label="Unsplash Home" id="navbar-logo">
        <span className="navbar-logo-icon" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </span>
        <span className="navbar-logo-text">
          Unsplash<span className="navbar-logo-accent">Clone</span>
        </span>
      </Link>

      {/* ── Search ───────────────────────────── */}
      <div className="navbar-search-wrap">
        <span className="navbar-search-icon" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className="navbar-search"
          placeholder="Search high-resolution photos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search photos"
          id="navbar-search-input"
        />
      </div>

      {/* ── Nav links ────────────────────────── */}
      <nav className="navbar-links" aria-label="Primary">
        <Link to="/explore" className="nav-link nav-link-plain" id="nav-explore-btn">
          <svg
            className="nav-link-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          Explore
        </Link>

        <div className="navbar-divider" />

        <Link to="/login" className="nav-link nav-link-outlined" id="nav-login-btn">
          Log in
        </Link>
        <Link to="/create" className="nav-link nav-link-filled" id="nav-submit-btn">
          Submit a photo
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
