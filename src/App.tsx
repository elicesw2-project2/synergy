import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Bars';

// Pages
import Home from 'pages/Home';
import CalenderBoard from 'pages/CalendarBoard';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';

function App() {
  return (
    <Routes>
      <Route element={<Bars />}>
        <Route path="/" element={<Home />} />
        <Route path="/calenderBoard" element={<CalenderBoard />} />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
