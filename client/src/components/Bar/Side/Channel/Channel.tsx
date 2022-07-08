import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faGear, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { deleteChannel, patchChannel } from 'utils/api';
import { Link } from 'react-router-dom';
import { IChannel } from '../ChannelCategory/ChannelCategory';

import styles from './Channel.module.scss';

interface IProps {
  channel: IChannel;
}

function Channel({ channel }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(channel.name);

  const channelIcon = channel.type === 1 ? '🗓' : '📝';

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(!isEdit);
    console.log(isEdit);
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
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteMutation.mutate(channel.channel_idx);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {isEdit ? (
        <li>
          <input
            value={name}
            className={styles.channel_name_input}
            onChange={handleChange}
          />
        </li>
      ) : (
        <Link
          to={`channels/${channel.category_idx}/channel/${channel.channel_idx}/${channel.type}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <li className={styles.channel_name}>
            <FontAwesomeIcon icon={faHashtag} /> {channelIcon}
            {channel.name.length > 10
              ? ` ${channel.name.slice(0, 10)}...`
              : ` ${channel.name}`}
          </li>
        </Link>
      )}
      {isVisible && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isEdit ? (
            <button
              type="button"
              className={styles.confirm_button}
              onClick={handleConfirm}
            >
              확인
            </button>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faGear}
                className={styles.edit_icon}
                onClick={handleEdit}
              />
              <FontAwesomeIcon
                icon={faX}
                className={styles.delete_icon}
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
