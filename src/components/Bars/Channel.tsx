import React, { Dispatch, SetStateAction, useState } from 'react';
import { iChannel } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface iProps {
  channel: iChannel;
  channels: iChannel[];
  setChannels: Dispatch<SetStateAction<iChannel[]>>;
}

function Channel({ channel, channels, setChannels }: iProps) {
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
