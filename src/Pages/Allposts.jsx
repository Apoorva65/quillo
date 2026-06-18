import { Box, Typography, Divider } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Navbar from '../components/Navbar.jsx';

function Allposts({allPosts}) {
  return (
    <>
    <Navbar/>
    <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>
      {/* Post list */}
      {allPosts.length===0?(
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
            Looks a little quiet here. Be the first to share something with the
            community.
            </Typography>
        </Box>
      ):
        (allPosts.map((post, i) => (
        <Box key={post.id}>
          <Box
            sx={{
              py: 4,
              cursor: 'pointer',
              '&:hover': { opacity: 0.75 },
              transition: 'opacity 0.15s',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, mb: 1, fontSize: '1.15rem', lineHeight: 1.4 }}
            >
              {post.title}
            </Typography>

            <Typography
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
            >
              {post.content}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {post.username}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>·</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>
            </Box>
          </Box>

          {i < allPosts.length - 1 && <Divider sx={{ borderColor: 'divider' }} />}
        </Box>
      )))}
    </Box>
    </>
  )
}

export default Allposts;