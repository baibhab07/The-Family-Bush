/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import axios from 'axios'
import Grid from './Grid'
import Button from './Button'

function Gallery() {
  const [photos, setPhotos] = React.useState([])
  const [updateUI, setUpdateUI] = React.useState('')

  React.useEffect(() => {
    axios
      .get('/api/photos')
      .then((res) => {
        console.log(res.data)
        setPhotos(res.data)
      })
      .catch((err) => console.log(err))
  }, [updateUI])

  return (
    <>
      {/* Grid */}
      <Grid photos={photos} />
      {/* Button */}
      <Button setUpdateUI={setUpdateUI} />
    </>
  )
}

export default Gallery
