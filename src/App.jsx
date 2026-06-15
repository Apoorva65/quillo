import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import LandingPage from './Pages/LandingPage'
import AuthPage from './Pages/AuthPage'
import { useState } from 'react'

function App() {

  const [posts,setPosts] = useState([]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <LandingPage /> */}
      <AuthPage/>
    </ThemeProvider>
  )
}
export default App
