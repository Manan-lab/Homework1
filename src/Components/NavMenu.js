import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavMenu() {

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand>
                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/'
                >
                    Home
                </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/about'
                >
                    About
                </NavLink>
            </Nav>
            <Nav>
                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/contact'
                >
                    Contact
                </NavLink>
            </Nav>
        </Navbar>
    );
}