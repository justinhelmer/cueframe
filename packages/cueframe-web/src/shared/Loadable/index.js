import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

export default (LazyComponent, props) => {
  const LoadableComponent = Loadable({
    loader: LazyComponent,
    loading: Loading,
    delay: 300,
    timeout: 10000,
  });

  return () => <LoadableComponent {...props} />;
}
