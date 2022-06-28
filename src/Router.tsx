import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Bars';
import Chat from 'components/Chat/Chat';

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
        <Route element={<Chat />}>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/:workspaceIdx" element={<WorkspaceHome />} />
          <Route path="/calenderboard" element={<CalenderBoard />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
