import React, { useCallback, useState } from 'react';
import { IScheduleCard } from './ScheduleBoard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteScheduleCard, patchScheduleCard } from 'api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface IProps {
  onClickToggleModal: () => void;
  card: IScheduleCard;
}

function DetailModal({ onClickToggleModal, card }: IProps) {
  const [content, setContent] = useState(card.content);
  const [isOpenContent, setIsOpenContent] = useState<boolean>(false);
  const onClickToggleContent = useCallback(() => {
    setIsOpenContent(!isOpenContent);
  }, [isOpenContent]);

  const handleChangeContent = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const [title, setTitle] = useState<string>(card.title);
  const [isOpenTitle, setIsOpenTitle] = useState<boolean>(false);
  const onClickToggleTitle = useCallback(() => {
    setIsOpenTitle(!isOpenTitle);
  }, [isOpenTitle]);

  const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const patchMutation = useMutation(patchScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['scheduleCards']);
    },
  });

  const handleUpdateContent = () => {
    patchMutation.mutate({
      schedulecard_idx: card.schedulecard_idx,
      title,
      content,
    });
    onClickToggleContent();
  };

  const deleteMutation = useMutation(deleteScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['scheduleCards']);
    },
  });

  const handleDeleteCard = () => {
    deleteMutation.mutate(card.schedulecard_idx);
    onClickToggleModal();
  };

  return (
    <Background>
      <Container>
        <Form>
          <InputWrapper>
            <Category>{card.category}</Category>
            {isOpenTitle ? (
              <>
                <IssueTitle
                  type="text"
                  value={title}
                  onChange={handleChangeTitle}
                />
                <>
                  <StyledButton icon={faCheck} onClick={handleUpdateContent} />
                  <StyledButton icon={faX} onClick={onClickToggleTitle} />
                </>
              </>
            ) : (
              <IssueTitleButton
                as="button"
                type="button"
                onClick={onClickToggleTitle}
              >
                {card.title}
              </IssueTitleButton>
            )}
            <DueDate>{card.create_date.slice(0, 10)}</DueDate>
            <Description>설명</Description>
            {isOpenContent ? (
              <div>
                <DescriptionTextarea
                  value={content}
                  onChange={handleChangeContent}
                />
                <button type="button" onClick={handleUpdateContent}>
                  저장
                </button>
                <button type="button" onClick={onClickToggleContent}>
                  닫기
                </button>
              </div>
            ) : (
              <AddButton type="button" onClick={onClickToggleContent}>
                설명 추가하기...
              </AddButton>
            )}
          </InputWrapper>
          <DetailCotainer>
            <DetailWrapper>
              <DetailBackground>마감일</DetailBackground>
              <span>{card.due_date.slice(0, 10)}</span>
            </DetailWrapper>
            <DetailWrapper>
              <DetailBackground>작성자</DetailBackground>
              <span>{card.nickname}</span>
            </DetailWrapper>
          </DetailCotainer>
          <CloseButton type="button" onClick={onClickToggleModal}>
            X
          </CloseButton>
          <DeleteIcon icon={faTrashCan} onClick={handleDeleteCard} />
        </Form>
      </Container>
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
  position: relative;
  width: 50%;
  height: 25rem;
  margin: 0 auto;
  padding: 3rem 3rem;
  border-radius: 15px;
  color: #dee2e6;
  overflow: auto;
  background-color: #495057;
`;

const Category = styled.span`
  width: 15%;
  color: #f59f00;
  font-size: 1.2rem;
  font-weight: 600;
  background: #fff3bf;
  text-align: center;
  border-radius: 16px;
  padding: 0.5rem;
`;

const DueDate = styled.span`
  width: 30%;
  opacity: 0.6;
  margin-bottom: 2rem;
  padding: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 60%;
  margin-right: 3rem;
`;

const IssueTitle = styled.input`
  color: white;
  font-size: 2.5rem;
  padding: 0.5rem;
  margin: 0.3rem 0;
  border: 0;
  border-radius: 8px;
  background: inherit;
  text-align: left;
`;

const IssueTitleButton = styled(IssueTitle)`
  cursor: pointer;
  &:hover {
    background: #dee2e6;
  }
`;

const StyledButton = styled(FontAwesomeIcon)`
  color: black;
  position: absolute;
  top: 6.5rem;
  font-size: 0.8rem;
  padding: 8px;
  border-radius: 4px;
  background: #e9ecef;
  gap: 1rem;
  &:hover {
    background: #ced4da;
  }
`;

const Description = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const DescriptionTextarea = styled.textarea`
  padding: 0.5rem;
  color: white;
  background: inherit;
  border: none;
  outline: none;
`;

const AddButton = styled.button`
  color: #ced4da;
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  background: inherit;
  text-align: left;
  opacity: 0.7;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ced4da;
  }
`;

const DetailCotainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DetailWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const DetailBackground = styled.div`
  color: black;
  padding: 6px 10px;
  border-radius: 8px;
  margin-right: 0.5rem;
  background: #b3d9bd;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 4px;
  padding: 8px;
  color: #e03131;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    background: #ced4da;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
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

export default DetailModal;
