import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-2 border-bottom bg-blur">
      <Container fluid>
        <Link to="/">LOGO</Link>
      </Container>
    </div>
  );
};

export default Header;
