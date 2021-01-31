import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getUserInfo } from './../store/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';




function NavMenu({ isAuthenticated, logout, getUserInfo, user }) {

    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo()
        }
    }, [getUserInfo, isAuthenticated])



    function CustomCollapse() {
        const [open, setOpen] = useState(false);
        return (
            user &&
            <>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    {user.name} {user.surname}
                    <FontAwesomeIcon
                        icon={faUserCheck}
                        className="ml-2 mr-2"
                    />
                </Button>

                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Button
                            variant="danger"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </Collapse>
            </>
        );
    }

    return (
        <Navbar bg="light" variant="light">
            {
                isAuthenticated ?
                <Navbar.Brand>
                    <NavLink
                            to='/'
                            activeClassName='activeLink'
                            exact
                    >
                            Home
                    </NavLink>

                </Navbar.Brand> :

                <>
                    <NavLink
                        to='/register'
                        activeClassName='activeLink'
                        exact
                    >

                    </NavLink>

                       
                    <NavLink
                        className="m-2"
                        to='/login'
                        activeClassName='activeLink'
                        exact
                    >
                        Login
                    </NavLink>

                </>
            }

            <Nav className="mr-auto" >
                <NavLink
                    exact
                    activeClassName='activeLink'
                    className="mr-2"
                    to='/about'
                >
                    About
                </NavLink>

                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/contact'
                >
                    Contact
                </NavLink>
            </Nav>
            <CustomCollapse />
        </Navbar>
    );
}






const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.userInfo
    }
}

const mapDispatchToProps = {
    logout,
    getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)