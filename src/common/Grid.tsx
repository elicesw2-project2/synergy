import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from 'components/Bars/SideBar';
import TopBar from 'components/Bars/TopBar';
import WorkSpaceBar from 'components/Bars/WorkSpaceBar';

import 'styles/base/Grid.scss';

function Grid() {
  return (
    <div className="Grid__container">
      <WorkSpaceBar />
      <SideBar />
      <div>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Grid;
