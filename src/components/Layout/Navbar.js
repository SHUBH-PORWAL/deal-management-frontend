import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <div className="me-2" style={{
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6366f1',
            fontWeight: 'bold'
          }}>
            #
          </div>
          ROSTER GRID
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mx-auto rounded-pill px-2 py-1 bg-light">
          <Nav.Link href="/dashboard" className="px-3 rounded-pill">Dashboard</Nav.Link>
          <Nav.Link href="/roster" className="px-3 rounded-pill">Roster</Nav.Link>
          <Nav.Link href="/communications" className="px-3 rounded-pill">Communications</Nav.Link>
          <Nav.Link href="/crm" className="px-3 rounded-pill active bg-primary text-white fw-semibold">
            CRM
          </Nav.Link>
          <Nav.Link href="/contracts" className="px-3 rounded-pill">Contracts</Nav.Link>
          <Nav.Link href="/settings" className="px-3 rounded-pill">Settings</Nav.Link>
          <Nav.Link href="/more" className="px-3 rounded-pill">More</Nav.Link>
        </Nav>

        <Dropdown align="end">
          <Dropdown.Toggle 
            variant="link" 
            className="d-flex align-items-center border-0 bg-transparent text-dark"
            id="user-dropdown"
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center text-white me-2"
              style={{ width: "32px", height: "32px", backgroundColor: "#ef4444" }}
            >
              M
            </div>
            <span className="d-none d-md-inline fw-medium">Michael</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;