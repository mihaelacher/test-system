import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/questions" activeStyle={activeStyle}>
        Questions
      </NavLink>
      {" | "}
      <NavLink to="/tests" activeStyle={activeStyle}>
        Tests
      </NavLink>
      {" | "}
      <NavLink to="/users" activeStyle={activeStyle}>
        Users
      </NavLink>
    </nav>
  );
};

export default Header;
