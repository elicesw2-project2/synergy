import React, { useRef } from 'react';

import 'styles/Chat/Chatting.scss';

function ChatContent() {
  return (
    <div className="chat_content">
      <div>여긴 대화 목록이야</div>
    </div>
  );
}

function ChatInput() {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  function chatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(contentRef.current?.value);
  }

  return (
    <div className="chat_inputBar">
      <form className="chat_info" onSubmit={chatSubmit}>
        <textarea ref={contentRef} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export { ChatContent, ChatInput };
