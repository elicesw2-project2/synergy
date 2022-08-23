import React from 'react';
import { IWorkSpace } from 'components/Bar/Workspace/WorkspaceBar/WorkspaceBar';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkspaces } from 'utils/api';

import './Home.scss';

function WorkspaceHome() {
  const { workspaceIdx } = useParams();
  const { data: workspaces } = useQuery<IWorkSpace[]>(
    'workspaces',
    getWorkspaces,
    { staleTime: 5000 }
  );

  const filteredWorkspace = workspaces?.find(
    (workspace) => workspace.workspace_idx === Number(workspaceIdx)
  );
  return (
    <div className="Home">
      {filteredWorkspace?.name}에 오신 것을 환영합니다!
    </div>
  );
}

export default WorkspaceHome;
