import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Avatar as MUIAvatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Logo from "../assets/images/logo2.png";
import DefaultAvatar from "../assets/icons/avatar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
    handleClose();
  };

  const handleFavoritesClick = () => {
    if (auth.currentUser) {
      navigate("/favorites");
    } else {
      alert("Musisz być zalogowany, aby zobaczyć ulubione ćwiczenia.");
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        gap: { sm: "72px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        alignItems: "center",
        px: "20px",
      }}
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "70px", height: "58px", margin: "0 10px" }}
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}
          state={{ scrollToExercises: true }}
        >
          Ćwiczenia
        </Link>
        <div
          onClick={handleFavoritesClick}
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "#3A1212",
          }}
        >
          Ulubione
        </div>
      </Stack>
      <div style={{ marginLeft: "auto" }}>
        {auth.currentUser ? (
          <>
            <IconButton onClick={handleClick}>
              <MUIAvatar
                src={auth.currentUser.photoURL || DefaultAvatar}
                alt="avatar"
                sx={{ width: 58, height: 58, mr: -4.5, mt: -1 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                Moje konto
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Wyloguj</MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/login">
            <MUIAvatar
              src={DefaultAvatar}
              alt="avatar"
              sx={{ width: 58, height: 58, mr: -4 }}
            />
          </Link>
        )}
      </div>
    </Stack>
  );
};

export default Navbar;
