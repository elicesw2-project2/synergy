import React, { useCallback, useEffect, useState } from 'react';

import { IWorkSpace } from 'components/Bar/Workspace/WorkSpaceBar';
import { useMutation, useQueryClient } from 'react-query';
import { deleteWorkspace } from 'utils/api';
import EditWorkSpaceModal from './EditWorkSpaceModal';

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
      <img
        src={workspace.workspace_img}
        alt="img"
        className="WorkSpaceBar__box"
        onContextMenu={handleContextMenu}
      />
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
