import React, { Dispatch, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { IChannel } from './SideBar';

interface IProps {
  channel: IChannel;
  channels: IChannel[];
  setChannels: Dispatch<SetStateAction<IChannel[]>>;
}

function Channel({ channel, channels, setChannels }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    const filtered = channels.filter((selected) => selected !== channel);
    setChannels(filtered);
  };

  return (
    <div
      className="channel"
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      <li># {channel.title}</li>
      {isVisible && (
        <FontAwesomeIcon
          icon={faX}
          className="channel__delete-icon"
          onClick={handleClick}
        />
      )}
    </div>
  );
}
export default Channel;
