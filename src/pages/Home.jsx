import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={loginWithRedirect}>Login</button>
      <button onClick={logout}>Logout</button>
      <button
        onClick={() => {
          console.log({ user, isAuthenticated, isLoading });
        }}
      >
        Log details
      </button>
    </div>
  );
}
