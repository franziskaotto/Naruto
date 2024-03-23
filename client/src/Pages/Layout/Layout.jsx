import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//hier kommt das basic layout rein

const Layout = () => {
  return (
    <div className="Layout">
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Naruto</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/characters">Characters</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
