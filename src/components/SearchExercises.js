import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const SearchExercises = () => {
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs: '30px'}}}
      mb="50px" textAlign="center"
      >
        Sprawdzone Ćwiczenia <br />
        Które Powinieneś Znać
      </Typography>
      <Box position="relative" mb="72px">
        <TextField 
        sx={{
         
        }}
        height="76px"
        value=""
        onChange={(e) => {}}
        placeholder="Szukaj Ćwiczeń"
        type="text"
        />

      </Box>

    </Stack>
  )
};

export default SearchExercises;
