import React, { useCallback, useState } from 'react';
import 'styles/Bars/WorkSpaceBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import WorkSpaceModal from 'components/Bar/Workspace/AddWorkSpaceModal';
import { useQuery } from 'react-query';
import { getWorkspaces } from 'utils/api';
import SingleWorkSpace from './SingleWorkSpace';

export interface IWorkSpace {
  workspace_idx?: number;
  name: string;
  workspace_img?: string;
}

function WorkSpaceBar() {
  const { isLoading, data: workspaces } = useQuery<IWorkSpace[]>(
    'workspaces',
    getWorkspaces
  );

  // 모달창 여닫기
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="WorkSpaceBar">
      {/* 워크 스페이스 리스트 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        workspaces?.map((workspace) => (
          <SingleWorkSpace
            workspace={workspace}
            key={workspace.workspace_idx}
          />
        ))
      )}

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
        <WorkSpaceModal onClickToggleModal={onClickToggleModal} />
      )}
    </div>
  );
}

export default WorkSpaceBar;
