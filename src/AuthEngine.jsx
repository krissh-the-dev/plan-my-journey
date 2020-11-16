import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';

import App from './ThemeEngine';

dotenv.config();
export default function AuthEngine() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri='http://localhost:3000/dashboard'
    >
      <App />
    </Auth0Provider>
  );
}
