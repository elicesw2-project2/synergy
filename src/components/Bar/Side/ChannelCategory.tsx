import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// css
import 'styles/Bars/SideBar.scss';

// components
import { getChannels } from 'utils/api';
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
  const { isLoading, data: channels } = useQuery<IChannel[]>('channels', () =>
    getChannels(category.category_idx)
  );

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="SideBar__category">
      <div className="SideBar__category__title">
        <h1>{category.name}</h1>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="SideBar__category__add-btn"
          onClick={onClickToggleModal}
        />
      </div>
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
      {/* 채널 카테고리 생성 모달창 */}
      {isOpenModal && <SideBarModal onClickToggleModal={onClickToggleModal} />}
    </div>
  );
}

export default ChannelCategory;
