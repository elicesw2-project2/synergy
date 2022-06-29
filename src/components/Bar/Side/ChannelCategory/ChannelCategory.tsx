import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteChannelCategory, getChannels } from 'utils/api';

// css
import styles from './ChannelCategory.module.scss';

// components
import Channel from '../Channel/Channel';
import SideBarModal from '../SideBarModal/SideBarModal';

// types
import { IChannelCategory } from '../SideBar/SideBar';

export interface IChannel {
  channel_idx?: number;
  category_idx: number;
  name: string;
  type: string;
}

interface IProps {
  category: IChannelCategory;
}

function ChannelCategory({ category }: IProps) {
  const { isLoading, data: channels } = useQuery<IChannel[]>(
    ['channels', category.category_idx],
    () => getChannels(category.category_idx)
  );

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const onClickToggleDropdown = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  const handleContextMenu = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClickToggleDropdown();
  };

  // 채널 카테고리 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteChannelCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('channelCategory');
    },
  });
  const handledeleteCategory = () => {
    deleteMutation.mutate(category.category_idx);
    onClickToggleDropdown();
  };

  return (
    <div className={styles.category}>
      <div className={styles.category_title}>
        <h1 onContextMenu={handleContextMenu}>{category.name}</h1>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.add_button}
          onClick={onClickToggleModal}
        />
      </div>
      {isOpenDropdown && (
        <div className={styles.dropdown}>
          <ul>
            <li>
              <button
                type="button"
                onClick={handledeleteCategory}
                className={styles.dropdown_button}
              >
                채널 카테고리 삭제
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* 채널 */}
      <div className={styles.channels}>
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <ul>
            {channels?.map((channel) => (
              <Channel key={channel.channel_idx} channel={channel} />
            ))}
          </ul>
        )}
      </div>
      {/* 채널 생성 모달창 */}
      {isOpenModal && (
        <SideBarModal
          onClickToggleModal={onClickToggleModal}
          categoryIdx={category.category_idx}
        />
      )}
    </div>
  );
}

export default ChannelCategory;
