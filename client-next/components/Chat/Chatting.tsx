import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { postChatMessage, getChatMessage } from 'utils/api';

export interface IChat {
  message: string | undefined;
  room_idx: number;
  nickname: string;
}

const socket = io();

// 채팅내용 컴포넌트
function ChatContent(prop: any) {
  const { content, newContent } = prop;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [content, newContent]);
  return (
    <div className="chat_content" ref={scrollRef}>
      <ul>
        {content.map((el: any, i: any) => {
          return (
            <li key={i}>
              {el.nickname}: {el.message}
            </li>
          );
        })}
        {newContent
          ? newContent.map((el: any, i: any) => {
              return <li key={i}>{el}</li>;
            })
          : null}
      </ul>
    </div>
  );
}

// 채팅 입력 컴포넌트
function ChatInput(prop: any) {
  const { nicknames, roomIdx } = prop;
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string | undefined>('');
  const [content, setContent] = useState<any[]>([]);
  const [newcontent, setNewContent] = useState<any[]>([]);

  // 채팅내용 불러오기
  useEffect(() => {
    getChatMessage(roomIdx).then((res) => {
      const chatlist = res.map((el: any) => el);
      setContent(chatlist);
    });
  }, []);

  // 채팅방 접속하기
  useEffect(() => {
    socket.emit('enter_room', roomIdx, nicknames);
  }, []);

  // 소켓IO 입장, 퇴장, 메시지 입력
  socket.on('welcome', (user) => {
    setNewContent([...newcontent, `${user} 님이 입장하셨습니다`]);
  });
  socket.on('disconnection', (msg) => {
    setNewContent([...newcontent, msg]);
  });
  socket.on('message', (message) => {
    setNewContent([...newcontent, message]);
  });

  // 채팅 전송 submit
  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newChat = contentRef?.current?.value;
    // api 채팅 메시지 저장
    postChatMessage({
      message: newChat,
      nickname: nicknames,
      room_idx: roomIdx,
    });
    // 소켓io 채팅 메시지 보내기
    socket.emit('message', newChat, nicknames, roomIdx);
    setText('');
  }

  // 아무거나 테스트 버튼 / 채팅 메시지
  async function realTest() {
    getChatMessage(roomIdx).then((res) => {
      const chatlist = res.map((el: any) => el);
      setContent(chatlist);
    });
  }

  return (
    <>
      <button type="button" onClick={realTest}>
        테스트 버튼
      </button>
      <ChatContent content={content} newContent={newcontent} />
      <ChatBar>
        <ChatForm onSubmit={chatSubmit}>
          <textarea
            ref={contentRef}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit">전송</button>
        </ChatForm>
      </ChatBar>
    </>
  );
}

const Content = styled.div`
  background-color: greenyellow;
  height: 70%;
  overflow-y: auto;
  ul {
    display: flex;
    flex-direction: column;
    li {
      text-align: left;
      padding: 2px;
    }
  }
`;
//아래부터 채팅 입력
const ChatBar = styled.div`
  // position: absolute;
  // bottom: 0px;
  width: 100%;
`;

const ChatForm = styled.form`
  display: flex;
  padding: 5px 5px;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: white;
  textarea {
    border: none;
    padding: 0 5px;
    width: 80%;
    height: 4rem;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  button {
    border: 1px solid transparent;
    border-radius: 2px;
    width: 20%;
    cursor: pointer;
  }
`;

export { ChatContent, ChatInput };
