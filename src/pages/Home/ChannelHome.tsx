import { IChannel } from 'components/Bar/Side/ChannelCategory/ChannelCategory';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getChannels } from 'utils/api';

import './Home.scss';

function ChannelHome() {
  const { channelCategoryIdx, channelIdx } = useParams();
  const { data: channels } = useQuery<IChannel[]>(
    ['channels', channelCategoryIdx],
    () => getChannels(Number(channelCategoryIdx))
  );

  const filteredChannel = channels?.find(
    (channel) => channel.channel_idx === Number(channelIdx)
  );
  return <div className="Home">{filteredChannel?.name} 채널입니다.</div>;
}

export default ChannelHome;
