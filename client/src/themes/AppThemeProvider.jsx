// /* eslint-disable react/destructuring-assignment */
// import React from 'react'
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { white, pink } from '@mui/material/colors'

// const theme = createTheme({
//   typography: {
//     allVariants: {
//       fontFamily: 'Raleway',
//       textTransform: 'none',
//       fontSize: 15,
//     },
//   },
//   palette: {
//     primary: {
//       main: pink[500],
//     },
//     secondary: {
//       main: white,
//     },
//   },
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         sx: {
//           px: 1,
//         },
//         variant: 'subtitle2',
//         textTransform: 'capitalize',
//       },
//     },
//     MuiButton: {
//       defaultProps: {
//         size: 'small',
//         p: 0,
//         disableRipple: true,
//       },
//       variant: 'text',
//     },
//   },
// })

// function AppThemeProvider(prop) {
//   return <ThemeProvider theme={theme}> {prop.children}</ThemeProvider>
// }

// export default AppThemeProvider
