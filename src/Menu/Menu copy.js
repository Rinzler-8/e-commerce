import React from "react";
import { Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand } from "reactstrap";

function MenuCopy() {
  // Collapse isOpen State
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      style={{
        display: "block",
        width: 550,
        padding: 30,
      }}
    >
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">VTI Academy</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin">Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/login"}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/register"}>Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MenuCopy;
