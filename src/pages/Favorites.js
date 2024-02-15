import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Box, Pagination, Stack } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import ExerciseCard from "../components/ExerciseCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6; // Możesz dostosować liczbę ćwiczeń na stronę

  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const favoritesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favoritesData);
    };

    fetchFavorites();
  }, []);

  // Paginacja
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentFavorites = favorites.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" sx={{ gap: 6 }} flexWrap="wrap" justifyContent="center">
        {currentFavorites.length > 0 ? (
          currentFavorites.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <p>Nie masz jeszcze ulubionych ćwiczeń.</p>
        )}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' }, alignItems: 'center', justifyContent: 'center', width: '100%',mb: 2 }}>
  {favorites.length > exercisesPerPage && (
    <Pagination
      color="standard"
      shape="rounded"
      defaultPage={1}
      count={Math.ceil(favorites.length / exercisesPerPage)}
      page={currentPage}
      onChange={paginate}
      size="large"
    />
  )}
</Stack>
    </Box>
  );
};

export default Favorites;
