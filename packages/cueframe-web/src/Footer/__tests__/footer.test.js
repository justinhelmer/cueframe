import React from 'react';
import Footer from '..';
import renderer from 'react-test-renderer';

describe('<Footer/>', () => {
  describe('Snapshot', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<Footer/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
