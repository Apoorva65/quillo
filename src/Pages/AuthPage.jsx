import { useState } from 'react'
import { Box, Button, TextField, Typography, Divider } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import {signup,loginn} from '../api/auth.js'
import {useNavigate} from 'react-router-dom'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [username,setUsername] = useState('');
  const [error, setError] = useState('');

  const naviagte = useNavigate();

  async function authHandle(e) {
    e.preventDefault();

    try {
      if (isLogin) {
        await loginn(email, password);
        naviagte('/posts');
      } else {
        await signup(email, username, password);
        naviagte('/posts');
      }
  } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          backgroundColor: 'background.paper',
          border: '0.5px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          p: 4,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <CreateIcon sx={{ fontSize: 22, color: 'text.primary' }} />
          <Typography sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Quillo</Typography>
        </Box>

        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
          {isLogin ? 'Welcome back' : 'Create an account'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', mb: 3 }}>
          {isLogin ? 'Sign in to continue writing' : 'Start sharing your ideas today'}
        </Typography>

        {/* Form */}
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!isLogin && (
            <TextField label="Username" size="small" fullWidth value={username} onChange={(e)=>setUsername(e.target.value)}/>
          )}
          <TextField label="Email" type="email" size="small" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField label="Password" type="password" size="small" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {error && (
            <Typography
              color="error"
              sx={{
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              py: 1.2,
              backgroundColor: 'text.primary',
              color: 'background.default',
              fontWeight: 500,
              borderRadius: '8px',
              '&:hover': { backgroundColor: 'grey.300' },
            }}
            onClick={authHandle}
          >
            {isLogin ? 'Sign in' : 'Create account'}
          </Button>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        {/* Switch */}
        <Typography sx={{ textAlign: 'center', fontSize: '0.88rem', color: 'text.secondary' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Box
            component="span"
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              color: 'text.primary',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

export default AuthPage