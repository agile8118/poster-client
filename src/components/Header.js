import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../index";
import Button from "../reusable/Button";

const Header = () => {
  const { loggedIn, setLoggedIn, section, setSection } = useContext(AppContext);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    try {
      await axios.get("/api/user");
      setLoggedIn(true);
    } catch (e) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if (loggedIn === null) checkLoggedIn();
  }, [loggedIn]);

  useEffect(() => {
    setSection(window.location.pathname);
  }, [section]);

  const logout = async () => {
    try {
      await axios.delete("/api/logout");
      setLoggedIn(false);
      setSection("/");
    } catch (e) {}
  };

  return (
    <div className="header">
      <div className="header__left">
        <Link
          className="header__link header__link--home"
          to="/"
          onClick={() => {
            setSection("/");
          }}
        >
          Home
        </Link>
      </div>
      <div className="header__right">
        {section !== "/login" && !loggedIn && (
          <Link
            className="header__link header__link--login"
            to="/login"
            onClick={() => {
              setSection("/login");
            }}
          >
            Login
          </Link>
        )}

        {section !== "/new-post" && loggedIn && (
          <Button
            size="small"
            color="blue"
            onClick={() => {
              setSection("/new-post");
              navigate("/new-post");
            }}
          >
            Create a Post
          </Button>
          // <Link
          //   className="header__link header__link--new-post"
          //   to="/new-post"
          //   onClick={() => {
          //     setSection("/new-post");
          //   }}
          // >
          //   Create a Post
          // </Link>
        )}

        {section !== "/profile" && loggedIn && (
          <Link
            to="/profile"
            className="header__link header__link--profile"
            onClick={() => {
              setSection("/profile");
            }}
          >
            Profile
          </Link>
        )}

        {loggedIn && (
          <Link
            className="header__link header__link--logout"
            to="/"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
