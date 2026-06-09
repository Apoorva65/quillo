import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import LandingPage from './Pages/LandingPage'
import AuthPage from './Pages/AuthPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <LandingPage /> */}
      <AuthPage/>
    </ThemeProvider>
  )
}
export default App
