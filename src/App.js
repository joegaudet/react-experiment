import React, { useEffect, useState } from 'react';
import './App.scss';
import ScriptTag from 'react-script-tag';
import { API } from './api/Api';
import { Log } from './util/log';

// WHY THO
import Clients from './Clients';
import Calendar from './Calendar';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authorizedClients, setAuthorizedClients] = useState([]);

  useEffect(() => {
    function handleAuthStatusChanged(isAuthorized) {
      setAuthorizedClients(API.clients.filter(_ => _.isAuthorized));
    }

    API.clients.forEach(_ => _.subscribeToAuthStatus(handleAuthStatusChanged));

    // Specify how to clean up after this effect:
    return function cleanup() {
      API.clients.forEach(_ => _.unsubscribeFromAuthStatus(handleAuthStatusChanged));
    };
  });

  return (
    <>
      <ScriptTag
        src="https://apis.google.com/js/api.js"
        onLoad={async () => {
          await API.bootstrap();
          setIsLoading(false);
          Log.info('Done Loading  Clients')
        }}
      />
      {
        isLoading
          ? <></>
          : (
            <div className="rdy-app">
              <Clients clients={API.clients}/>
              <Calendar clients={authorizedClients}/>
            </div>
          )
      }
    </>
  );
}

export default App;
