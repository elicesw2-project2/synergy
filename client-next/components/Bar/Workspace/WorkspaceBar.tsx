import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '../../../utils/api';
import WorkSpaceModal from './Modal/AddWorkspaceModal';
import SingleWorkSpace from './SingleWorkSpace';

export interface IWorkSpace {
  workspace_idx?: number;
  name: string;
  workspace_img?: string;
}

function WorkSpaceBar() {
  const { isLoading, data: workspaces } = useQuery<IWorkSpace[]>(
    ['workspaces'],
    getWorkspaces,
    { staleTime: 10000 }
  );

  // 모달창 여닫기
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Container>
      {/* 워크 스페이스 리스트 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        workspaces?.map((workspace: any) => (
          <SingleWorkSpace
            workspace={workspace}
            key={workspace.workspace_idx}
          />
        ))
      )}

      {/* 워크스페이스 추가 버튼 */}
      <Box type="button" onClick={onClickToggleModal}>
        <CreateIcon icon={faPlus} />
      </Box>

      {/* 모달창 */}
      {isOpenModal && (
        <WorkSpaceModal onClickToggleModal={onClickToggleModal} />
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #1d1f21;
  padding: 10px;
`;

const CreateButton = styled.button`
  cursor: pointer;
`;

const CreateIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: green;
`;

const Box = styled(CreateButton)`
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

export default WorkSpaceBar;
