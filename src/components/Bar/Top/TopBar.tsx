import React from 'react';
import 'styles/Bars/TopBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getChannels } from 'utils/api';
import { IChannel } from '../Side/ChannelCategory/ChannelCategory';

function TopBar() {
  const { channelCategoryIdx, channelIdx } = useParams();
  const { data: channels } = useQuery<IChannel[]>(
    ['channels', channelCategoryIdx],
    () => getChannels(Number(channelCategoryIdx))
  );

  const filteredChannel = channels?.find(
    (channel) => channel.channel_idx === Number(channelIdx)
  );

  return (
    <div className="TopBar">
      <h1>{filteredChannel ? `# ${filteredChannel?.name}` : ''}</h1>
      <div className="icons">
        <FontAwesomeIcon className="TopBar__icon" icon={faUser} />
        <FontAwesomeIcon className="TopBar__icon" icon={faBell} />
        <FontAwesomeIcon className="TopBar__icon" icon={faMagnifyingGlass} />
        <Link to="/login">
          <FontAwesomeIcon
            className="TopBar__icon"
            icon={faArrowRightFromBracket}
          />
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
