import React, { useRef, useState } from 'react';
import { io } from 'socket.io-client';
import 'styles/Chat/Chatting.scss';

const socket = io('/');
console.log(socket);
socket.emit('message', '내용', '닉네임', 1);
socket.on('message', (message) => {
  console.log(message);
});

function ChatContent(prop: any) {
  const { content } = prop;
  console.log(content);
  return (
    <div className="chat_content">
      <ul>
        <li>asdf</li>
        {/* {content.map((el: any) => {
          console.log(el);
        })} */}
        <li>{content[0]}</li>
      </ul>
    </div>
  );
}

function ChatInput() {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string | undefined>('');
  const [content, setContent] = useState<any>([]);

  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContent([...content, contentRef?.current?.value]);
    setText(contentRef?.current?.value);
  }

  function selectOne() {
    socket.emit('enter_room', 1, 'nickname');
    console.log('asdf');
  }

  return (
    <>
      <ChatContent content={content} />
      <button type="button" onClick={selectOne}>
        1번방
      </button>
      <div className="chat_inputBar">
        <form className="chat_info" onSubmit={chatSubmit}>
          <textarea ref={contentRef} />
          <button type="submit">전송</button>
        </form>
      </div>
    </>
  );
}

export { ChatContent, ChatInput };
// export default ChatInput;
