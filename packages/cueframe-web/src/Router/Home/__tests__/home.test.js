import React from 'react';
import flushPromises from 'flush-promises';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AuthContext } from '../../../shared/context/auth-context';
import Home from '..';

jest.useFakeTimers();

describe('<Home/>', () => {
  describe('Snapshot', () => {
    it('renders correctly for logged out users', async () => {
      const tree = renderer
        .create(
          <MemoryRouter>
            <AuthContext.Provider value={{}}>
              <Home/>
            </AuthContext.Provider>
          </MemoryRouter>
        )

      jest.advanceTimersByTime(300); // advance past delay for loadable component
      await flushPromises();
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  
  describe('Component', () => {
    it('redirects to the dashboard for logged in users', async () => {
      // ideally we would shallow mount and dive, but enzyme doesn't currently support hooks for passing auth context.
      // therefore a shallow mount with HOCs fails to render <Redirect/>.
      // a full mount will render the redirect, but also actually fire it (since not shallow).
      // that's ok since we are using the memory router, but a warning will be displayed. Suppress it.
      jest.spyOn(console, 'error').mockImplementation(() => {}); // noop

      const wrapper = mount(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuthenticated: true }}>
            <Home/>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(wrapper.find(Redirect)).toHaveProp('to', '/dashboard');
      console.error.mockRestore();
    });
  });
});