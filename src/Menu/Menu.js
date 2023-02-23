import React from "react";
import { NavLink } from "react-router-dom";

function Menu(props) {
  return (
    <div>
      <nav className="navbar navbar-inverse" style={{ backgroundColor: "black", color: "black", textAlign: "justify" }}>
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <NavLink to="/">VTI ACADEMY</NavLink>
            </li>

            <li>
              <NavLink to={"/home"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/account"}>AccountManagement</NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to={"/register"}>
                <span className="glyphicon glyphicon-user"></span> Register
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>
                <span className="glyphicon glyphicon-log-in"></span> Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
