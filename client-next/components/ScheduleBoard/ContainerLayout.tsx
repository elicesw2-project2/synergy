import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IScheduleCard } from './ScheduleBoard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postScheduleCard } from 'api/api';
import Card from './Card';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface IProps {
  type: string;
  data: IScheduleCard[] | undefined;
}

function ContainerLayout({ type, data }: IProps) {
  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [isTopOpen, setIsTopOpen] = useState<boolean>(false);
  const [issue, setIssue] = useState<string>('');

  const router = useRouter();
  const channelIdx = router.query.channelIdx as string;

  const queryClient = useQueryClient();
  const createMutation = useMutation(postScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['scheduleCards']);
    },
  });

  const handleCreateCard = () => {
    createMutation.mutate({
      channel_idx: Number(channelIdx),
      title: issue,
      category: type,
      content: '',
      due_date: new Date().toISOString().slice(0, 10),
    });
    setIsBottomOpen(false);
    setIsTopOpen(false);
  };

  return (
    <Container>
      <TitleWrapper>
        <Type>
          {type} ({data?.length})
        </Type>
        <TitlePlusIcon icon={faPlus} onClick={() => setIsTopOpen(true)} />
      </TitleWrapper>
      <div>
        {isTopOpen && (
          <TextContainer>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <AddButton type="button" onClick={handleCreateCard}>
              만들기
            </AddButton>
            <CloseButton type="button" onClick={() => setIsTopOpen(!isTopOpen)}>
              닫기
            </CloseButton>
          </TextContainer>
        )}
      </div>
      {data?.map((card) => (
        <Card card={card} key={card.schedulecard_idx} />
      ))}
      <div>
        {!isBottomOpen ? (
          <CreateIssueButton
            type="button"
            onClick={() => setIsBottomOpen(!isBottomOpen)}
          >
            <PlusIcon icon={faPlus} />
            이슈 만들기
          </CreateIssueButton>
        ) : (
          <TextContainer>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <AddButton type="button" onClick={handleCreateCard}>
              만들기
            </AddButton>
            <CloseButton
              type="button"
              onClick={() => setIsBottomOpen(!isBottomOpen)}
            >
              닫기
            </CloseButton>
          </TextContainer>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem;
  width: 30%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TitlePlusIcon = styled(FontAwesomeIcon)`
  opacity: 0.5;
  color: #74b816;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #adb5bd;
  }
`;

const Type = styled.span`
  font-size: 1.3rem;
  opacity: 0.7;
`;

const CreateIssueButton = styled.button`
  background-color: inherit;
  border: none;
  justify-content: flex-start;
  padding: 0.6rem;
  border-radius: 8px;
  color: black;
  background: #74b816;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const PlusIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const TextContainer = styled.div`
  position: relative;
  height: 7rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    padding: 0;
  }
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 0.3rem;
  background: inherit;
  border: 0;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  right: 3rem;
  background: #a9e34b;
  &:hover {
    background: #74b816;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 0.3rem;
  background: inherit;
  border: 0;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  .close_button {
    right: 0;
    &:hover {
      background: #dee2e6;
    }
  }
`;

export default ContainerLayout;
