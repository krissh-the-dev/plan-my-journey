import React from 'react';
import App from './ThemeEngine';
import { Auth0Provider } from '@auth0/auth0-react';

export default function AuthEngine() {
  return (
    <Auth0Provider
      domain='dev-kp29pj5u.us.auth0.com'
      clientId='6V81CLNPzDl6IGXhHcLd6BEFaRtQJBiH'
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  );
}
