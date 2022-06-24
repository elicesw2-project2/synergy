import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import SideBar from 'components/Bar/Side/SideBar';
import TopBar from 'components/Bar/Top/TopBar';
import WorkSpaceBar from 'components/Bar/Workspace/WorkSpaceBar';

import 'styles/base/Grid.scss';

function Bars() {
  return (
    <div className="Grid__container">
      <WorkSpaceBar />
      <Routes>
        <Route path="/workspace/:id" element={<SideBar />} />
      </Routes>
      <div className="Main__container">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Bars;
