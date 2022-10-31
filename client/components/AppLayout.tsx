import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import SideBar from './Bar/Side/SideBar';
import TopBar from './Bar/Top/TopBar';
import WorkSpaceBar from './Bar/Workspace/WorkspaceBar';

type ComponentProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: ComponentProps) => {
  const router = useRouter();
  return (
    <MainContainer>
      <WorkSpaceBar />
      {router.query?.workspaceIdx && <SideBar />}
      <Wrapper>
        <TopBar />
        {children}
      </Wrapper>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

export default AppLayout;
