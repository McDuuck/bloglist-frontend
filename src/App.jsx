import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/login_form'
import CreatingBlog from './components/creating_blog'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LogOut from './components/logout'
import Togglable from './components/toggle'
import './index.css'




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setIsLoggedIn(true)
    }
  }, [])

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  const handleSuccessfulLogin = (user) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    setIsLoggedIn(true)
  }

  const handleSuccessfulLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setIsLoggedIn(false)
  }

  const handleNewBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog])
    setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    blogFormRef.current.toggleVisibility()
  }

  const showAllBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage}/>
      <h1>Blogs</h1>
      {isLoggedIn && <LogOut onLogout={handleSuccessfulLogOut} />}
      {!isLoggedIn && <Togglable buttonLabel="Login" id="login_click">
        <LoginForm onLogin={handleSuccessfulLogin} />
      </Togglable> }
      {isLoggedIn && <Togglable buttonLabel="New Blog" id="new_blog" ref={blogFormRef}>
        <CreatingBlog onNewBlog={handleNewBlog} />
      </Togglable>}
      {isLoggedIn && showAllBlogs()}

    </div>
  )
}

export default App
