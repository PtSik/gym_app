import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, TextField, Typography, Stack } from '@mui/material';

export const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert(`Błąd rejestracji: ${error.message}`);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert(`Błąd logowania: ${error.message}`);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.error(error.message);
    });
  };

  if (user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Stack spacing={2} alignItems="center">
          <Typography>Jesteś już zalogowany.</Typography>
          <Button onClick={handleSignOut} variant="outlined">Wyloguj się</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>
      <Box component="form"   sx={{ 
    '& .MuiTextField-root': { m: 1 }, 
    p: 3, 
    boxShadow: 3, 
    borderRadius: 2, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    width: '100%', 
    maxWidth: '500px', 
    mt: 2 
  }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{isSignUpActive ? "Zarejestruj się" : "Zaloguj się"}</Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Hasło"
          type="password"
          variant="outlined"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={isSignUpActive ? handleSignUp : handleSignIn} sx={{ mt: 2, mb: 2 }}>
          {isSignUpActive ? "Zarejestruj się" : "Zaloguj się"}
        </Button>
        <Button variant="text" onClick={handleMethodChange}>
          {isSignUpActive ? "Masz już konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
