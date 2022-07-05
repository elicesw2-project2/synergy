import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import React, { useCallback, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { useMutation, useQueryClient } from 'react-query';
import { deleteScheduleCard } from 'utils/api';
import styles from './Card.module.scss';
import DetailModal from '../DetailModal/DetailModal';

interface IProps {
  card: IScheduleCard;
}

function Card({ card }: IProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleCards');
    },
  });

  const handleDeleteCard = () => {
    deleteMutation.mutate(card.schedulecard_idx);
  };

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <div className={styles.card} onClick={onClickToggleModal}>
        <span className={styles.card_title}>{card.title}</span>
        <span>{card.nickname}</span>
        <FontAwesomeIcon
          icon={faX}
          className={styles.delete_icon}
          onClick={handleDeleteCard}
        />
      </div>
      {isOpenModal && (
        <DetailModal onClickToggleModal={onClickToggleModal} card={card} />
      )}
    </>
  );
}

export default Card;
