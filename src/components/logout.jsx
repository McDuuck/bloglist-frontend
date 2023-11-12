import { useState, useEffect } from 'react'

const LogOut = (props) => {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.onLogout(false)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <p>{user ? `${user.name} logged in ` : 'Not logged in '}
        <button onClick={handleLogout} id='logout'>logout</button>
      </p>
    </div>
  )
}

export default LogOut