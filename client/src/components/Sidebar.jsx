import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  FormatListBulleted,
  CalendarMonth,
  Message,
  Paid,
  Collections,
  LocationOn,
  ExitToApp,
} from '@mui/icons-material'

function Sidebar() {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position='fixed'>
        <List>
          <ListItem disablePadding />
          <Link to='/todo' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FormatListBulleted />
                </ListItemIcon>
                <ListItemText primary='Todo' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/calendar' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary='Calendar' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/message' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary='Message' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/expense' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Paid />
                </ListItemIcon>
                <ListItemText primary='Expense' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/gallery' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Collections />
                </ListItemIcon>
                <ListItemText primary='Gallery' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/location' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary='Location' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/logout' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
