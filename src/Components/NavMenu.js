import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from './../store/userActions'

function NavMenu(props) {
    const { isAuthenticated } = props;
    return (
        <Navbar bg="light" variant="light">
            {
            isAuthenticated ? 
            <Navbar.Brand>
            <NavLink 
            to='/'
            activeClassName = 'activeLink'
            exact
            >
             Home
             </NavLink>
            </Navbar.Brand> :
            <>
            <NavLink 
            to='/register'
            activeClassName = 'activeLink'
            exact
            >
             Register
             </NavLink>
             <NavLink 
             to='/login'
             activeClassName = 'activeLink'
             exact
             >
              Login
              </NavLink>
              </>
        }

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
                {isAuthenticated && <Button 
                variant="success"
                onClick = {props.logout}
                >Logout</Button>
                }
            </Nav>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps,mapDispatchToProps)(NavMenu)