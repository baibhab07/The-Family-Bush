/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { FullscreenControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import RoomIcon from '@mui/icons-material/Room'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import { format } from 'timeago.js'

function Location() {
  const [locations, setLocations] = React.useState([])
  const [currentLocationId, setcurrentLocationId] = React.useState(null)
  const [viewState, setViewState] = React.useState({
    longitude: 85,
    latitude: 28,
    zoom: 4,
  })

  React.useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await axios.get('/location')
        setLocations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getLocations()
  }, [])

  const handleMarkerClick = (id) => {
    setcurrentLocationId(id)
  }

  return (
    <div className='App'>
      <Map
        {...viewState}
        onMove={(nextViewState) => setViewState(nextViewState)}
        style={{ width: '500px', height: '500px', borderRadius: '15px', border: '2px solid red' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        {locations.map((location) => (
          <>
            <Marker
              longitude={location.longitude}
              latitude={location.latitude}
              offseLeft={-20}
              offsetTop={-10}
            >
              <RoomIcon
                style={{ fontSize: viewState.zoom * 7, color: 'red', cursor: 'pointer' }}
                onClick={handleMarkerClick(location._id)}
              />
            </Marker>
            {location._id === currentLocationId && (
              <Popup
                longitude={location.longitude}
                latitude={location.latitude}
                anchor='left'
                closeButton
                closeOnClick={false}
                onClose={() => setcurrentLocationId(null)}
              >
                <Box>
                  <Typography variant='h6'>Address</Typography>
                  <Typography variant='h4'>{location.address}</Typography>
                  <Box>
                    Created By <b>{location.userId}</b>
                  </Box>
                  <Box>{format(location.createdAt)}</Box>
                </Box>
              </Popup>
            )}
          </>
        ))}
        <NavigationControl />
        <FullscreenControl />
      </Map>
    </div>
  )
}

export default Location
