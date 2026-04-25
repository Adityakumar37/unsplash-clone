import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home'
import './App.css'

import PhotoDetail from './pages/PhotoDetail'
import SearchResults from './pages/SearchResults'
import CategoryBar from './components/CategoryBar/CategoryBar'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <CategoryBar />
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
