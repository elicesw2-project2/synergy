import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUserList } from 'api/WorkspaceMember';
import useToggle from 'hooks/useToggle';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface IUser {
  user_idx: number;
  role: string;
  nickname: string;
}

const UserList = () => {
  const router = useRouter();
  const workspaceIdx = router.query.workspaceIdx as string;

  const { data: userList } = useQuery(['userList', workspaceIdx], () =>
    getUserList(Number(workspaceIdx))
  );

  const [isOpenUserInfo, toggleUserInfo] = useToggle();
  const [modalOffset, setModalOffset] = useState({ x: 0, y: 0 });
  const [selectedUser, setSelectedUser] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // 바깥쪽 탐지 감지
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (modalRef.current && !modalRef.current?.contains(target)) {
        toggleUserInfo();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const handleUserClick = (event: any) => {
    event.stopPropagation();
    setModalOffset({
      x: event.clientX,
      y: event.clientY,
    });
    toggleUserInfo();
    setSelectedUser(event.currentTarget.innerText);
  };

  const queryClient = useQueryClient();
  const filtered = userList?.filter(
    (user: IUser) => user.nickname === selectedUser
  )[0];
  const mutation = useMutation(
    () => deleteUser(+workspaceIdx, filtered?.user_idx),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userList']);
      },
    }
  );

  const handleExpelUser = () => {
    // 유저 추방 api
    mutation.mutate();
    toggleUserInfo();
  };

  return (
    <>
      <Container>
        <UserCategoryTitle>members</UserCategoryTitle>
        <UserListWrapper>
          <ul style={{ position: 'relative', overflow: 'auto' }}>
            {userList?.map((user: IUser, index: number) => (
              <User key={index} onClick={handleUserClick} ref={userRef}>
                <span key={index}>{user.nickname}</span>
              </User>
            ))}
          </ul>
          {isOpenUserInfo && (
            <UserInfoModal x={modalOffset.x} y={modalOffset.y} ref={modalRef}>
              <Menu onClick={handleExpelUser}>유저 추방하기</Menu>
              <Menu>역할 변경</Menu>
            </UserInfoModal>
          )}
        </UserListWrapper>
        <UserProfile>
          <span>형욱</span>
          <FontAwesomeIcon icon={faEllipsis} />
        </UserProfile>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: auto;
`;

const UserListWrapper = styled.div`
  height: 200px;
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
  &::-webkit-scrollbar-track {
  }
`;

const UserCategoryTitle = styled.h3`
  font-size: 17px;
  font-weight: bold;
  padding: 20px 16px;
  border-top: 1px solid #ced4da;
`;

const User = styled.li`
  padding: 10px 16px;
  margin: 0px 8px;
  border-radius: 12px;
  color: #616d8b;
  &:hover {
    box-shadow: 0 0 50px #ccc;
    background-color: #fff;
  }
`;

const UserInfoModal = styled.div<{ x: number; y: number }>`
  position: absolute;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  top: ${(props) => props.y - 65 + 'px'};
  right: 0;
  padding: 12px;
  border-radius: 4px;
  background-color: #fff;
  color: #121212;
`;

const Menu = styled.button`
  padding: 8px;
  &:hover {
    color: #8270ff;
  }
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 20px;
  margin: 12px 12px 6px 12px;
  color: #616d8b;
  background-color: #dbe1f0;
  border-radius: 16px;
`;

export default UserList;
