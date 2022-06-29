import React from 'react';
import { useParams } from 'react-router-dom';

import Chat from 'components/Chat/Chat';
import './Home.scss';

function WorkspaceHome() {
  const { workspaceIdx } = useParams();
  return (
    <div className="Home">
      {workspaceIdx}번 워크스페이스에 오신 것을 환영합니다!
      <Chat />
    </div>
  );
}

export default WorkspaceHome;
