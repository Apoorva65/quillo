import { Box, Typography, Divider } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Navbar from '../components/Navbar.jsx';
import { useEffect, useState } from 'react';
import { getMyPosts } from '../api/posts.js';
import { useNavigate } from 'react-router-dom';

function Myposts({}) {

    const navigate = useNavigate();
    const [myposts,setMyposts] = useState([]);

    useEffect(()=>{
      const fetchmyPosts = async()=>{
        const mypost = await getMyPosts();
        setMyposts(mypost);
      }
      fetchmyPosts();
    },[])

  return (
    <>
    <Navbar/>
    <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>
      {myposts.length===0?(
        <Box
            sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'text.secondary',
            }}
        >
            <CreateIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />

            <Typography
            variant="h5"
            sx={{ fontWeight: 500, mb: 1, color: 'text.primary' }}
            >
            No posts yet
            </Typography>

            <Typography sx={{ maxWidth: 400 }}>
            No posts yet.
            You haven't shared anything yet. Click "Write" to publish your first post.
            </Typography>
        </Box>
      ):
        (myposts.map((post, i) => (
        <Box key={post.id}>
          <Box
            sx={{
              py: 4,
              cursor: 'pointer',
              '&:hover': { opacity: 0.75 },
              transition: 'opacity 0.15s',
            }}
            onClick = {()=>navigate(`/post/${post.id}`)}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, mb: 1, fontSize: '1.15rem', lineHeight: 1.4 }}
            >
              {post.title}
            </Typography>

            <Typography
              component="div"
              sx={{
                color: 'text.secondary',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>
            </Box>
          </Box>

          {i < myposts.length - 1 && <Divider sx={{ borderColor: 'divider' }} />}
        </Box>
      )))}
    </Box>
    </>
  )
}

export default Myposts;
