import React, { useCallback, useState } from 'react';
import 'styles/Bars/WorkSpaceBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import WorkSpaceModal from 'components/Modals/WorkSpaceModal';

// interface
interface iWorkSpace {
  title: string;
  content?: string;
}

const lists = [
  {
    title: '1번',
    content: '1번입니다',
  },
  {
    title: '2번',
    content: '2번입니다',
  },
  {
    title: '3번',
    content: '3번입니다',
  },
];

function WorkSpaceBar() {
  const [workSpaceList, setWorkSpaceList] = useState<iWorkSpace[]>(lists);

  // 모달창 여닫기
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="WorkSpaceBar">
      {/* 워크 스페이스 리스트 */}
      {workSpaceList.map((workSpace) => (
        <div className="box">{workSpace.title}</div>
      ))}

      {/* 워크스페이스 추가 버튼 */}
      <button
        type="button"
        className="box createBtn"
        onClick={onClickToggleModal}
      >
        <FontAwesomeIcon icon={faPlus} className="createIcon" />
      </button>

      {/* 모달창 */}
      {isOpenModal && (
        <WorkSpaceModal
          onClickToggleModal={onClickToggleModal}
          workSpaceList={workSpaceList}
          setWorkSpaceList={setWorkSpaceList}
        />
      )}
    </div>
  );
}

export default WorkSpaceBar;
