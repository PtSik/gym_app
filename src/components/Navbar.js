import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import Logo from "../assets/images/logo2.png";
import Avatar from "../assets/icons/avatar.png";

const Navbar = () => {
  const navigate = useNavigate();

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
          style={{ width: "58px", height: "48px", margin: "0 10px" }}
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
        <Link to="/login">
          <img
            src={Avatar}
            alt="avatar"
            style={{ width: "48px", height: "48px", marginRight: "" }}
          />
        </Link>
      </div>
    </Stack>
  );
};

export default Navbar;
