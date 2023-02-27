import React from 'react'
import { Box } from '@mui/material'
// react icon
import { MdFamilyRestroom } from 'react-icons/md'
import { flexCenter } from '../themes/commonStyles'

function Logo() {
  return (
    <Box sx={flexCenter}>
      <MdFamilyRestroom size={40} color='#2F2FA2' />
    </Box>
  )
}

export default Logo
