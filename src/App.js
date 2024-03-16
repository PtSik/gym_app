import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./utils/protectedRoute";
import { auth } from "./firebase";
import Loader from "./components/Loader";
import UserProfile from "./components/UserProfile";


import "./App.css";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/favorites" element={<ProtectedRoute user={user}><Favorites /></ProtectedRoute>} />
        {/* Przekazanie user jako prop do Login */}
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/profile" element={<ProtectedRoute user={user}><UserProfile /></ProtectedRoute>} /> 
      </Routes>
    </Box>
  );
};

export default App;
