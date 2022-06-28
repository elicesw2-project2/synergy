import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'styles/Chat/Chatting.scss';

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

  // 채팅 전송 submit
  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newChat = contentRef?.current?.value;
    socket.emit('message', newChat, '닉네임', 1);
    setText('');
  }
  // 방 입장
  function roomConnect() {
    socket.emit('enter_room', 1, '닉네임');
    console.log('방입장');
  }
  // useEffect(() => {
  socket.on('message', (message) => {
    setContent([...content, message]);
    console.log(message);
  });
  // }, []);

  return (
    <>
      <button type="button" onClick={roomConnect}>
        1번방
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
