import { Box, Button, Typography, Divider } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5 }}>
        <CreateIcon sx={{ fontSize: 32, color: 'text.primary' }} />
        <Typography variant="h5" sx={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
          Quillo
        </Typography>
      </Box>


      <Typography
        variant="h2"
        sx={{
          fontWeight: 500,
          fontSize: { xs: '2rem', md: '3rem' },
          maxWidth: 520,
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        A place for ideas worth sharing
      </Typography>


      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          maxWidth: 400,
          lineHeight: 1.8,
          mb: 5,
          fontSize: '1.05rem',
        }}
      >
        Read thoughtful posts from writers who care. No noise, no algorithm — just writing.
      </Typography>


      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/posts')}
          sx={{
            px: 4,
            py: 1.5,
            backgroundColor: 'text.primary',
            color: 'background.default',
            fontWeight: 500,
            borderRadius: '8px',
            '&:hover': { backgroundColor: 'grey.300' },
          }}
        >
          Start reading
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            px: 4,
            py: 1.5,
            borderColor: 'divider',
            color: 'text.primary',
            fontWeight: 500,
            borderRadius: '8px',
            '&:hover': { borderColor: 'text.secondary', backgroundColor: 'transparent' },
          }}
        >
          Write a post →
        </Button>
      </Box>

  
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          mt: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { label: 'Clean', sub: 'No distractions' },
          { label: 'Open', sub: 'Read without signing up' },
          { label: 'Yours', sub: 'Own your writing' },
        ].map((item, i, arr) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>{item.label}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.82rem', mt: 0.5 }}>
                {item.sub}
              </Typography>
            </Box>
            {i < arr.length - 1 && (
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider', height: 36, alignSelf: 'center' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LandingPage