import {
  CalendarMonth,
  Collections,
  FamilyRestroom,
  FormatListBulleted,
  Forum,
  LocationOn,
  Paid,
} from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

function Sidebar() {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position='fixed'>
        <List>
          <ListItem disablePadding />
          <ListItem disablePadding>
            <ListItemButton component='a' href='#family'>
              <ListItemIcon>
                <FamilyRestroom />
              </ListItemIcon>
              <ListItemText primary='Family' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#tasks'>
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary='Tasks' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#calendar'>
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary='Calendar' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#gallery'>
              <ListItemIcon>
                <Collections />
              </ListItemIcon>
              <ListItemText primary='Gallery' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#message'>
              <ListItemIcon>
                <Forum />
              </ListItemIcon>
              <ListItemText primary='Message' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#expense'>
              <ListItemIcon>
                <Paid />
              </ListItemIcon>
              <ListItemText primary='Expense' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#location'>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary='Location' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
