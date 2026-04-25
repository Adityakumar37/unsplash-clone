import { useMemo, useState } from 'react'
import { addSubmission } from '../services/userGallery'
import './Create.css'

const fileToDataUrl =
  (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })

function Create() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const formattedSize = useMemo(() => {
    if (!file) {
      return ''
    }

    const sizeInKb = file.size / 1024
    if (sizeInKb < 1024) {
      return `${sizeInKb.toFixed(1)} KB`
    }

    return `${(sizeInKb / 1024).toFixed(2)} MB`
  }, [file])

  const handleFileChange = (event) => {
    setError('')
    setMessage('')

    const selectedFile = event.target.files?.[0]
    if (!selectedFile) {
      setFile(null)
      setPreviewUrl('')
      return
    }

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file.')
      setFile(null)
      setPreviewUrl('')
      return
    }

    const localPreview = URL.createObjectURL(selectedFile)
    setFile(selectedFile)
    setPreviewUrl(localPreview)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!file) {
      setError('Please select a picture to submit.')
      return
    }

    try {
      const imageUrl = await fileToDataUrl(file)
      const submission = {
        id: Date.now(),
        title: title.trim() || file.name,
        description: description.trim(),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        imageUrl,
        submittedAt: new Date().toISOString(),
      }

      addSubmission(submission)
    } catch {
      setError('Unable to process this image. Please try another file.')
      return
    }

    setMessage('Photo submission saved. (Demo mode: saved to browser storage)')
    setTitle('')
    setDescription('')
    setFile(null)
    setPreviewUrl('')
  }

  return (
    <section className="create-page">
      <div className="create-card">
        <h1 className="create-title">Submit a photo</h1>
        <p className="create-subtitle">
          Share your best shot. Choose a picture and submit it.
        </p>

        <form className="create-form" onSubmit={handleSubmit}>
          {error && <p className="create-message create-error">{error}</p>}
          {message && <p className="create-message create-success">{message}</p>}

          <label className="upload-field" htmlFor="photo-input">
            <span className="upload-label">Select picture to submit</span>
            <input
              id="photo-input"
              className="upload-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className="upload-hint">PNG, JPG, WEBP supported</span>
          </label>

          {file && (
            <div className="file-meta">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{formattedSize}</p>
            </div>
          )}

          {previewUrl && (
            <div className="preview-wrap">
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="photo-title">Title (optional)</label>
            <input
              id="photo-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Sunset over the mountains"
            />
          </div>

          <div className="input-group">
            <label htmlFor="photo-description">Description (optional)</label>
            <textarea
              id="photo-description"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell viewers about this photo"
            />
          </div>

          <button type="submit" className="submit-photo-btn" id="create-submit-btn">
            Submit Photo
          </button>
        </form>
      </div>
    </section>
  )
}

export default Create
