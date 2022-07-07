import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import React, { useCallback, useState } from 'react';
import styles from './Card.module.scss';
import DetailModal from '../DetailModal/DetailModal';

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
      <div className={styles.card} onClick={onClickToggleModal}>
        <span className={styles.card_title}>{card.title}</span>
        <span className={styles.card_nickname}>{card.nickname}</span>
        <span className={styles.card_create_date}>
          {card.create_date.slice(0, 10)}
        </span>
      </div>
      {isOpenModal && (
        <DetailModal onClickToggleModal={onClickToggleModal} card={card} />
      )}
    </>
  );
}

export default Card;
