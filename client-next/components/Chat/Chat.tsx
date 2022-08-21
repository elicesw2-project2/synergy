import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { Outlet, useParams } from 'react-router-dom';
import { getUsers, getChatRoom } from 'utils/api';
import { ChatContent, ChatInput } from './Chatting';

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
      <Box>
        {chatView ? (
          <Unroll>
            <Bar>
              <Title>
                <h2>땡땡의 채팅방</h2>
              </Title>
              <div>
                <Close
                  type="submit"
                  onClick={() => {
                    setChatView(!chatView);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Close>
              </div>
            </Bar>
            {/* <ChatContent /> */}
            <ChatInput nicknames={nickname} roomIdx={roomIdx} />
          </Unroll>
        ) : (
          <Roll
            type="submit"
            onClick={() => {
              setChatView(!chatView);
            }}
          >
            x 번 채팅방
          </Roll>
        )}
      </Box>
      <Outlet />
    </>
  );
}

const Box = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
const Unroll = styled.div`
  height: 40rem;
  width: 22rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  text-align: center;
`;
const Roll = styled.button`
  height: 4.5rem;
  width: 4.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
`;
const Bar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
  height: 8%;
  background-color: yellow;
  border-radius: 0.5rem 0.5rem 0 0;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Close = styled.button`
  border-style: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

export default Chat;
