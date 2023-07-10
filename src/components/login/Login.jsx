import React from "react";
import "./login.css";
export default function Login({ handleLogin }) {
  return (
    <>
      <div className="login_body">
        <div className="login_msg">
          <p>Please login to continue</p>
          <button type="button" id="login_submit-btn" onClick={handleLogin}>
            Login!
          </button>
        </div>
      </div>
    </>
  );
}
