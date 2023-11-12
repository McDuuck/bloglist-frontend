import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const CreatingBlog = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorStatus, setStatus] = useState(null)

  const handleSubmit = async (event) => {

    event.preventDefault()

    const blogObject = {
      author: author,
      title: title,
      url: url,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)

      props.onNewBlog(returnedBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setTimeout(() => {
        setErrorMessage(null)
        setStatus(null)
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null)
        setStatus(null)
      }, 5000)
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
      author:
        <input
          type="text"
          id='author'
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        title:
        <input
          type="text"
          id='title'
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        url:
        <input
          type="text"
          id='url'
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit" id='create'>create</button>
      </form>
    </div>
  )
}

export default CreatingBlog
