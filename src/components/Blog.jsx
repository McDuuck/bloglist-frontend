import { useState, useEffect } from 'react'
import Togglable from './toggle'
import '../index.css'
import blogService from '../services/blogs'
import userService from '../services/users'


const Blog = ({ blog, updateBlog }) => {

  const [userId, setUserId] = useState(null)

  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  userService.getAll().then(users => {
    const user = users.find(user => user.username === currentUser.username)
    setUserId(user.id)
  })

  const deleteBlog = async (blog, updateBlog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        updateBlog(blog.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const likeBlog = async (blog, updateBlog) => {
    const newLikes = ++blog.likes
    const newBlog = {
      ...blog,
      likes: newLikes,
    }
    try {
      await blogService.updateLikes(blog.id, newLikes)
      updateBlog(newBlog)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="blogStyle">
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" id="view_button">
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button onClick={() => likeBlog(blog, updateBlog)} id="like_button" className='like_class'>like</button>
        </p>
        <p>{blog.author}</p>
        {userId && blog.user && userId === blog.user.id &&
          <button onClick={() => deleteBlog(blog, updateBlog)}>remove</button>
        }
      </Togglable>
    </div>
  )
}

export default Blog