import React, { useState } from "react";
import { auth, storage } from "../firebase"; // Upewnij się, że storage jest poprawnie importowane
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  Box,
  Button,
  Avatar,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UserProfile = () => {
  const [setImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // Dodano dla ponownego uwierzytelnienia
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    // Teraz 'file' jest argumentem
    const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
    try {
      await uploadBytes(imageRef, file);
      const photoURL = await getDownloadURL(imageRef);
      await updateProfile(auth.currentUser, { photoURL });
      window.location.reload(); // Dodane odświeżenie strony
    } catch (error) {
      console.error("Błąd podczas przesyłania zdjęcia: ", error);
      alert("Nie udało się zaktualizować zdjęcia profilowego.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword === "") {
      alert("Proszę wprowadzić nowe hasło.");
      return;
    } else if (newPassword !== confirmNewPassword) {
      alert("Hasła nie są takie same.");
      return;
    }
    // Ponowne uwierzytelnienie przed zmianą hasła
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Hasło zostało zaktualizowane.");
      // Czyszczenie pól formularza
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Błąd podczas zmiany hasła: ", error);
      if (error.code === "auth/wrong-password") {
        alert("Nieprawidłowe stare hasło.");
      } else {
        alert("Nie udało się zaktualizować hasła.");
      }
    }
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      alert("Konto zostało usunięte.");
      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas usuwania konta: ", error);
      alert("Nie udało się usunąć konta.");
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Twój Profil
      </Typography>
      <Avatar src={auth.currentUser?.photoURL} sx={{ width: 90, height: 90 }} />
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Zmień zdjęcie
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
      <TextField
        label="Stare hasło"
        type={showOldPassword ? "text" : "password"}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle old password visibility"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Nowe hasło"
        type={showNewPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle new password visibility"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Potwierdź nowe hasło"
        type={showConfirmNewPassword ? "text" : "password"}
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm new password visibility"
                onClick={toggleConfirmNewPasswordVisibility}
              >
                {showConfirmNewPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={handleChangePassword} variant="contained" sx={{ mt: 2 }}>
        Zmień hasło
      </Button>
      <Button
        onClick={handleOpenConfirmDelete}
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
      >
        Usuń konto
      </Button>
      <Dialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Czy na pewno chcesz usunąć swoje konto?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ta akcja jest nieodwracalna i spowoduje usunięcie Twojego konta oraz
            wszystkich danych.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete}>Anuluj</Button>
          <Button onClick={handleDeleteAccount} autoFocus color="error">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
