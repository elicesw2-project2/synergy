import React, { useCallback, useState } from 'react';
import 'styles/Bars/WorkSpaceBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import WorkSpaceModal from 'components/Modals/WorkSpaceModal';
import { iWorkSpace } from 'types';
import SingleWorkSpace from './SingleWorkSpace';

// dummy
const lists = [
  {
    idx: 0,
    title: '1번',
    content: '1번입니다',
    image:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80',
  },
  {
    idx: 1,
    title: '2번',
    content: '2번입니다',
    image:
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&q=80',
  },
  {
    idx: 2,
    title: '3번',
    content: '3번입니다',
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
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
        <SingleWorkSpace
          workSpace={workSpace}
          workSpaceList={workSpaceList}
          setWorkSpaceList={setWorkSpaceList}
          key={workSpace.idx}
        />
      ))}

      {/* 워크스페이스 추가 버튼 */}
      <button
        type="button"
        className="WorkSpaceBar__box WorkSpaceBar__createBtn"
        onClick={onClickToggleModal}
      >
        <FontAwesomeIcon icon={faPlus} className="WorkSpaceBar__createIcon" />
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
