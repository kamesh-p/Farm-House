import React, { useState, useEffect } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

import Header from "./Header";
import CartList from "./CartList";

var currentUser = "";

const Auth = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [allowedUsers, setAllowedUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [currName, setCurname] = useState("");

  useEffect(() => {
    const fetchAllowedUsers = async () => {
      try {
        const response = await fetch(
          "https://add-to-card-a30ca-default-rtdb.firebaseio.com/allowedUsers.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch allowed user data.");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        const usersArray = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });

        setAllowedUsers(usersArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllowedUsers();
  }, []);

  useEffect(() => {
    if (isLoggedIn && loggedInUsername) {
      // setShowWelcomeDialog(true);
    }
  }, [isLoggedIn, loggedInUsername]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const loggedInUser = allowedUsers.find(
      (user) => user.username === id && user.password === password
    );

    if (loggedInUser) {
      debugger;
      dispatch(authActions.login(loggedInUser.username));
      setIsLoggedIn(true);
      currentUser = loggedInUser.name;
      setCurname(currentUser);
      setLoggedInUsername(loggedInUser.name);
      setTimeout(() => {
        alert(`Logged in as: ${loggedInUser.name}`);
      }, 1000);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!isUsernameValid(newUsername) || !isPasswordValid(newPassword)) {
      setError(
        "Username must include '@' and password must contain a number and an uppercase letter."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      username: newUsername,
      password: newPassword,
    };

    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/allowedUsers.json",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user.");
      }

      const updatedAllowedUsers = [...allowedUsers, newUser];
      setAllowedUsers(updatedAllowedUsers);

      setIsRegistering(false);
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setError("Failed to register user.");
    }
  };

  const isUsernameValid = (username) => {
    return username.includes("@");
  };

  const isPasswordValid = (password) => {
    return /[0-9]/.test(password) && /[A-Z]/.test(password);
  };

  const toggleRegisterMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  return (
    <div className="container-log">
      <h1>{isRegistering ? " User Register" : "User Login"}</h1>
      {!isRegistering && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            id="id"
            value={id}
            placeholder="username"
            className="input-field"
            onChange={(event) => setId(event.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            className="input-field"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
          <button className="register" onClick={toggleRegisterMode}>
            Register
          </button>
        </form>
      )}

      {isRegistering && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="newUsername"
            id="newUsername"
            value={newUsername}
            placeholder="New Username"
            className="input-field"
            onChange={(event) => setNewUsername(event.target.value)}
          />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            className="input-field"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            className="input-field"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      )}

      {isLoggedIn && allowedUsers.length > 0 && (
        <>
          <Header />
          <CartList currentUser={currentUser} />
        </>
      )}
    </div>
  );
};

export default Auth;
