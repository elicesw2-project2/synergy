import React from 'react';
import 'styles/Bars/SideBar.scss';

function SideBar() {
  return (
    <div className="SideBar">
      <div className="SideBar__category">
        <h1>워크스페이스</h1>
        <div className="SideBar__channels">
          <ul>
            <li className="channel"># 채널1</li>
            <li># 채널2</li>
            <li># 채널3</li>
            <li># 채널4</li>
            <li># 채널5</li>
          </ul>
        </div>
      </div>
      <div className="SideBar__category">
        <h1>채널 카테고리 1</h1>
      </div>
      <div className="SideBar__category">
        <h1>채널 카테고리 2</h1>
      </div>
    </div>
  );
}

export default SideBar;
