import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import LandingPage from './Pages/LandingPage.jsx'
import AuthPage from './Pages/AuthPage.jsx'
import Allposts from './Pages/Allposts.jsx'
import Navbar from './components/Navbar.jsx'
import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import {getAllPosts} from './api/posts.js'
import Myposts from './Pages/Myposts.jsx'
import Createpost from './Pages/Createpost.jsx'
import SinglePost from './Pages/SinglePost.jsx'

function App() {

  const [posts,setPosts] = useState([]);
  const [toggle,setToggle] = useState(true);

  useEffect(()=>{
     getAllPosts().then(setPosts).catch(console.error)
  },[toggle])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<AuthPage/>}/>
        <Route path='/posts' element={<Allposts  allPosts={posts}/>}/>
        <Route path='/my-posts' element={<Myposts/>}/>
        <Route path='/create' element={<Createpost toggle={toggle} setToggle={setToggle}/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
      </Routes>
    </ThemeProvider>
  )
}
export default App
