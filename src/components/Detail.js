import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment, id } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  const checkIfFavoriteExists = async () => {
    if (!auth.currentUser) {
      alert("Musisz być zalogowany, aby zarządzać ulubionymi.");
      return false;
    }
    const userId = auth.currentUser.uid;
    const favoritesRef = collection(db, "favorites");
    const q = query(
      favoritesRef,
      where("id", "==", id),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const addToFavorites = async () => {
    const exists = await checkIfFavoriteExists();
    if (exists) {
      alert("To ćwiczenie jest już w ulubionych.");
      return;
    }
    try {
      await addDoc(collection(db, "favorites"), {
        id,
        userId: auth.currentUser.uid,
      });
      alert("Ćwiczenie zostało dodane do ulubionych!");
    } catch (error) {
      console.error("Błąd przy dodawaniu do ulubionych: ", error);
      alert("Nie udało się dodać ćwiczenia do ulubionych.");
    }
  };

  const removeFromFavorites = async () => {
    if (!auth.currentUser) {
      alert("Musisz być zalogowany, aby zarządzać ulubionymi.");
      return;
    }
    const userId = auth.currentUser.uid;
    const favoritesRef = collection(db, "favorites");
    const q = query(
      favoritesRef,
      where("id", "==", id),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("To ćwiczenie nie jest w ulubionych.");
      return;
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    alert("Ćwiczenie zostało usunięte z ulubionych.");
  };

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">
          <span style={{ textTransform: "capitalize" }}>{name}</span>
        </Typography>
        <Typography variant="h6">
          {`Regularne ćwiczenia pomagają utrzymać formę. ${name} jest jednym z najlepszych ćwiczeń do aktywacji ${target}. Nie tylko poprawia nastrój, ale także zwiększa poziom energii.`}
        </Typography>
        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Typography textTransform="capitalize" variant="h5">
              {item.name}
            </Typography>
          </Stack>
        ))}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%", mt: 7 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={addToFavorites}
            sx={{
              mt: 2,
              color: "white",
              borderRadius: "20px", // Zaokrąglenie dla efektu elipsy
              padding: "10px 20px", // Umiarkowany padding
              width: "max-content", // Pozwala przyciskowi na dostosowanie szerokości do zawartości
              whiteSpace: "nowrap", // Zapobiega zawijaniu tekstu
            }}
          >
            Dodaj do ulubionych
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={removeFromFavorites}
            sx={{
              mt: 2,
              color: "white",
              borderRadius: "20px", // Zaokrąglenie dla efektu elipsy
              padding: "10px 30px", // Umiarkowany padding
              width: "max-content", // Pozwala przyciskowi na dostosowanie szerokości do zawartości
              whiteSpace: "nowrap", // Zapobiega zawijaniu tekstu
            }}
          >
            Usuń z ulubionych
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Detail;
