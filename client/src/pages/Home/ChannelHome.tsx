import React from 'react';

import { useParams } from 'react-router-dom';
import ScheduleBoard from 'pages/ScheduleBoard/ScheduleBoard';

import './Home.scss';

function ChannelHome() {
  const { channelType } = useParams();

  return (
    <>
      {channelType === '0' ? <ScheduleBoard /> : null}
      <div>메롱</div>
    </>
  );
}

export default ChannelHome;
