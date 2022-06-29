import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Bars from 'common/Bars';
import Chat from 'components/Chat/Chat';

// Pages
import Home from 'pages/Home/Home';
import ScheduleBoard from 'pages/ScheduleBoard/ScheduleBoard';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import WorkspaceHome from 'pages/Home/WorkspaceHome';

function Router() {
  return (
    <Routes>
      <Route element={<Bars />}>
        <Route element={<Chat />}>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/:workspaceIdx" element={<WorkspaceHome />} />
          <Route path="/scheduleboard" element={<ScheduleBoard />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
