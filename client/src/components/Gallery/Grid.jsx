/* eslint-disable react/prop-types */
import React from 'react'
import './Gallery.css'

function Grid({ photos }) {
  return (
    <>
      <h1>Our Gallery</h1>
      <div className='grid'>
        {photos.map(({ photo, _id }) => (
          <div key={_id} className='grid__item'>
            <img src={`http://localhost:4000/uploads/${photo}`} alt='grid_image' />
          </div>
        ))}
      </div>
    </>
  )
}

export default Grid
