import React from 'react';
import 'styles/Bars/TopBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';

function TopBar() {
  return (
    <div className="TopBar">
      <h1># 채널 이름</h1>
      <div className="icons">
        <FontAwesomeIcon className="TopBar__icon" icon={faUser} />
        <FontAwesomeIcon className="TopBar__icon" icon={faBell} />
        <FontAwesomeIcon className="TopBar__icon" icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}

export default TopBar;
