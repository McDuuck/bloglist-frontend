import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import userService from '../services/users'


describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Test Title by Test Author')
    expect(titleElement).toBeDefined()
  })

})