import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import HeroBannerImage from "../assets/images/banner2.png";


const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: { lg: "132px", xs: "70px" },
        ml: { sm: "50px" },
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="32px">
        Power Club
      </Typography>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
      Train, Sleep <br /> and Repeat
    </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={4}>
        Sprawdź najbardziej efektywne ćwiczenia
      </Typography>
      <Stack>
        <a
          href="#exercises"
          style={{
            marginTop: "45px",
            textDecoration: "none",
            width: "200px",
            textAlign: "center",
            background: "#FF2625",
            padding: "14px",
            fontSize: "22px",
            textTransform: "none",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Eksploruj Ćwiczenia
        </a>
      </Stack>
      <Typography
        fontWeight={600}
        color="#ff2626"
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
        }}
        fontSize="190px"
        textAlign= "center"
        mt={6}
      >
        TREN TWINS
      </Typography>
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;
