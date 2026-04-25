const USERS_STORAGE_KEY = 'unsplashCloneUsers'
const SESSION_STORAGE_KEY = 'unsplashCloneCurrentUser'

const normalizeEmail = (email = '') => email.trim().toLowerCase()

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export const registerUser = ({ name, email, password }) => {
  const trimmedName = name.trim()
  const normalizedEmail = normalizeEmail(email)
  const trimmedPassword = password.trim()

  if (!trimmedName || !normalizedEmail || !trimmedPassword) {
    return {
      success: false,
      message: 'All fields are required.',
    }
  }

  const users = readUsers()
  const alreadyExists = users.some((user) => user.email === normalizedEmail)

  if (alreadyExists) {
    return {
      success: false,
      message: 'This email is already registered. Please log in.',
    }
  }

  const newUser = {
    id: Date.now(),
    name: trimmedName,
    email: normalizedEmail,
    password: trimmedPassword,
    createdAt: new Date().toISOString(),
  }

  saveUsers([...users, newUser])
  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    })
  )

  return { success: true, user: newUser }
}

export const loginUser = ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email)
  const trimmedPassword = password.trim()

  if (!normalizedEmail || !trimmedPassword) {
    return {
      success: false,
      message: 'Email and password are required.',
    }
  }

  const users = readUsers()
  const foundUser = users.find((user) => user.email === normalizedEmail)

  if (!foundUser || foundUser.password !== trimmedPassword) {
    return {
      success: false,
      message: 'Invalid email or password.',
    }
  }

  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    })
  )

  return { success: true, user: foundUser }
}

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const logoutUser = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}
