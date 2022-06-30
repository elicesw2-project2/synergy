import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'styles/Chat/Chatting.scss';

// 테스트로 채팅방 만들기위한 import
import axios from 'axios';
import { postChatMessage, getChatMessage, getUsers } from 'utils/api';

export interface IChat {
  message: string | undefined;
  room_idx: number;
  nickname: string;
}

const socket = io('/');

// 채팅내용 컴포넌트
function ChatContent(prop: any) {
  const { content } = prop;
  return (
    <div className="chat_content">
      <ul>
        {content.map((el: any) => {
          return <li>{el}</li>;
        })}
      </ul>
    </div>
  );
}

// 채팅 입력 컴포넌트
function ChatInput() {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string | undefined>('');
  const [content, setContent] = useState<any>([]);
  const [nicknames, setNickname] = useState<string>('');

  socket.on('welcome', (user) => {
    console.log(`${user}님이 입장하셨습니다!`);
  });
  socket.on('disconnection', (msg) => {
    setContent([...content, msg]);
    console.log(msg);
  });
  socket.on('message', (message) => {
    setContent([...content, message]);
    console.log(message);
  });

  useEffect(() => {
    getUsers(localStorage.getItem('id'))
      .then((res) => res.json())
      .then((data) => {
        setNickname(data.data.nickname);
      });
  }, []);

  // 채팅 전송 submit
  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newChat = contentRef?.current?.value;
    postChatMessage({ message: newChat, nickname: nicknames, room_idx: 1 });
    socket.emit('message', newChat, nicknames, 1);
    setText('');
  }

  // 방 입장 테스트 버튼
  function roomConnect() {
    socket.emit('enter_room', 1, '닉네임');
  }

  // 아무거나 테스트 버튼 유저정보, 채팅 메시지
  async function realTest() {
    getChatMessage();
    const result = await fetch(
      `https://circuit-synergy.herokuapp.com/chatrooms/86`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  }
  return (
    <>
      <button type="button" onClick={roomConnect}>
        방입장 버튼
      </button>
      <button type="button" onClick={realTest}>
        테스트 버튼
      </button>
      <ChatContent content={content} />
      <div className="chat_inputBar">
        <form className="chat_info" onSubmit={chatSubmit}>
          <textarea
            ref={contentRef}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </>
  );
}

export { ChatContent, ChatInput };
// export default ChatInput;
