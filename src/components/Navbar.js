import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import Logo from "../assets/images/logo2.png";
import Avatar from "../assets/icons/avatar.png";

const Navbar = () => {
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
        <a
          href="#exercises"
          style={{ textDecoration: "none", color: "#3A1212" }}
        >
          Ćwiczenia
        </a>
        <Link
          to="/favorites"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}
        >
          Ulubione
        </Link>
      </Stack>
      <div style={{ marginLeft: "auto" }}>
        <Link to="/login">
          <img
            src={Avatar}
            alt="avatar"
            style={{ width: "48px", height: "48px", marginRight: "-50px" }}
          />
        </Link>
      </div>
    </Stack>
  );
};

export default Navbar;
