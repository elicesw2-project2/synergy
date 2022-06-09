import React from 'react';
import 'styles/Bars/TopBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function TopBar() {
  return (
    <div className="TopBar">
      <h1># 채널 이름</h1>
      <div className="TopBar__icons">
        <FontAwesomeIcon className="TopBar__icon" icon={faCoffee} />
      </div>
    </div>
  );
}

export default TopBar;
