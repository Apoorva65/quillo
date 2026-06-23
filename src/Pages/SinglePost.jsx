import { Box, Typography, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Navbar from '../components/Navbar.jsx'
import { useEffect, useState } from 'react'
import { getOnePost } from '../api/posts.js'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SinglePost() {

  const [onePost,setOnePost] = useState();
  const {id} = useParams();

  useEffect(()=>{
    const fetchPost = async () =>{
      const post = await getOnePost(id);
      setOnePost(post);
    }
    fetchPost();
  },[id])

  if(!onePost){
    return null;
  }

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: 'text.secondary',
              width: 'fit-content',
              '&:hover': { color: 'text.primary' },
              transition: 'color 0.15s',
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.85rem' }}>All posts</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EditIcon
              sx={{ fontSize: 18, color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'text.primary' }, transition: 'color 0.15s' }}
              onClick={() => navigate(`/posts/${id}/edit`)}
            />
            <DeleteIcon
              sx={{ fontSize: 18, color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'error.main' }, transition: 'color 0.15s' }}
              onClick={() => console.log('delete')}
            />
          </Box>

        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            mb: 1.5,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          }}
        >
          {onePost.title}
        </Typography>


        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 4 }}>
          {new Date(onePost.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </Typography>

        {/* {onePost.username && <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{onePost.username}</Typography>} */}


        {onePost.image && (
          <Box
            component="img"
            src={onePost.image}
            alt={onePost.title}
            sx={{
              width: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              mb: 5,
              display: 'block',
              maxHeight: 420,
              objectFit: 'cover',
            }}
          />
        )}

        <Divider sx={{ borderColor: 'divider', mb: 4 }} />


        <Box
          sx={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: 'text.primary',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            '& *': {
              maxWidth: '100%',
            },
            '& p': { margin: '0 0 1.2rem' },
            '& img': {
              width: '100%',
              borderRadius: 2,
              display: 'block',
            },
          }}
          dangerouslySetInnerHTML={{ __html: onePost.content }}
        />

      </Box>
    </>
  )
}

export default SinglePost