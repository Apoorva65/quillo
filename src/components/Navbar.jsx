import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "blur(10px)",
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
          py: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              p: 0,
              minWidth: "auto",
            }}
          >
            <CreateIcon sx={{ mr: 1 }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Quillo
            </Typography>
          </Button>
        </Box>

        {/* Right Side */}
        {token ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/create")}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                px: 3,
              }}
            >
              Write
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate("/my-posts")}
              sx={{
                textTransform: "none",
              }}
            >
              My Posts
            </Button>

            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 3,
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;