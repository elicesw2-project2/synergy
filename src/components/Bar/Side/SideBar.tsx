import SideBarModal from 'components/Bar/Side/SideBarModal';
import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// css
import 'styles/Bars/SideBar.scss';

// components
import Channel from './Channel';

const dummyChannels = [
  {
    idx: 0,
    title: '채널1',
    type: '문서관리',
  },
  {
    idx: 1,
    title: '채널1',
    type: '일정관리',
  },
  {
    idx: 2,
    title: '채널2',
    type: '문서관리',
  },
  {
    idx: 3,
    title: '채널2',
    type: '일정관리',
  },
];

export interface IChannel {
  idx: number;
  title: string;
  type: string;
}

function SideBar() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [channels, setChannels] = useState<IChannel[]>(dummyChannels);

  return (
    <div className="SideBar">
      {/* 워크 스페이스 이름 */}
      <div className="SideBar__category">
        <h1>워크스페이스</h1>
      </div>

      {/* 채널 카테고리 */}
      <div className="SideBar__category">
        <div className="SideBar__category__title">
          <h1>채널 카테고리 1</h1>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="SideBar__category__add-btn"
            onClick={onClickToggleModal}
          />
        </div>

        {/* 채널 */}
        <div className="SideBar__category__channels">
          <ul>
            {channels.map((channel) => (
              <Channel
                key={channel.idx}
                channel={channel}
                channels={channels}
                setChannels={setChannels}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="SideBar__category">
        <h1>채널 카테고리 2</h1>
      </div>

      {/* 채널 카테고리 생성 모달창 */}
      {isOpenModal && (
        <SideBarModal
          onClickToggleModal={onClickToggleModal}
          channels={channels}
          setChannels={setChannels}
        />
      )}
    </div>
  );
}

export default SideBar;
