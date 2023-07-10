import React, { useState, useRef, useEffect } from "react";
import "./signup.css";
import Login from "../login/Login";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (result && submitted) {
      setShowResult(true);
      const timeout = setTimeout(() => {
        setShowResult(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [result, submitted]);

  const idRef = useRef(null);
  const welcomeRef = useRef(null);

  async function sign(event) {
    event.preventDefault();
    console.log("in signin the user ");
    console.log(username, password);

    const url = "https://to-do-ntrh.onrender.com/user/signup";
    const data = { name: username, email, password, phone };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await response.json();
      idRef.current = result.id;
      welcomeRef.current = "Welcome, To task Managemnt Application";
      setResult(result);

      console.log(result);
      setSubmitted(true);
      // Handle the successful response
    } catch (error) {
      setError("An error occurred while signing up.");
      console.error(error);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleLogin() {
    // Perform login action here
    console.log("Login button clicked!");
  }

  return (
    <>
      <main>
        <div className="main_page">
          <div className="signup_div">
            {error && <p className="error-message">{error}</p>}
            {!submitted ? (
              <form onSubmit={sign}>
                <label htmlFor="fname">Name</label>
                <br />
                <input
                  type="text"
                  id="name_box"
                  name="fname"
                  placeholder="Enter your name"
                  onChange={handleUsernameChange}
                  required
                />
                <br />
                <label htmlFor="em">Email</label>
                <br />
                <input
                  type="text"
                  id="email_box"
                  name="em"
                  placeholder="Enter your Email !"
                  onChange={handleEmailChange}
                  required
                />
                <br />
                <label htmlFor="pass">Password</label>
                <br />
                <input
                  type="password"
                  id="pass_box"
                  name="pass"
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                  required
                />
                <br />
                <label htmlFor="ph">Phone</label>
                <br />
                <input
                  type="phone"
                  id="phone_box"
                  name="ph"
                  placeholder="Enter Phone No."
                  onChange={handlePhoneChange}
                  required
                />
                <br />
                <button type="submit" id="signup_btn">
                  Sign up!
                </button>
              </form>
            ) : showResult ? (
              // Render the welcome text and user ID if submitted
              <div className="Result_rendered">
                <p>ID: {idRef.current}</p>
                <p>{welcomeRef.current}</p>
              </div>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
