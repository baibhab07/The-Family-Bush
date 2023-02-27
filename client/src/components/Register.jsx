/* eslint-disable no-shadow */
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [showYesTextField, setShowYesTextField] = useState(false)
  const [showNoTextField, setShowNoTextField] = useState(false)

  const handleYesCheckBoxChange = useCallback((e) => {
    setShowYesTextField(e.target.checked)
  })

  const handleNoCheckBoxChange = useCallback((e) => {
    setShowNoTextField(e.target.checked)
  })

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    familyId: '',
  })

  let name
  let value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const createFamily = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword, familyName } = user

    const res = await fetch('/createFamily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        familyName,
      }),
    })

    const data = await res.json()
    if (data.status === 422 || !data) {
      window.alert('Invalid Registration') // eslint-disable-line no-alert
    } else {
      window.alert('Registation Successful') // eslint-disable-line no-alert
      navigate('/login')
    }
  }

  const joinFamily = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword, familyId } = user

    const res = await fetch('/joinFamily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        familyId,
      }),
    })

    const data = await res.json()
    if (data.status === 422 || !data) {
      window.alert('Invalid Registration') // eslint-disable-line no-alert
    } else {
      window.alert('Registation Successful') // eslint-disable-line no-alert
      navigate('/login')
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
          Register
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
                name='name'
                id='name'
                label='Full Name'
                type='text'
                value={user.name}
                onChange={handleInputs}
                autoFocus
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='email'
                id='email'
                label='Email Address'
                type='email'
                value={user.email}
                onChange={handleInputs}
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
                value={user.password}
                onChange={handleInputs}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='confirmPassword'
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                value={user.confirmPassword}
                onChange={handleInputs}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Do you have a family?</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleYesCheckBoxChange}
                    checked={showYesTextField}
                    value='allowExtraEmails'
                    color='primary'
                  />
                }
                label='Yes'
              />
              {showYesTextField && (
                <Box>
                  <TextField
                    required
                    fullWidth
                    name='familyId'
                    id='familyId'
                    label='Enter Family ID'
                    type='text'
                    value={user.familyId}
                    onChange={handleInputs}
                    autoComplete='off'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 2, mb: 2, backgroundColor: '#2F2FA2' }}
                    onClick={joinFamily}
                  >
                    Join a Family
                  </Button>
                </Box>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleNoCheckBoxChange}
                      checked={showNoTextField}
                      value='allowExtraEmails'
                      color='primary'
                    />
                  }
                  label='No'
                />
                {showNoTextField && (
                  <Box>
                    <TextField
                      required
                      fullWidth
                      name='familyName'
                      label='Enter a Family Name'
                      type='text'
                      id='familyName'
                      value={user.familyName}
                      onChange={handleInputs}
                      autoComplete='new-password'
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 2, mb: 2, backgroundColor: '#2F2FA2' }}
                      onClick={createFamily}
                    >
                      Create a Family
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <NavLink to='/login' variant='body2'>
              Already have an account? Sign in
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register
