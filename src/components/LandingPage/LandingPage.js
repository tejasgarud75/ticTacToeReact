import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    const response = await fetch(
      `http://localhost:8081/api/users/login?email=${email}`
    );
    if (response.ok) {
      const user = await response.json();
      if (user) {
        onLogin(user);
      } else {
        alert("Email not found, please create an account.");
      }
    } else if (response.status === 404) {
      alert("Invalid email.");
    } else {
      alert("An error occurred, please try again.");
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !validateEmail(email)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const response = await fetch(`http://localhost:8081/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      alert("Registration successful. You can now log in.");
      setIsRegistering(false);
    } else {
      alert("An error occurred, please try again.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Tic-Tac-Toe</h1>
      {isRegistering ? (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={() => setIsRegistering(false)}>Back to Login</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setIsRegistering(true)}>Register</button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
