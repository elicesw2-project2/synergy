import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import EditModal from './EditModal';
import { postInvitation } from 'api/Invitation';
import { useRouter } from 'next/router';

interface IProps {
  handleToggleInviteModal: () => void;
}

const HOST = process.env.NEXT_PUBLIC_ENV_HOST;
const validity_list = ['없음', '1일', '7일', '30일'];
const uses_list = ['없음', '1회', '10회', '50회'];

function InviteModal({ handleToggleInviteModal }: IProps) {
  const router = useRouter();

  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClickCopy = async () => {
    await navigator.clipboard.writeText(`${HOST}/invite/${inviteLink}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const [isOpenValidityModal, setIsOpenValidityModal] = useToggle();
  const [isOpenUsesModal, setIsOpenUsesModal] = useToggle();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [validity, setValidity] = useState<string>('없음');
  const [uses, setUses] = useState<string>('없음');
  const [inviteLink, setInviteLink] = useState<string>('');

  useEffect(() => {
    (async () => {
      const data = {
        workspace_idx: Number(router.query.workspaceIdx),
        expires_date: '2023-12-31',
        maximum_cnt: Number.MAX_SAFE_INTEGER,
      };
      const link = await postInvitation(data);
      setInviteLink(link);
    })();
  }, []);

  return (
    <Background>
      {isEdit ? (
        <EditContainer ref={wrapperRef}>
          <CloseButton type="button" onClick={() => setIsEdit(false)}>
            X
          </CloseButton>
          <Title>서버 초대 링크 설정</Title>
          <Detail>
            <span>잔여 유효 기간</span>
            <SelectButton
              type="button"
              onClick={() => setIsOpenValidityModal()}
            >
              <span>{validity}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </SelectButton>
            {isOpenValidityModal && (
              <EditModal
                list={validity_list}
                top="42%"
                setFn={setValidity}
                toggleFn={setIsOpenValidityModal}
              />
            )}
            <span>최대 사용 횟수</span>
            <SelectButton type="button" onClick={() => setIsOpenUsesModal()}>
              <span>{uses}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </SelectButton>
            {isOpenUsesModal && (
              <EditModal
                list={uses_list}
                top="67%"
                setFn={setUses}
                toggleFn={setIsOpenUsesModal}
              />
            )}
          </Detail>
          <EditButtonWrapper>
            <button type="button" onClick={() => setIsEdit(false)}>
              취소
            </button>
            <button type="button">새 링크 만들기</button>
          </EditButtonWrapper>
        </EditContainer>
      ) : (
        <Container>
          {/* 나가기 버튼 */}
          <Form>
            <CloseButton type="button" onClick={handleToggleInviteModal}>
              X
            </CloseButton>
            <FormTitle>친구를 그룹으로 초대하기</FormTitle>
            <InviteLink>
              <input value={`${HOST}/invite/${inviteLink}`} readOnly />
              <Copy type="button" onClick={handleClickCopy} $isCopy={isCopy}>
                {isCopy ? '복사됨' : '초대 링크 복사'}
              </Copy>
            </InviteLink>
            <InviteEdit>
              <span>초대 링크가 ..일 후, 혹은 ..번 사용후 만료 돼요.</span>
              <button type="button" onClick={() => setIsEdit(true)}>
                초대 링크 편집하기
              </button>
            </InviteEdit>
          </Form>
        </Container>
      )}
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  width: 80%;
  max-width: 500px;
  background: white;
  color: white;
  position: relative;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #495057;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 25rem;
  background: white;
  color: white;
  position: relative;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  background-color: #495057;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.7rem;
  right: 1.5rem;
  color: white;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  background: inherit;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #ced4da;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  span {
    padding: 1rem 0;
  }
`;

const SelectButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #ced4da;
  background: #212529;
  border: none;
  border-radius: 4px;
  padding: 0.1rem 1rem;
  margin: 0.3rem 0;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
  width: 100%;
  button {
    border-radius: 4px;
    background: #a9e34b;
    border: none;
    padding: 0.7rem;
    &:hover {
      opacity: 0.7;
    }
  }

  button:first-child {
    color: white;
    background: inherit;
    margin-right: 0.5rem;
    &:hover {
      color: #495057;
      background: #ced4da;
    }
  }
`;

const Form = styled.form`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const InviteLink = styled.div`
  position: relative;
  margin-bottom: 0.8rem;
  border-radius: 4px;
  input {
    width: 100%;
    color: #ced4da;
    background: #212529;
    padding: 1rem 0.8rem;
    margin-right: 0.5rem;
    border: none;
    outline: none;
  }
  button {
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
    padding: 0.6rem;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const Copy = styled.button<{ $isCopy: boolean }>`
  background: ${(props) => (props.$isCopy ? '#91a7ff' : '#a9e34b')};
`;

const InviteEdit = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  button {
    color: #91a7ff;
    background: inherit;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default InviteModal;
