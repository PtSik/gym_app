import React, { useState, useEffect  } from "react";
import { Box } from "@mui/material";

import { useLocation } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

const Home = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToExercises) {
      const exercisesSection = document.getElementById("exercises");
      if (exercisesSection) {
        exercisesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
