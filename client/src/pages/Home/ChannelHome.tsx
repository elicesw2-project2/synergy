import React from 'react';

import { useParams } from 'react-router-dom';
import ScheduleBoard from 'pages/ScheduleBoard/ScheduleBoard';

import './Home.scss';

function ChannelHome() {
  const { channelType } = useParams();

  return (
    <>
      {channelType === '1' ? <ScheduleBoard /> : null}
      <div>Home</div>
    </>
  );
}

export default ChannelHome;
