import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './toggle'

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      {blogs.map(blog =>
        <Togglable key={blog.id} buttonLabel="view">
          <Blog blog={blog} id="all_blogs" />
        </Togglable>
      )}
    </div>
  )
}
export default AllBlogs