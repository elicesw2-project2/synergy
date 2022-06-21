import React, { Dispatch, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faGear } from '@fortawesome/free-solid-svg-icons';
import { IChannel } from './SideBar';

interface IProps {
  channel: IChannel;
  channels: IChannel[];
  setChannels: Dispatch<SetStateAction<IChannel[]>>;
}

function Channel({ channel, channels, setChannels }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(channel.title);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    const filtered = channels.filter((selected) => selected !== channel);
    setChannels(filtered);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleConfirm = () => {
    // 수정 api 요청
    const tmp = channel;
    tmp.title = title;
    setIsEdit(false);
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
      {isEdit ? (
        <li>
          <input value={title} className="" onChange={handleChange} />
        </li>
      ) : (
        <li>
          # [{channel.type}] {channel.title}
        </li>
      )}
      {isVisible && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isEdit ? (
            <button
              type="button"
              className="channel__edit-icon"
              onClick={handleConfirm}
            >
              확인
            </button>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faGear}
                className="channel__edit-icon"
                onClick={handleEdit}
              />
              <FontAwesomeIcon
                icon={faX}
                className="channel__delete-icon"
                onClick={handleDelete}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Channel;
