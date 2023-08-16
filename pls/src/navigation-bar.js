import React from 'react';
import { Link } from 'react-router-dom';
import logo from './commons/images/icon.png';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    UncontrolledDropdown
} from 'reactstrap';

const navStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand tag={Link} to="/">
                <img src={logo} width="50" height="35" alt="Logo" />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={navStyle} nav caret>
                        Menu
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem>
                            <Link to="/home" style={navStyle}>Home</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="/user" style={navStyle}>User</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="/login" style={navStyle}>Login</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar;
