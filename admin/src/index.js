import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Windmill } from '@windmill/react-ui';
import ThemedSuspense from './components/ThemedSuspense';
import store from './myStore';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tw-elements';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill>
        <App />
        <ToastContainer autoClose={3000} />
      </Windmill>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
