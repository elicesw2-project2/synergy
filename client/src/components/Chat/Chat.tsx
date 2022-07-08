import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { Outlet, useParams } from 'react-router-dom';
import { getUsers, getChatRoom } from 'utils/api';
import { ChatContent, ChatInput } from './Chatting';

import 'styles/Chat/Chat.scss';

const socket = io('/');

function Chat() {
  const [chatView, setChatView] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [roomIdx, setRoomIdx] = useState<number>();
  const { workspaceIdx } = useParams();

  useEffect(() => {
    getUsers(localStorage.getItem('id')).then((res) => {
      const userNick = res.nickname;
      setNickname(userNick);
    });
    getChatRoom(Number(workspaceIdx)).then((res) =>
      setRoomIdx(res[0].room_idx)
    );
  }, []);

  return (
    <>
      <div className="chat_box">
        {chatView ? (
          <div className="chat_unroll">
            <div className="chat_bar">
              <div className="chat_title">
                <h2>땡땡의 채팅방</h2>
              </div>
              <div>
                <button
                  type="submit"
                  className="chat_close"
                  onClick={() => {
                    setChatView(!chatView);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            {/* <ChatContent /> */}
            <ChatInput nicknames={nickname} roomIdx={roomIdx} />
          </div>
        ) : (
          <button
            type="submit"
            className="chat_roll"
            onClick={() => {
              setChatView(!chatView);
            }}
          >
            x 번 채팅방
          </button>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Chat;
