import React, { useCallback, useState } from 'react';
import { IScheduleCard } from './ScheduleBoard';
import DetailModal from './DetailModal';
import styled from 'styled-components';

interface IProps {
  card: IScheduleCard;
}

function Card({ card }: IProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <Container onClick={onClickToggleModal}>
        <Title>{card.title}</Title>
        <Nickname>{card.content || 'blah blah blah blah blah'}</Nickname>
        <CreatedAt>{card.create_date.slice(0, 10)}</CreatedAt>
      </Container>
      {isOpenModal && (
        <DetailModal onClickToggleModal={onClickToggleModal} card={card} />
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  height: 150px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
  transition: background-color 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #94d82d;
    opacity: 0.7;
  }

  &:not(:first-child) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Nickname = styled.span`
  font-size: 0.89rem;
`;

const CreatedAt = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.6rem;
`;

export default Card;
