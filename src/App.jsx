import { useState, useEffect } from 'react'
import TrainingOfferFormTemp3 from './components/TrainingOfferFormTemp3'
import LoginForm from './components/LoginForm'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleLogin = (newToken) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {token ? (
        <>
          <button
            onClick={handleLogout}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
          <TrainingOfferFormTemp3 />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
