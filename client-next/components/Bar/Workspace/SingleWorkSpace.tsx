import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IWorkSpace } from './WorkspaceBar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkspace } from '../../../utils/api';
import EditWorkSpaceModal from './Modal/EditWorkspaceModal';
import Link from 'next/link';

interface IProps {
  workspace: IWorkSpace;
}

function SingleWorkSpace({ workspace }: IProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workspaces']);
    },
  });
  const handleClick = () => {
    mutation.mutate(workspace.workspace_idx);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <div>
      <Link href={`/workspace/${workspace.workspace_idx}`}>
        <a>
          <Box
            src={workspace.workspace_img}
            alt="img"
            onContextMenu={handleContextMenu}
          />
        </a>
      </Link>
      {isEdit && (
        <ButtonWrapper>
          <Button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
            수정
          </Button>
          <Button type="button" onClick={handleClick}>
            삭제
          </Button>
        </ButtonWrapper>
      )}
      {isModalOpen && (
        <EditWorkSpaceModal
          onClickToggleModal={onClickToggleModal}
          workspace={workspace}
        />
      )}
    </div>
  );
}

const Box = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  margin-bottom: 10px;
  border: none;
  border-radius: 50%;
  background-color: whitesmoke;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
`;

const Button = styled.button`
  background: #94d82d;
  padding: 6px;
  border-radius: 4px;
`;

export default SingleWorkSpace;
