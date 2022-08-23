import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faFolderPlus,
  faUserPlus,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getChannelCategory, getWorkspaces } from '../../../api/api';
import ChannelCategory from './ChannelCategory';
import AddChannelCategory from './AddChannelCategory';
import InviteModal from './InviteModal/InviteModal';
import { useRouter } from 'next/router';

export interface IChannelCategory {
  category_idx: number;
  name: string;
  workspace_idx: number;
}

function SideBar() {
  const router = useRouter();
  const workspaceIdx = router.query.workspaceIdx as string;

  const { isLoading, data: channelCategories } = useQuery(
    ['channelCategory', workspaceIdx],
    () => getChannelCategory(Number(workspaceIdx))
  );

  const { data: workspaces } = useQuery(['workspaces'], getWorkspaces, {
    staleTime: 5000,
  });

  const filteredWorkspace = workspaces?.find(
    (workspace: any) => workspace.workspace_idx === Number(workspaceIdx)
  );

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const onClickToggleDropdown = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
  const handleToggleInviteModal = useCallback(() => {
    setIsOpenInviteModal(!isOpenInviteModal);
  }, [isOpenInviteModal]);

  if (!workspaceIdx) return null;

  return (
    <Container>
      {/* 워크 스페이스 이름 */}
      <WorkspaceTitle onClick={onClickToggleDropdown}>
        <h1>{filteredWorkspace?.name}</h1>
        {isOpenDropdown && (
          <Dropdown>
            <ul>
              <li>
                <DropdownButton type="button" onClick={handleToggleInviteModal}>
                  초대하기
                  <FontAwesomeIcon icon={faUserPlus} />
                </DropdownButton>
              </li>
              <li>
                <DropdownButton type="button" onClick={onClickToggleModal}>
                  채널 카테고리 추가
                  <FontAwesomeIcon icon={faFolderPlus} />
                </DropdownButton>
              </li>
              <li>
                <DropdownButton type="button" onClick={onClickToggleModal}>
                  서버 설정
                  <FontAwesomeIcon icon={faGear} />
                </DropdownButton>
              </li>
            </ul>
          </Dropdown>
        )}
        <FontAwesomeIcon icon={faAngleDown} onClick={onClickToggleDropdown} />
      </WorkspaceTitle>

      {isOpenInviteModal && (
        <InviteModal handleToggleInviteModal={handleToggleInviteModal} />
      )}

      {isOpenModal && (
        <AddChannelCategory
          workspaceIdx={workspaceIdx}
          onClickToggleModal={onClickToggleModal}
        />
      )}

      {/* 채널 카테고리 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        channelCategories?.map((category: any) => (
          <ChannelCategory key={category.category_idx} category={category} />
        ))
      )}
    </Container>
  );
}

export async function getStaticProps(context: any) {
  const { workspaceIdx } = context.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['workspaces'], getWorkspaces);
  await queryClient.prefetchQuery(['channelCategory', workspaceIdx], () =>
    getChannelCategory(Number(workspaceIdx))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Container = styled.div`
  position: relative;
  color: #adb5bd;
  background-color: #262a2e;
  width: 20rem;
`;

const WorkspaceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1rem;
  background-color: #212529;
  border-bottom: 1px solid #868e96;
  cursor: pointer;
  h1 {
    font-size: 1.5rem;
  }
`;

const Dropdown = styled.div`
  top: 3rem;
  right: 5%;
  position: absolute;
  color: wheat;
  background-color: #2f3640;
  width: 90%;
  padding: 1rem 0;
  border-radius: 0.4rem;
  z-index: 99;
  li {
    border-radius: 8px;
  }
  li button {
    display: flex;
    justify-content: space-between;
  }
`;

const DropdownButton = styled.button`
  color: white;
  border: 0;
  width: 100%;
  background-color: inherit;
  padding: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #91a7ff;
  }
`;

export default SideBar;
