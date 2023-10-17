/* eslint-disable no-undef */
import { useAuth } from '../context/AuthProvider'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../components/styles/header.scss'

const Header = () => {
  const { user, signOut, auth } = useAuth()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const { error } = await signOut()
      console.log(error)
    } catch (error) {
      console.log(error)
    }
  }

  const parallaxHeight = () => {
    let scroll_top = window.scrollY
    let header_height = document.querySelector(
      '.sample-header-section',
    ).offsetHeight

    document.querySelector(
      '.sample-section',
    ).style.marginTop = `${header_height}px`
    document.querySelector('.sample-header').style.height = `${
      header_height - scroll_top
    }px`
  }

  useEffect(() => {
    parallaxHeight()

    const handleScroll = () => {
      parallaxHeight()
    }

    const handleResize = () => {
      parallaxHeight()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="sample-header">
        <div className="sides">
          {auth && (
            <Link to="/" className="logo" style={{ color: '#eee' }}>
              CREATORVERSE
            </Link>
          )}
        </div>
        <div className="sides">
          {auth && (
            <button
              onClick={handleLogout}
              className="menu"
              style={{ color: '#eee' }}
            >
              LOGOUT
            </button>
          )}
        </div>
        <div className="sample-header-section">
          <h1 className="title-header">CREATOR VERSE</h1>
          <h3 className="welcome-header">Welcome {user.email} !🌟</h3>
          <div className="button-general">
            <Link to="/dashboard">
              <button className="button-dashboard">Add Creator</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
