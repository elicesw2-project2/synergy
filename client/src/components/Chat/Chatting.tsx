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
socket.on('welcome', (user) => {
  console.log(`${user}님이 입장하셨습니다!`);
});

// 채팅내용 컴포넌트
function ChatContent(prop: any) {
  const { content } = prop;
  // const [beforecontent, setBeforeContent] = useState<any>([]);
  // useEffect(() => {
  //   getChatMessage(1).then((res) => {
  //     res.map((el: any) => setBeforeContent([...beforecontent, el.message]));
  //   });
  // }, []);

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
  const [connect, setConnect] = useState<boolean>(false);

  // 별명 불러오기
  useEffect(() => {
    getUsers(localStorage.getItem('id')).then((res) => {
      setNickname(res.nickname);
    });
  }, []);

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

  // 채팅 전송 submit
  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newChat = contentRef?.current?.value;
    // api 채팅 메시지 저장
    postChatMessage({ message: newChat, nickname: nicknames, room_idx: 1 });
    // 소켓io 채팅 메시지 보내기
    socket.emit('message', newChat, nicknames, 1);
    setText('');
  }

  // 방 입장 테스트 버튼
  function roomConnect() {
    socket.emit('enter_room', 1, nicknames);
  }

  // 아무거나 테스트 버튼 / 채팅 메시지
  async function realTest() {
    getChatMessage(1).then((res) =>
      res.map((el: any) => console.log(el.message))
    );
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
