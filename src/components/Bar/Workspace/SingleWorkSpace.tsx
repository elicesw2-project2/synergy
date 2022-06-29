import React, { useCallback, useState } from 'react';

import { IWorkSpace } from 'components/Bar/Workspace/WorkspaceBar/WorkspaceBar';
import { useMutation, useQueryClient } from 'react-query';
import { deleteWorkspace } from 'utils/api';
import { Link } from 'react-router-dom';
import EditWorkSpaceModal from './Modal/EditWorkspaceModal';

import styles from './WorkspaceBar/WorkspaceBar.module.scss';

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
      queryClient.invalidateQueries('workspaces');
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
      <Link to={`/workspace/${workspace.workspace_idx}`}>
        <img
          src={workspace.workspace_img}
          alt="img"
          className={styles.box}
          onContextMenu={handleContextMenu}
        />
      </Link>
      {isEdit && (
        <>
          <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
            수정
          </button>
          <button type="button" onClick={handleClick}>
            삭제
          </button>
        </>
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

export default SingleWorkSpace;
