import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// css
import 'styles/Bars/SideBar.scss';

// components
import { deleteChannelCategory, getChannels } from 'utils/api';
import Channel from './Channel';
import SideBarModal from './SideBarModal';

// types
import { IChannelCategory } from './SideBar';

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
    <div className="SideBar__category">
      <div className="SideBar__category__title">
        <h1 onContextMenu={handleContextMenu}>{category.name}</h1>
        <FontAwesomeIcon
          icon={faPlus}
          className="SideBar__category__add-btn"
          onClick={onClickToggleModal}
        />
      </div>
      {isOpenDropdown && (
        <div className="SideBar__dropdown">
          <ul>
            <li>
              <button
                type="button"
                onClick={handledeleteCategory}
                className="SideBar__add-category-btn"
              >
                채널 카테고리 삭제
              </button>
            </li>
            <li>
              <button type="button" onClick={() => alert('누르지말라고')}>
                누르지 마세요
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* 채널 */}
      <div className="SideBar__category__channels">
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
