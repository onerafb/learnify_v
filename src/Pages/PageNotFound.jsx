import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="container flex-column">
      <h1 className="mg-top text-align-center">404 | Error</h1>
      <h2 className="mg-top mg-bt text-align-center">Page Not Found !</h2>
      <Link to="/">
          <button className='btn'>Go to home</button>
        </Link>
    </div>
  )
}

export default PageNotFound
