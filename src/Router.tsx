import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Bars';

// Pages
import Home from 'pages/Home';
import CalenderBoard from 'pages/CalendarBoard';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import WorkspaceHome from 'components/WorkspaceHome';

function Router() {
  return (
    <Routes>
      <Route element={<Bars />}>
        <Route path="/" element={<Home />} />
        <Route path="/workspace/:id" element={<WorkspaceHome />} />
        <Route path="/calenderboard" element={<CalenderBoard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
