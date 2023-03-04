/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import axios from 'axios'
import './Gallery.css'

function Button({ setUpdateUI }) {
  const handleChange = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', e.target.files[0])

    axios
      .post('/api/photos', formData)
      .then((res) => {
        console.log(res.data)
        setUpdateUI(res.data._id)
      })
      .catch((err) => console.log(err))
  }

  return (
    <label className='button' htmlFor='file_picker'>
      <AddCircleIcon />
      <input
        hidden
        type='file'
        name='file_picker'
        id='file_picker'
        onChange={(e) => handleChange(e)}
      />
    </label>
  )
}

export default Button
