import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { flexCenter } from '../themes/commonStyles'

function HomePage() {
  const [name, setName] = useState('')

  const homePage = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
      setName(data.name)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    homePage()
  }, [])

  return (
    <Box sx={flexCenter}>
      <Typography>Welcome</Typography>
      <Typography>{name}</Typography>
      <Box>
        <Typography>,to The Family Bush</Typography>
      </Box>
    </Box>
  )
}

export default HomePage
