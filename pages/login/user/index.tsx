import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Google, Facebook, Instagram } from "@mui/icons-material";
import defaultBackground from "@/assets/background.jpg";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter()
  const handleLogin = () => {
    // Add login logic here
    router.push('/dashboard/user')

  };

  const handleRegistration = () => {
    // Add registration navigation logic here
  };

  const handleSocialLogin = (platform: unknown) => {
    console.log(`Login with ${platform}`);
  };

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("${defaultBackground.src}")`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "max-content",
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          User Login
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box>
            <Typography>Email</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Enter Your Email"
            />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              fullWidth
              margin="normal"
              type="password"
              variant="outlined"
              placeholder="Enter Your Password"

            />
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Box textAlign="center" mt={2}>
          <Link href="/recovery">Forgot Password?</Link>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" align="center" gutterBottom>
          Or sign in with:
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialLogin("Google")}
            fullWidth={true}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            startIcon={<Facebook />}
            onClick={() => handleSocialLogin("Facebook")}
            fullWidth={true}
          >
            Facebook
          </Button>
          <Button
            variant="outlined"
            startIcon={<Instagram />}
            onClick={() => handleSocialLogin("Instagram")}
            fullWidth={true}
          >
            Instagram
          </Button>
        </Box>

        <Box textAlign="center" mt={3}>
          <Link
            href="/register"
            sx={{ textDecoration: "none" }}
            onClick={handleRegistration}
          >
            Have not registered yet? Join us!
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
