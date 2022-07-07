import React from 'react';

import { useParams } from 'react-router-dom';
import ScheduleBoard from 'pages/ScheduleBoard/ScheduleBoard';
import Document from 'pages/Document/Document';

import './Home.scss';

function ChannelHome() {
  const { channelType } = useParams();

  return <div>{channelType === '1' ? <ScheduleBoard /> : <Document />}</div>;
}
export default ChannelHome;
