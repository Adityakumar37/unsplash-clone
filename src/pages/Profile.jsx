import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'
import ProfileTabs from '../components/ProfileTabs/ProfileTabs'
import './Profile.css'

function Profile() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  const displayName = currentUser.name || 'Guest User'
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <section className="profile-page">
      <header className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {initials}
        </div>

        <div className="profile-header-content">
          <div className="profile-title-row">
            <h1>{displayName}</h1>
            <button type="button" className="edit-profile-btn">
              Edit profile
            </button>
          </div>
          <p className="profile-description">
            Download free, beautiful high-quality photos curated by {displayName.split(' ')[0]}.
          </p>
        </div>
      </header>

      <ProfileTabs />
    </section>
  )
}

export default Profile
