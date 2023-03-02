import React, { useState } from 'react'
import { TextField, Container, Button, Grid, Box, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()
    if (data.status === 400 || !data) {
      window.alert('Invalid Registration') // eslint-disable-line no-alert
    } else {
      window.alert('Login Successful') // eslint-disable-line no-alert
      console.log(data)
      localStorage.setItem('token', data.token)
      navigate('/homePage')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          component='h1'
          variant='h5'
          sx={{
            color: '#2f2fa2',
          }}
        >
          Login
        </Typography>
        <Box
          component='form'
          sx={{
            mt: 3,
          }}
        />
        <form method='POST'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='email'
                id='email'
                label='Email Address'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 2, mb: 2, backgroundColor: '#2F2FA2' }}
                onClick={loginUser}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <NavLink to='/register' variant='body2'>
              Register Here
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
