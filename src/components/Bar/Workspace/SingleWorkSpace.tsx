import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { IWorkSpace } from 'components/Bar/Workspace/WorkSpaceBar';
import EditWorkSpaceModal from './EditWorkSpaceModal';

interface iProps {
  workSpace: IWorkSpace;
  workSpaceList: IWorkSpace[];
  setWorkSpaceList: Dispatch<SetStateAction<IWorkSpace[]>>;
}

function SingleWorkSpace({
  workSpace,
  workSpaceList,
  setWorkSpaceList,
}: iProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  };

  const handleClick = () => {
    const filtered = workSpaceList.filter((selcted) => selcted !== workSpace);
    setWorkSpaceList(filtered);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <div>
      <img
        src={workSpace.image}
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
          workSpace={workSpace}
        />
      )}
    </div>
  );
}

export default SingleWorkSpace;
