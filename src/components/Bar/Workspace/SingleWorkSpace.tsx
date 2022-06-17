import React, { Dispatch, SetStateAction, useState } from 'react';

import { IWorkSpace } from 'components/Bar/Workspace/WorkSpaceBar';
import WorkSpaceModal from 'components/Bar/Workspace/AddWorkSpaceModal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* {isModalOpen && <WorkSpaceModal />} */}
    </div>
  );
}

export default SingleWorkSpace;
