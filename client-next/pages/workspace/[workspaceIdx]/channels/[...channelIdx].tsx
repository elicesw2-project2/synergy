import React from 'react';
import { useRouter } from 'next/router';
import Document from '../../../../components/Document/Document';
import ScheduleBoard from '../../../../components/ScheduleBoard/ScheduleBoard';
import AppLayout from 'components/AppLayout';

function ChannelHome() {
  const router = useRouter();
  const { channelIdx } = router.query;

  if (!channelIdx) return null;

  return (
    <AppLayout>
      {channelIdx[3] === '1' ? <ScheduleBoard /> : <Document />}
    </AppLayout>
  );
}
export default ChannelHome;
