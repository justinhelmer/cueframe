import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AuthContext } from '../../shared/context/auth-context';
import Header from '..';

describe('<Header/>', () => {
  describe('Snapshot', () => {
    it('renders correctly for logged out users', () => {
      const tree = renderer
        .create(
          <MemoryRouter>
            <AuthContext.Provider value={{}}>
              <Header/>
            </AuthContext.Provider>
          </MemoryRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders correctly for logged in users', () => {
      const tree = renderer
        .create(
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuthenticated: true }}>
              <Header/>
            </AuthContext.Provider>
          </MemoryRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  describe('Component', () => {
    it('fires logout methos from auth context when logout is clicked', () => {
      const logout = jest.fn();
      const wrapper = mount(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuthenticated: true, logout }}>
            <Header/>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(logout).not.toHaveBeenCalled();
      wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Logout').simulate('click');
      expect(logout).toHaveBeenCalled();
    })
  });
});