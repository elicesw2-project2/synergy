import { useQuery } from '@tanstack/react-query';
import { getUserList } from 'api/WorkspaceMember';
import useToggle from 'hooks/useToggle';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

  const handleExpelUser = () => {
    // 유저 추방 api
    toggleUserInfo();
  };

  return (
    <Container>
      <UserCategoryTitle>유저 목록</UserCategoryTitle>
      <ul style={{ position: 'relative', overflow: 'auto' }}>
        {userList?.map((user: IUser, index: any) => (
          <User key={user.user_idx} onClick={handleUserClick} ref={userRef}>
            {user.nickname}
          </User>
        ))}
      </ul>
      {isOpenUserInfo && (
        <UserInfoModal x={modalOffset.x} y={modalOffset.y} ref={modalRef}>
          <Menu onClick={handleExpelUser}>유저 추방하기</Menu>
          <Menu>역할 변경</Menu>
        </UserInfoModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 40%;
  margin-top: auto;
  overflow-x: hidden;
`;

const UserCategoryTitle = styled.h3`
  font-size: 17px;
  font-weight: bold;
  padding: 10px 16px;
  margin-bottom: 3px;
`;

const User = styled.li`
  padding: 10px 16px;
  margin-left: 3px;
  &:hover {
    background-color: #495057;
  }
`;

const UserInfoModal = styled.div<{ x: number; y: number }>`
  position: absolute;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  top: ${(props) => props.y - 65 + 'px'};
  right: -20px;
  padding: 12px;
  border-radius: 4px;
  background-color: #868e96;
  color: #121212;
`;

const Menu = styled.button`
  padding: 8px;
  &:hover {
    color: #fa5252;
  }
`;

export default UserList;
