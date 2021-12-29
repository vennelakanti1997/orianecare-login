import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import "../styles/Navbar.css";
import { IconContext } from "react-icons";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Link } from 'react-router-dom';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
      <Navbar className="bg-dark"  id="navigationbar"  scrolling ="true" fixed="top">
          <Container fluid>
            <Nav.Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Nav.Link>
          </Container>
        </Navbar>
        {/* <OnBoarding/> */}
        <Offcanvas
          className="bg-dark text-white"
          show={sidebar}
          onHide={showSidebar}
        >
          <Offcanvas.Header closeButton className="text-white">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link onClick={showSidebar} to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
