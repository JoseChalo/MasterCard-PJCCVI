import React from 'react';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GmailUserCurrent } from './components/gmailUserContext.js';

function App() {
  return (
    <div className="App">
      <GmailUserCurrent>
        <AppRoutes />
      </GmailUserCurrent> 
    </div>
  );
}

export default App;