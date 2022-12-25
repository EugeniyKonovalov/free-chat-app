import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={classes["footer-section"]}>
      <div className={classes.footer}>
        <span className={classes.year}>&copy;{year}</span>
      </div>
    </footer>
  );
};

export default Footer;
