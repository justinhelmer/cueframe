import React from 'react';
import Splash from '..';
import renderer from 'react-test-renderer';

describe('<Splash/>', () => {
  describe('Snapshot', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<Splash/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
