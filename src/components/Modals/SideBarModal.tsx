import React, { useState, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import 'styles/Modals/SideBarModal.scss';

interface iChannels {
  title: string;
}

interface iProps {
  onClickToggleModal: () => void;
  channels: iChannels[];
  setChannels: Dispatch<SetStateAction<iChannels[]>>;
}

function SideBarModal({ onClickToggleModal, channels, setChannels }: iProps) {
  const [newChannelName, setNewChannelName] = useState<string>('');
  const handleChangeChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChannelName(e.target.value);
  };
  const handleSubmit = () => {
    onClickToggleModal();
    setChannels(channels.concat({ title: `[문서공유] ${newChannelName}` }));
  };
  return (
    <div className="Modal__Background">
      <div className="Modal__Container">
        {/* 나가기 버튼 */}
        <form className="SideBarModal__Form">
          <button
            type="button"
            onClick={onClickToggleModal}
            className="Modal__Form__CloseBtn"
          >
            X
          </button>
          <h1>채널 만들기</h1>
          <div>
            <div className="SideBarModal__Form__Type">
              <span>이건 문서공유 채널</span>
              <input type="checkbox" checked />
            </div>
            <div className="SideBarModal__Form__Type">
              <span>이건 일정관리 채널</span>
              <input type="checkbox" disabled />
            </div>
          </div>
          <div className="SideBarModal__Form__Input">
            <h2>채널 이름</h2>
            <input
              placeholder="# 새로운 채널"
              onChange={handleChangeChannelName}
            />
          </div>
          {/* 서버 추가 버튼 */}
          <button
            type="button"
            className="Modal__Form__SubmitBtn"
            onClick={handleSubmit}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideBarModal;
