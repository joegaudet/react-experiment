import React, { useState } from 'react';
import './App.css';
import ScriptTag from 'react-script-tag';
import { API } from './api/Api';
import { Log } from './util/log';

// WHY THO
import Clients from './Clients';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
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
            <div>
              <div>
                <Clients />
              </div>
              <div></div>
            </div>
          )
      }

    </div>
  );
}

export default App;
