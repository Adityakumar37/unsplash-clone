import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home'
import './App.css'

const PhotoDetail = () => <div>Photo Detail</div>
const SearchResults = () => <div>Search Results</div>

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/feed" replace />} />
              <Route path="/feed" element={<Home />} />
              <Route path="/photo/:id" element={<PhotoDetail />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
