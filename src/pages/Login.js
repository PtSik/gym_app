import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import GoogleIconSVG from "../assets/icons/google-icon.svg";

export const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert(`Błąd logowania przez Google: ${error.message}`);
      });
  };

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setUsername("");
  };

  const handleSignUp = () => {
    if (!email || !password || !username) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error(
              "Błąd przy aktualizacji profilu użytkownika: ",
              error
            );
          });
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
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  if (user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography>Jesteś już zalogowany.</Typography>
          <Button onClick={handleSignOut} variant="outlined">
            Wyloguj się
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
          mt: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {isSignUpActive ? "Zarejestruj się" : "Zaloguj się"}
        </Typography>
        <TextField
          label="Nazwa użytkownika" // Warunkowe renderowanie pola dla nazwy użytkownika
          type="text"
          variant="outlined"
          required={isSignUpActive} // Pole wymagane tylko przy rejestracji
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mt: 2, display: isSignUpActive ? "flex" : "none" }} // Ukryj pole, gdy logowanie
        />
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
        <Button
          variant="contained"
          color="primary"
          onClick={isSignUpActive ? handleSignUp : handleSignIn}
          sx={{ mt: 2, mb: 0 }}
        >
          {isSignUpActive ? "Zarejestruj się" : "Zaloguj się"}
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <img
              src={GoogleIconSVG}
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
          }
          onClick={handleGoogleSignIn}
          sx={{
            mt: 2,
            mb: 2,
            color: "primary",
            borderColor: "#757575",
            textTransform: "none",
            ":hover": {
              borderColor: "#757575",
            },
          }}
        >
          Zaloguj się przez Google
        </Button>
        <Button variant="text" onClick={handleMethodChange}>
          {isSignUpActive
            ? "Masz już konto? Zaloguj się"
            : "Nie masz konta? Zarejestruj się"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
