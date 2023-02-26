import React from "react";
import { NavLink } from "react-router-dom";
import "../../../src/css/Footer.css";

const Footer = () => {
  return (
    <div>
        <footer className="text-center text-white" style={{ backgroundColor: "#0a4275" }}>
          <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            © 2023 Copyright All Rights Reserved
            <br />
            This site is intended for VN Consumers
            <br />
            <NavLink className="text-light text-decoration-none" to="/">
              GENUINE & DIGNITY
            </NavLink>
          </div>
        </footer>
    </div>
  );
};

export default Footer;
