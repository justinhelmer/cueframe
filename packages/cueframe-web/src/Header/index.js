import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import { AuthContext } from '../shared/context/auth-context';
import logoSmall from './logo-small.svg';
import logoLarge from './logo-large.svg';
import './header.scss';

export default () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <MDBNavbar id="header" dark color="primary-color">
      <MDBNavbarBrand>
        <Link className="text-hide d-block" to="/">
          <img src={logoSmall} alt="Cueframe" className="d-block d-md-none" />
          <img src={logoLarge} alt="Cueframe" className="d-none d-md-block" />
          Cueframe
        </Link>
      </MDBNavbarBrand>
      <MDBNavbarNav right>
        <MDBNavItem>
          {isAuthenticated ? (
            <MDBNavLink to="#" onClick={logout}>Logout</MDBNavLink>
          ) : (
            <MDBNavLink to="/login">Login</MDBNavLink>
          )}
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
