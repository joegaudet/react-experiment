import React, { useState } from 'react';
import './App.scss';
import ScriptTag from 'react-script-tag';
import { API } from './api/Api';
import { Log } from './util/log';

// WHY THO
import Clients from './Clients';
import Calendar from './Calendar';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
              <Clients/>
              <Calendar/>
            </div>
          )
      }
    </>
  );
}

export default App;
