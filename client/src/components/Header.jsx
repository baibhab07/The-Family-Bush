import { Box, Button, Container, Stack } from '@mui/material'
import React from 'react'
import Logo from './Logo'
import { dFlex, displayOnDesktop, flexBetweenCenter } from '../themes/commonStyles'

function Header() {
  return (
    <Box
      sx={{
        ...dFlex,
      }}
    >
      <Container maxWidth='xl'>
        <Box
          sx={{
            ...flexBetweenCenter,
            minHeight: 90,
            px: 4,
          }}
        >
          <Box sx={displayOnDesktop}>
            <Logo />
          </Box>

          <Box sx={dFlex}>
            <Stack direction='row' spacing={2}>
              <Button
                variant='contained'
                sx={{
                  borderRadius: 10,
                  border: '1px solid #2F2FA2',
                  backgroundColor: '#2F2FA2',
                }}
              >
                Register
              </Button>
              <Button
                variant='outlined'
                sx={{
                  borderRadius: 10,
                  border: '1px solid #2F2FA2',
                }}
              >
                Log In
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
