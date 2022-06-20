import React, { useState } from 'react';

import 'styles/Chat/Chat.scss';

function Chat() {
  const [chatView, setChatView] = useState<boolean>(false);

  return (
    <div>
      {chatView ? (
        <div className="chat_unroll">
          <div className="chat_bar">
            <div className="chat_title">
              <h2>땡땡의 채팅방</h2>
            </div>
            <div>
              <button
                type="submit"
                className="chat"
                onClick={() => {
                  setChatView(!chatView);
                }}
              >
                x
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="chat_roll"
          onClick={() => {
            setChatView(!chatView);
          }}
        >
          채팅창 작아진 상태
        </button>
      )}
    </div>
  );
}

export default Chat;
