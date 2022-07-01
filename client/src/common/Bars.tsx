import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SideBar from 'components/Bar/Side/SideBar/SideBar';
import TopBar from 'components/Bar/Top/TopBar';
import WorkSpaceBar from 'components/Bar/Workspace/WorkspaceBar/WorkspaceBar';

import 'styles/base/Grid.scss';

function Bars() {
  return (
    <div className="Grid__container">
      <WorkSpaceBar />
      <Routes>
        <Route path="/workspace/:workspaceIdx/*" element={<SideBar />} />
      </Routes>
      <div className="Main__container">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Bars;
