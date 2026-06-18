import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import LandingPage from './Pages/LandingPage.jsx'
import AuthPage from './Pages/AuthPage.jsx'
import Allposts from './Pages/Allposts.jsx'
import Navbar from './components/Navbar.jsx'
import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import {getAllPosts} from './api/posts.js'

function App() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
     getAllPosts().then(setPosts).catch(console.error)
  },[])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<AuthPage/>}/>
        <Route path='/posts' element={<Allposts  allPosts={posts}/>}/>
      </Routes>
    </ThemeProvider>
  )
}
export default App
