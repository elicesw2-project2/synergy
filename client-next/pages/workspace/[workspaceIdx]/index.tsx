import React from 'react';
import { IWorkSpace } from '../../../components/Bar/Workspace/WorkspaceBar';
import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '../../../utils/api';
import { useRouter } from 'next/router';
import AppLayout from '../../../components/AppLayout';
import styled from 'styled-components';

function WorkspaceHome() {
  const router = useRouter();
  const { workspaceIdx } = router.query;
  console.log(router.query);
  const { data: workspaces } = useQuery<IWorkSpace[]>(
    ['workspaces'],
    getWorkspaces,
    { staleTime: 5000 }
  );

  const filteredWorkspace = workspaces?.find(
    (workspace) => workspace.workspace_idx === Number(workspaceIdx)
  );
  return (
    <AppLayout>
      <Home>{filteredWorkspace?.name}에 오신 것을 환영합니다!</Home>
    </AppLayout>
  );
}

const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: aliceblue;
  background-color: #343a40;
`;

export default WorkspaceHome;
