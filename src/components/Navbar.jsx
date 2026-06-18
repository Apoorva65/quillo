import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              p: 0,
              minWidth: "auto",
            }}
            onClick={()=>navigate('/')}
          >
            <CreateIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Quillo
            </Typography>
          </Button>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
          onClick={()=>navigate('/login')}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;