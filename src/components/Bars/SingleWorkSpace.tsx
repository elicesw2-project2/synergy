import React, { Dispatch, SetStateAction, useState } from 'react';
import { iWorkSpace } from 'types/workspace';

interface iProps {
  workSpace: iWorkSpace;
  workSpaceList: iWorkSpace[];
  setWorkSpaceList: Dispatch<SetStateAction<iWorkSpace[]>>;
}

function SingleWorkSpace({
  workSpace,
  workSpaceList,
  setWorkSpaceList,
}: iProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    const filtered = workSpaceList.filter((selcted) => selcted !== workSpace);
    setWorkSpaceList(filtered);
  };

  return (
    <div>
      <img
        src={workSpace.image}
        alt="img"
        className="WorkSpaceBar__box"
        onContextMenu={handleContextMenu}
      />
      {isOpen && (
        <button type="button" onClick={handleClick}>
          삭제
        </button>
      )}
    </div>
  );
}

export default SingleWorkSpace;
