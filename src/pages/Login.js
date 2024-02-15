import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import './Login.css';
import { auth } from "../firebase";

export const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false); // Zmienione na false
  const navigate = useNavigate();

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  if (user) {
    return (
      <section>
        <p>Jesteś już zalogowany.</p>
        <button onClick={handleSignOut}>Wyloguj się</button>
      </section>
    );
  }

  return (
    <section>
      <form>
        {!isSignUpActive ? (
          <>
            <legend>Zaloguj się</legend>
            <fieldset>
              <ul>
                <li>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" onChange={handleEmailChange} />
                </li>
                <li>
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                  />
                </li>
              </ul>
              <button type="button" onClick={handleSignIn}>
                Zaloguj się
              </button>
            </fieldset>
          </>
        ) : (
          <>
            <legend>Zarejestruj się</legend>
            <fieldset>
              <ul>
                <li>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" onChange={handleEmailChange} />
                </li>
                <li>
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                  />
                </li>
              </ul>
              <button type="button" onClick={handleSignUp}>
                Zarejestruj się
              </button>
            </fieldset>
          </>
        )}
        <button type="button" onClick={handleMethodChange}>
          {isSignUpActive
            ? "Masz już konto? Zaloguj się"
            : "Nie masz konta? Zarejestruj się"}
        </button>
      </form>
    </section>
  );
};

export default Login;
