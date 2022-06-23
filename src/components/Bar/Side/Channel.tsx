import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faGear } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { deleteChannel, patchChannel } from 'utils/api';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  // 수정 및 삭제 API 요청 처리
  const queryClient = useQueryClient();
  const updateMutation = useMutation(patchChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries('channels');
    },
  });
  const handleConfirm = () => {
    const updatedChannel = channel;
    updatedChannel.name = name;
    updateMutation.mutate(updatedChannel);
    setIsEdit(false);
  };

  const deleteMutation = useMutation(deleteChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries('channels');
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate(channel.channel_idx);
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
