import React from "react";
import Style from "./Footer.module.css";

const Footer = () => (
  <footer className={Style.footer}>
    <ul>
      <li>
        <a
          href="https://www.instagram.com/premtsd"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/prem-palani-897a171a6/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linked In
        </a>
      </li>
      <li>
        <a
          href="https://facebook.com/premtsd"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </li>
      </ul>
    
  </footer>
);

export default Footer;
