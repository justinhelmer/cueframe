import React from 'react';

export default ({ error, timedOut, pastDelay, retry }) => {
  if (error) {
    return <div>Error! <button onClick={ retry }>Retry</button></div>;
  }

  if (timedOut) {
    return <div>Taking a long time... <button onClick={ retry }>Retry</button></div>;
  }

  if (pastDelay) {
    return (
      <div className="mt-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return null;
};
