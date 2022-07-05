import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { useMutation, useQueryClient } from 'react-query';
import { deleteScheduleCard } from 'utils/api';
import styles from './Card.module.scss';

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
  return (
    <div className={styles.card}>
      <span>{card.title}</span>
      <span>{card.content}</span>
      <FontAwesomeIcon
        icon={faX}
        className={styles.delete_icon}
        onClick={handleDeleteCard}
      />
    </div>
  );
}

export default Card;
