import { Box, Typography, Divider, Chip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Navbar from '../components/Navbar.jsx'

function SinglePost({ post }) {
  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>

        {/* Back link */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 5,
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

        {/* Category tag */}
        {post.category && (
          <Typography
            sx={{
              display: 'inline-block',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              border: '0.5px solid',
              borderColor: 'divider',
              borderRadius: '4px',
              px: 1.25,
              py: 0.4,
              mb: 2,
            }}
          >
            {post.category}
          </Typography>
        )}

        {/* Title */}
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
          {post.title}
        </Typography>

        {/* Meta row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pb: 3,
            mb: 4,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'text.secondary',
              flexShrink: 0,
            }}
          >
            {post.username?.[0]?.toUpperCase()}
          </Box>

          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.primary' }}>
            {post.username}
          </Typography>

          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>·</Typography>

          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Typography>
        </Box>

        {/* Post body */}
        <Box
          sx={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: 'text.primary',

            'p': { mb: 2 },
            'h2': {
              fontSize: '1.375rem',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              mt: 4,
              mb: 1.5,
              lineHeight: 1.3,
              color: 'text.primary',
            },
            'h3': {
              fontSize: '1.125rem',
              fontWeight: 600,
              mt: 3,
              mb: 1,
              color: 'text.primary',
            },
            'blockquote': {
              borderLeft: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 0,
              pl: 2.5,
              py: 0.5,
              my: 3,
              fontStyle: 'italic',
              fontSize: '1.0625rem',
              color: 'text.secondary',
              lineHeight: 1.7,
            },
            'a': {
              color: 'text.primary',
              textDecorationColor: 'divider',
              textUnderlineOffset: '3px',
              '&:hover': { textDecorationColor: 'text.secondary' },
            },
            'code': {
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: '0.875em',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '4px',
              px: 0.75,
              py: 0.25,
              color: 'text.secondary',
            },
            'pre': {
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 2.5,
              overflow: 'auto',
              my: 3,
              'code': {
                bgcolor: 'transparent',
                border: 'none',
                p: 0,
                fontSize: '0.875rem',
                color: 'text.primary',
                lineHeight: 1.7,
              },
            },
            'img': {
              width: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              my: 3,
              display: 'block',
            },
            'figcaption': {
              fontSize: '0.8rem',
              color: 'text.secondary',
              textAlign: 'center',
              mt: 1,
            },
            'ul, ol': { pl: 3, my: 2 },
            'li': { mb: 0.5 },
            'hr': {
              border: 'none',
              borderTop: '1px solid',
              borderColor: 'divider',
              my: 4,
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <Divider sx={{ borderColor: 'divider', mt: 6, mb: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <Typography
                  key={tag}
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    border: '0.5px solid',
                    borderColor: 'divider',
                    borderRadius: '4px',
                    px: 1.25,
                    py: 0.5,
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'text.secondary', color: 'text.primary' },
                    transition: 'all 0.15s',
                  }}
                >
                  {tag}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

      </Box>
    </>
  )
}

export default SinglePost