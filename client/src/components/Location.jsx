/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl'
import RoomIcon from '@mui/icons-material/Room'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import { format } from 'timeago.js'

function Location() {
  const [locations, setLocations] = React.useState([])
  const [currentLocationId, setcurrentLocationId] = React.useState(null)
  const [newPlace, setNewPlace] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [viewState, setViewState] = React.useState({
    longitude: 85,
    latitude: 28,
    zoom: 6,
  })

  const handleMarkerClick = React.useCallback(
    (id, lat, long) => () => {
      setcurrentLocationId(id)
      setViewState({ ...viewState, latitude: lat, longitude: long })
    },
    [],
  )

  const handleAddClick = (event) => {
    console.log(event)
    setNewPlace({
      lat: event.lngLat.lat,
      long: event.lngLat.lng,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newLocation = {
      address,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    try {
      const res = await axios.post('/api/locations', newLocation)
      setLocations([...locations, res.data])
      setNewPlace(null)
    } catch (err) {
      console.log(err)
    }
  }

  const getLocations = React.useCallback(async () => {
    try {
      const allLocations = await axios.get('/api/locations')
      setLocations(allLocations.data)
      console.log(locations)
    } catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(() => {
    getLocations()
  }, [])

  return (
    <div className='App'>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh', borderRadius: '15px', border: '2px solid red' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
      >
        {locations.map((location) => (
          <>
            <Marker
              longitude={location.long}
              latitude={location.lat}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <RoomIcon
                style={{ fontSize: viewState.zoom * 7, color: 'red', cursor: 'pointer' }}
                onClick={handleMarkerClick(location._id, location.long, location.lat)}
              />
            </Marker>
            {location._id === currentLocationId && (
              <Popup
                key={location._id}
                longitude={location.long}
                latitude={location.lat}
                closeButton
                closeOnClick={false}
                onClose={() => setcurrentLocationId(null)}
                anchor='left'
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
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <RoomIcon
                style={{
                  fontSize: 7 * viewState.zoom,
                  color: 'red',
                  cursor: 'pointer',
                }}
              />
            </Marker>
            <Popup
              longitude={newPlace.long}
              latitude={newPlace.lat}
              anchor='left'
              closeButton
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
            >
              <Box>
                <form onSubmit={handleSubmit}>
                  <label>Address</label>
                  <input
                    placeholder='Enter your address'
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button type='submit'>Add Location</button>
                </form>
              </Box>
            </Popup>
          </>
        )}
        <NavigationControl />
        <FullscreenControl />
        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} />
      </Map>
    </div>
  )
}

export default Location
