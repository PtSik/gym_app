import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Dynamiczne ładowanie obrazu na podstawie nazwy części ciała
        const iconModule = await import(`../assets/icons/${item.toLowerCase()}.png`);
        setIcon(iconModule.default);
      } catch (error) {
        console.error("Błąd ładowania ikony:", error);
      }
    };

    loadIcon();
  }, [item]);

  if (!icon) {
    return null; // Możesz obsłużyć sytuację, gdy obraz nie zostanie załadowany
  }

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? "4px solid #ff2625" : "",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
      }}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img src={icon} alt={item} style={{ width: "80px", height: "80px" }} />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
