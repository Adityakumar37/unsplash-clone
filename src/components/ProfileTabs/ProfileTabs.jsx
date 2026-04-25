import { useMemo, useState } from 'react'
import { getCurrentUser } from '../../services/auth'
import { getSubmissions, getWishlist } from '../../services/userGallery'
import './ProfileTabs.css'

const TABS = ['Photos', 'Illustrations', 'Collections', 'Saved']

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('Collections')

  const currentUser = useMemo(() => getCurrentUser(), [])
  const submissions = useMemo(() => getSubmissions(), [])
  const wishlist = useMemo(() => getWishlist(), [])

  const displayName = currentUser?.name || 'Devesh Kumar'

  const tabCounts = {
    Photos: submissions.length,
    Illustrations: 0,
    Collections: 1,
    Saved: wishlist.length,
  }

  const renderTabPanel = () => {
    if (activeTab === 'Collections') {
      return (
        <div className="profile-panel profile-collection-grid">
          <article className="collection-card">
            <div className="collection-preview" aria-hidden="true">
              <div className="preview-main" />
              <div className="preview-stack">
                <div className="preview-small" />
                <div className="preview-small" />
              </div>
            </div>
            <h3 className="collection-title">My first collection</h3>
            <p className="collection-meta">0 images</p>
            <p className="collection-meta">Curated by {displayName}</p>
          </article>
        </div>
      )
    }

    return (
      <div className="profile-panel profile-placeholder">
        <h3>{activeTab}</h3>
        <p>Nothing to show yet.</p>
      </div>
    )
  }

  return (
    <section className="profile-tabs-wrap">
      <div className="profile-tabs" role="tablist" aria-label="Profile sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ({tabCounts[tab]})
          </button>
        ))}
      </div>

      {renderTabPanel()}
    </section>
  )
}

export default ProfileTabs
