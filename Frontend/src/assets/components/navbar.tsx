import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar (){
  return (<><Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">Chemicals.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Termékek</Nav.Link>
          <Nav.Link href="/register">Registráció</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/profile">Profil</Nav.Link>
          <Nav.Link href="/cart">Kosár</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>);}