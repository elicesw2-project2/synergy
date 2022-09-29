import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faFolderPlus,
  faUserPlus,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { getChannelCategory, getWorkspaces } from '../../../api/api';
import ChannelCategory from './ChannelCategory';
import AddChannelCategory from './AddChannelCategory';
import InviteModal from './InviteModal/InviteModal';
import { useRouter } from 'next/router';
import UserList from './UserList';

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
              {/* <li>
                <DropdownButton type="button" onClick={onClickToggleModal}>
                  서버 설정
                  <FontAwesomeIcon icon={faGear} />
                </DropdownButton>
              </li> */}
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
      <CategoryWrapper>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          channelCategories?.map((category: any) => (
            <ChannelCategory key={category.category_idx} category={category} />
          ))
        )}
      </CategoryWrapper>
      <UserList />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #e9ecef;
  width: 350px;
  height: calc(100vh - 0px);
`;

const WorkspaceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  cursor: pointer;
  h1 {
    font-size: 1.5rem;
  }
`;

const Dropdown = styled.div`
  top: 4rem;
  right: 5%;
  position: absolute;
  background-color: #fff;
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
  border: 0;
  width: 100%;
  background-color: inherit;
  padding: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #91a7ff;
  }
`;

const CategoryWrapper = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15px;
    background-color: #e9ecef;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 8px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

export default SideBar;
