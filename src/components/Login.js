import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../index";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loggedIn, setLoggedIn, setSection } = useContext(AppContext);

  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/login", { username, password });
      setLoggedIn(true);
      navigate("/profile");
      setSection("/profile");
      alert("Successfully logged in!", "success");
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        alert("Username or password is incorrect.", "error");
      } else {
        alert(
          "Sorry an unexpected error occurred. Please try again later.",
          "error"
        );
      }
    }
    setLoading(false);
  };
  return (
    <div className="login-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(value) => {
              setUsername(value);
            }}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(value) => {
              setPassword(value);
            }}
          />
        </div>

        <div className="form-group u-flex-text-right">
          <Button color="blue" type="submit" loading={loading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
