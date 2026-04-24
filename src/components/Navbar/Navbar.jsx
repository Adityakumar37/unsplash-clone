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
    <header className="navbar">
      <Link to="/feed" className="navbar-logo" aria-label="Unsplash Home">
        Unsplash Clone
      </Link>

      <div className="navbar-search-wrap">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search photos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search photos"
        />
      </div>

      <nav className="navbar-links" aria-label="Primary">
        <Link to="/feed" className="nav-link nav-link-plain">
          Explore
        </Link>
        <Link to="/login" className="nav-link nav-link-outlined">
          Log in
        </Link>
        <Link to="/create" className="nav-link nav-link-filled">
          Submit a photo
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
