import SideBarModal from 'components/Modals/SideBarModal';
import React, { useCallback, useState } from 'react';

import 'styles/Bars/SideBar.scss';
import { iChannel } from 'types/channel';
import Channel from './Channel';

const dummyChannels = [
  {
    idx: 0,
    title: '[문서공유] 채널1',
  },
  {
    idx: 1,

    title: '[일정관리] 채널1',
  },
  {
    idx: 2,

    title: '[문서공유] 채널2',
  },
  {
    idx: 3,
    title: '[일정관리] 채널2',
  },
];

function SideBar() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [channels, setChannels] = useState<iChannel[]>(dummyChannels);

  return (
    <div className="SideBar">
      <div className="SideBar__category">
        <h1>워크스페이스</h1>
      </div>
      <div className="SideBar__category">
        <div className="SideBar__category__title">
          <h1>채널 카테고리 1</h1>
          <button
            type="button"
            className="SideBar__category__addBtn"
            onClick={onClickToggleModal}
          >
            +
          </button>
        </div>
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
