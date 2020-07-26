import React from "react";
import { Link } from "react-router-dom";
import Style from "./Header.module.css";

const Header = () => {
  const handleClearStorage = () => {
    if (sessionStorage.token) {
      sessionStorage.removeItem("token");
    }
  };

  const loginLogout = () => {
    return sessionStorage.token ? (
      <>
        <Link onClick={handleClearStorage} to="/">
        Login/Logout
        </Link>
        <Link to="/new/article">Create</Link>
      </>
    ) : (
      <Link to="/login">Login/Logout</Link>
    );
  };

  return (
    <header className={Style.header}>
      <h1>Prem's Blog</h1>
      <nav>
        <Link to="/">blog</Link>
        <Link to="/gallery">Gallery</Link>
        {loginLogout()}
      </nav>
     
    </header>
  );

  
};





export default Header;
