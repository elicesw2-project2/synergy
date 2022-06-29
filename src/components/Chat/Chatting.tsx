import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'styles/Chat/Chatting.scss';

// 테스트로 채팅방 만들기위한 import
import axios from 'axios';
import { postChatRoom } from 'utils/api';

export interface IChat {
  message: string;
  room_idx: number;
  user_idx: number;
}

const socket = io('/');

socket.on('message', (message) => {
  console.log(message);
});

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

  // 채팅 전송 submit
  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newChat = contentRef?.current?.value;

    socket.emit('message', newChat, '닉네임', 1);
    setText('');
  }

  // 방 입장 테스트 버튼
  function roomConnect() {
    socket.emit('enter_room', 1, '닉네임');
  }
  // useEffect(() => {
  socket.on('message', (message) => {
    setContent([...content, message]);
    console.log(message);
  });
  // }, []);

  // 채팅방 생성 api post 테스트 함수 -> 워크스페이스 생성시 함께 생성되도록 옮겨야함
  async function postChatTest() {
    console.log('채팅방생성');
    // postChatRoom(48);
    await axios
      .post(
        `https://circuit-synergy.herokuapp.com/chatrooms`,
        {
          workspace_idx: 64,
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    /// ////////////
    // await fetch(`https://circuit-synergy.herokuapp.com/chatrooms`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     workspace_idx: 64,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }
  // 아무거나 테스트 버튼 지금은 워크스페이스 get
  async function realTest() {
    await fetch(`https://circuit-synergy.herokuapp.com/workspaces/48`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      });
  }
  return (
    <>
      <button type="button" onClick={roomConnect}>
        1번방
      </button>
      <button type="button" onClick={postChatTest}>
        방만들기 버튼
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
