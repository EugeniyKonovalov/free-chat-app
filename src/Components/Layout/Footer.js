import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <span className={classes.year}>&copy;{year}</span>
    </footer>
  );
};

export default Footer;
