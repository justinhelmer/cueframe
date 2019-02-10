import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBAlert } from 'mdbreact';
import { AuthContext } from '../../shared/context/auth-context';

export default ({ location = {} }) => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState();
  const { referrer } = location.state || { referrer: { pathname: '/' } };

  if (isAuthenticated) {
    return <Redirect to={referrer} />;
  }

  const attemptLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (err) {
      if (err.resp && err.resp.status === 400) {
        setLoginErr('Invalid email or password');
      }
    }
  };

  const handleChange = (e, setter) => {
    setLoginErr('');
    setter(e.target.value);
  }

  return (
    <MDBContainer className="mt-3">
      <MDBRow center>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h2 text-center py-4">Login</p>
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={e => handleChange(e, setEmail)}
                />
                <br />
                <label htmlFor="password">Your password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={e => handleChange(e, setPassword)}
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="primary" onClick={() => attemptLogin(email, password)}>Login</MDBBtn>
                </div>
                {loginErr ? (
                  <MDBAlert color="danger">{loginErr}</MDBAlert>
                ) : null}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
