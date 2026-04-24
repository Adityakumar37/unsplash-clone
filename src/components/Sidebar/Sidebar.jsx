import { Link } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <Link to="/feed" className="sidebar-btn" aria-label="Feed">
        H
      </Link>
      <Link to="/search" className="sidebar-btn" aria-label="Search">
        S
      </Link>
    </aside>
  )
}

export default Sidebar
