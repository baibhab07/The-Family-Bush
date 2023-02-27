import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, TextField, Button, Grid, Card, CardMedia, CardContent } from '@mui/material'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}))

function App() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title, image)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)

    axios
      .post('http://localhost:4000/gallery', formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={classes.root}>
      <Typography variant='h5' component='h2'>
        Add Title and Upload Image
      </Typography>
      <form>
        <TextField
          label='Title'
          value={title}
          onChange={handleTitleChange}
          margin='normal'
          fullWidth
        />
        <input
          type='file'
          onChange={handleImageChange}
          accept='image/*'
          style={{ display: 'none' }}
          ref={(input) => {
            if (input) {
              input.click()
            }
          }}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Upload Image
        </Button>
        <Button type='submit' variant='contained' color='secondary'>
          Add
        </Button>
      </form>
      <Typography variant='h5' component='h2'>
        Display Title and Images
      </Typography>
      <Grid container spacing={2}>
        {images.map((img, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={URL.createObjectURL(img.image)}
                title={img.title}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {img.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default App
