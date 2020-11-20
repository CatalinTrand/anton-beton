/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from './redux/reduxStore';
import ReduxAppWrapper from './redux/src/reduxAppWrapper';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('sk_test_51Hft5MFKh7yu6OY6RXod8xHUMajQeAPCqlpR0F8iq8dheM17vHC2bE7QKvqrgktO61aX2zpSlV8u01GM1p1z8l6U00hHLN0STF');

// @ts-ignore
const App: () => React$Node = () => (
  <Elements stripe={stripePromise}>
    <Provider>
      <ReduxAppWrapper />
    </Provider>
  </Elements>
);

export default App;
