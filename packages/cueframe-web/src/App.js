import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Header from './Header';
import Footer from './Footer';
import Router from './Router';
import { AuthProvider } from './shared/context/auth-context';
import './app.scss';

export default () => (
  <BrowserRouter>
    <CookiesProvider>
      <div id="app" className="h-100">
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1">
              <Router />
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </div>
    </CookiesProvider>
  </BrowserRouter>
);
