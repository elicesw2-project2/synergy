import React, { useState, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'styles/Modals/SideBarModal.scss';
import RadioButton from 'components/Button/RadioButton';

import { IChannel } from 'components/Bars/SideBar';

interface iProps {
  onClickToggleModal: () => void;
  channels: IChannel[];
  setChannels: Dispatch<SetStateAction<IChannel[]>>;
}

function SideBarModal({ onClickToggleModal, channels, setChannels }: iProps) {
  const [newChannelName, setNewChannelName] = useState<string>('');
  const [channelType, setChannelType] = useState<string>('문서공유');
  const handleChangeChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChannelName(e.target.value);
  };

  const handleSubmit = () => {
    onClickToggleModal();
    setChannels(
      channels.concat({
        idx: channels.length,
        title: `[${channelType}] ${newChannelName}`,
      })
    );
  };

  return (
    <div className="Modal__Background">
      <div className="Modal__Container">
        {/* 나가기 버튼 */}
        <form className="SideBarModal__Form" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onClickToggleModal}
            className="Modal__Form__CloseBtn"
          >
            X
          </button>
          <h1>채널 만들기</h1>
          <RadioButton
            type="문서공유"
            setChannelType={setChannelType}
            checked
            key="1"
          />
          <RadioButton
            type="일정관리"
            setChannelType={setChannelType}
            key="2"
          />
          <div className="SideBarModal__Form__Input">
            <h2>채널 이름</h2>
            <input
              placeholder="# 새로운 채널"
              onChange={handleChangeChannelName}
              required
            />
          </div>
          {/* 서버 추가 버튼 */}
          <input
            type="submit"
            className="Modal__Form__SubmitBtn"
            value="제출"
          />
        </form>
      </div>
    </div>
  );
}

export default SideBarModal;
