import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from 'components/Bars/SideBar';
import TopBar from 'components/Bars/TopBar';
import WorkSpaceBar from 'components/Bars/WorkSpaceBar';

import 'styles/base/Grid.scss';

function Bars() {
  return (
    <div className="Grid__container">
      <WorkSpaceBar />
      <SideBar />
      <div className="Main__container">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Bars;
