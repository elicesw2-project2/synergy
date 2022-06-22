import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faGear } from '@fortawesome/free-solid-svg-icons';
import { IChannel } from './ChannelCategory';

interface IProps {
  channel: IChannel;
}

function Channel({ channel }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(channel.name);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    // delete
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleConfirm = () => {
    // 수정 api 요청
    const tmp = channel;
    tmp.name = name;
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
          <input value={name} className="" onChange={handleChange} />
        </li>
      ) : (
        <li>
          # [{channel.type}] {channel.name}
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
