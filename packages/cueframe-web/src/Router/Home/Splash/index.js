import React from 'react';
import { MDBView, MDBMask } from 'mdbreact';
import bg from './bg.jpg';

export default () => (
  <MDBView src={bg} className="h-100">
    <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">
      <h1 className="display-4 mx-4">Preserving memories with the power of speech.</h1>
    </MDBMask>
  </MDBView>
);