import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { LoaderContainer } from './styles/comps.styles';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress &&
    <LoaderContainer>
      <Loader type="ThreeDots" color="#BC1221" height="100" width="100" />
    </LoaderContainer>
  );
}

ReactDOM.render(
  <div>
    < App />
    <LoadingIndicator />
  </div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
