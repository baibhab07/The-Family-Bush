import { Box, Paper, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { flexCenter } from '../themes/commonStyles'
import Logo from './Logo'
import Sidebar from './Sidebar'

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
    <Stack direction='row'>
      <Paper sx={{ width: 240, height: '100vh' }}>
        <Logo />
        <Sidebar />
      </Paper>
      <Paper sx={{ flexGrow: 1 }}>
        <Box sx={flexCenter} marginTop={7}>
          <Typography>Welcome</Typography>
          <Typography>{name}</Typography>
          <Box>
            <Typography>,to The Family Bush</Typography>
          </Box>
        </Box>
      </Paper>
    </Stack>
  )
}

export default HomePage
