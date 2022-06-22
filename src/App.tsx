import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Bars';

// Pages
import Home from 'pages/Home';
import CalenderBoard from 'pages/CalendarBoard';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';

// recoil
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Bars />}>
          <Route path="/" element={<Home />} />
          <Route path="/calenderBoard" element={<CalenderBoard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
