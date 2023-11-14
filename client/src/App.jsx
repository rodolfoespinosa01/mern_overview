import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import axios from 'axios'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

import { useStore } from './store'

function App() {
  const { setState } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/auth/authenticate')
      .then(res => {
        setState((oldState) => {
          return {
            ...oldState,
            user: res.data.user
          }
        })
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ? (
        <h3 className="d-flex justify-content-center align-items-center vh-100">Loading...</h3>
      ) : (
        <>
          <Header />

          <Container>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Auth isLogin={false} />} />
              <Route path="/login" element={<Auth isLogin={true} />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </>
      )}
    </>
  )
}

export default App
