import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Cookies from "universal-cookie"

export function NavBar (){

  const [loggedin, setLoggedin] = useState<boolean>(false);

  useEffect(() => {
    load();
    console.log('loaded')
  }, []);

  async function load(){
    try{
      const cookie = new Cookies();
      const tokenkun = cookie.get("token")
      const response = await fetch("http://localhost:3000/user/loggedin", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokenkun}`,
        },
      });
      
  
    if (!response.ok) {
      setLoggedin(false);
        throw new Error(`Error: ${response.statusText}`);
    }
    setLoggedin(true)
    } 
    catch(error){
      console.log(error);
    }
  }

  return (<>
  <div className='container-fluid'>
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid style={{ width: '100%' }}>
      <Navbar.Brand href="/">Chemicals.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Termékek</Nav.Link>
          {loggedin && <Nav.Link href="/profile">Profil</Nav.Link>}
          {loggedin && <Nav.Link href="/cart">Kosár</Nav.Link>}
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="/register">Registráció</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div></>);}