import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Grid';

// Pages
import Home from 'pages/Home';
import CalenderBoard from 'pages/CalendarBoard';

function App() {
  return (
    <Routes>
      <Route element={<Bars />}>
        <Route path="/" element={<Home />} />
        <Route path="/calenderBoard" element={<CalenderBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
