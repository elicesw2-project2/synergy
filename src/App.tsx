import React from 'react';

// recoil
import { RecoilRoot } from 'recoil';

// route
import Router from 'Router';

function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
