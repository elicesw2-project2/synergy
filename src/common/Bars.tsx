import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from 'components/Bars/SideBar';
import TopBar from 'components/Bars/TopBar';
import WorkSpaceBar from 'components/Bars/WorkSpaceBar';

function Bars() {
  return (
    <>
      <SideBar />
      <TopBar />
      <WorkSpaceBar />
      <Outlet />
    </>
  );
}

export default Bars;
