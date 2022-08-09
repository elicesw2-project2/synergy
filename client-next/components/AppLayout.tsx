import React from 'react';
import styled from 'styled-components';
import SideBar from './Bar/Side/SideBar';
import TopBar from './Bar/Top/TopBar';
import WorkSpaceBar from './Bar/Workspace/WorkspaceBar';

type ComponentProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: ComponentProps) => {
  return (
    <MainContainer>
      <WorkSpaceBar />
      <SideBar />
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
  width: 100vw;
  height: 100vh;
`;

export default AppLayout;
