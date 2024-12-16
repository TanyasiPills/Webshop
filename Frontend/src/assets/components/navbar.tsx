import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar (){

  let loggedin = false;

  useEffect(() => {
    load();
    console.log('loaded')
  }, []);

  async function load(){
    try{
      const response = await fetch("http://localhost:3000/user/loggedin", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
  
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    loggedin = true;
    } 
    catch(error){
      console.log(error);
    }
  }

  return (<><Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">Chemicals.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Termékek</Nav.Link>
          <Nav.Link href="/register">Registráció</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          {/*loggedin && <Nav.Link href="/profile">Profil</Nav.Link>}
          {loggedin && <Nav.Link href="/cart">Kosár</Nav.Link>*/}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>);}