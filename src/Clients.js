import React, { useState, useEffect } from 'react';
import { API } from './api/Api';

// if I don't import this it's not included which is calling into question my registry pattern
import Google from './api/Google';

function Client({client}) {
  const [isAuthorized, setIsAuthorized] = useState(client.isAuthorized);

  // Handle different client auth changes, I'm new to hooks, not really sure this looks better than classes TBH
  useEffect(() => {
    function handleAuthStatusChanged(isAuthorized) {
      setIsAuthorized(isAuthorized);
    }

    client.subscribeToAuthStatus(handleAuthStatusChanged);

    // Specify how to clean up after this effect:
    return function cleanup() {
      client.unsubscribeFromAuthStatus(handleAuthStatusChanged);
    };
  });

  return (
    isAuthorized
      ? (
        <li>
          <p>{client.name} - Authorized</p>
          <button onClick={() => client.revokeAuthorization()}>Sign Out</button>
        </li>
      )
      : (
        <li>
          <p>{client.name} - Unauthorized</p>
          <button onClick={() => client.authorize()}>Authorize</button>
        </li>
      )
  );
}

function Clients() {
  return (
    <ul>
      {API.clients.map((client) => <Client client={client} key={client.name}/>)}
    </ul>
  );
}

export default Clients;
