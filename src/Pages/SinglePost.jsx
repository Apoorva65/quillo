import { Box, Typography, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Navbar from '../components/Navbar.jsx'
import { useEffect, useState } from 'react'
import { getOnePost, updatePost, deletePost } from '../api/posts.js'
import { useParams, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function SinglePost({ toggle, setToggle }) {

  const [onePost, setOnePost] = useState()
  const { id } = useParams()
  const currentUserId = Number(localStorage.getItem('userId'))
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getOnePost(id)
      setOnePost(post)
    }
    fetchPost()
  }, [id])

  if (!onePost) return null

  async function handleDelete() {
    try {
      await deletePost(id)
      setToggle(!toggle)
      navigate('/my-posts')
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <>
      <Navbar />
      {error && (
        <Typography color="error" sx={{ fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>

        {/* Top nav row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              cursor: 'pointer', color: 'text.secondary', width: 'fit-content',
              '&:hover': { color: 'text.primary' }, transition: 'color 0.15s',
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.85rem' }}>All posts</Typography>
          </Box>

          {onePost.user_id === currentUserId && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EditIcon
                sx={{ fontSize: 18, color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'text.primary' }, transition: 'color 0.15s' }}
                onClick={() => navigate(`/posts/edit/${onePost.id}`)}
              />
              <DeleteIcon
                sx={{ fontSize: 18, color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'error.main' }, transition: 'color 0.15s' }}
                onClick={handleDelete}
              />
            </Box>
          )}
        </Box>


        <Typography
          variant="h4"
          sx={{ fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', mb: 1.5, fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}
        >
          {onePost.title}
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          {onePost.username && (
            <>
              <Box
                sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary', flexShrink: 0,
                }}
              >
                {onePost.username[0].toUpperCase()}
              </Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.primary' }}>
                {onePost.username}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>·</Typography>
            </>
          )}
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            {new Date(onePost.created_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </Typography>
        </Box>


        {onePost.image && (
          <Box
            component="img"
            src={onePost.image}
            alt={onePost.title}
            sx={{
              width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider',
              mb: 5, display: 'block', maxHeight: 420, objectFit: 'cover',
            }}
          />
        )}

        <Divider sx={{ borderColor: 'divider', mb: 4 }} />


        <Box
          sx={{
            fontSize: '1.0625rem', lineHeight: 1.8, color: 'text.primary',
            overflowWrap: 'break-word', wordBreak: 'break-word',
            '& *': { maxWidth: '100%' },
            '& p': { mb: 2 },
            '& h2': { fontSize: '1.375rem', fontWeight: 600, mt: 4, mb: 1.5, letterSpacing: '-0.015em' },
            '& h3': { fontSize: '1.125rem', fontWeight: 600, mt: 3, mb: 1 },
            '& blockquote': {
              borderLeft: '2px solid', borderColor: 'primary.main', borderRadius: 0,
              pl: 2.5, py: 0.5, my: 3, fontStyle: 'italic', color: 'text.secondary',
            },
            '& code': {
              fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '0.875em',
              bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
              borderRadius: '4px', px: 0.75, py: 0.25, color: 'text.secondary',
            },
            '& pre': {
              bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
              borderRadius: 2, p: 2.5, overflow: 'auto', my: 3,
            },
            '& img': { width: '100%', borderRadius: 2, display: 'block' },
          }}
          dangerouslySetInnerHTML={{ __html: onePost.content }}
        />

      </Box>
    </>
  )
}

export default SinglePost