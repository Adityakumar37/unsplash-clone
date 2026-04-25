import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import { searchPhotos } from '../services/unsplash'
import './SearchResults.css'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    setPage(1)
    searchPhotos(query, 1).then(data => {
      setResults(data.results || [])
      setTotal(data.total || 0)
      setLoading(false)
    }).catch(err => {
      console.error('Search failed:', err)
      setLoading(false)
    })
  }, [query])

  const loadMore = async () => {
    const next = page + 1
    setLoading(true)
    const data = await searchPhotos(query, next)
    setResults(prev => [...prev, ...(data.results || [])])
    setPage(next)
    setLoading(false)
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Results for <em>"{query}"</em></h1>
        <p>{total.toLocaleString()} photos found</p>
      </div>
      {results.length === 0 && !loading && (
        <p className="no-results">No results found. Try a different keyword.</p>
      )}
      <div className="masonry-grid">
        {results.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && results.length > 0 && (
        <div className="load-more">
          <button onClick={loadMore}>Load more</button>
        </div>
      )}
    </div>
  )
}

export default SearchResults
