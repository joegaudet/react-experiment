import React, { useState, useEffect } from 'react';

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
          {client.name} - Authorized <button onClick={() => client.revokeAuthorization()}>Sign Out</button>
        </li>
      )
      : (
        <li>
          {client.name} - Unauthorized <button onClick={() => client.authorize()}>Authorize</button>
        </li>
      )
  );
}

function Clients({clients}) {
  return (
    <div>
      <ul>
        {clients.map((client) => <Client client={client} key={client.name}/>)}
      </ul>
    </div>
  );
}

export default Clients;
