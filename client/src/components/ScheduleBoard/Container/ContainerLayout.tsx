import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postScheduleCard } from 'utils/api';
import styles from './ContainerLayout.module.scss';
import Card from '../Card/Card';

interface IProps {
  type: string;
  data: IScheduleCard[] | undefined;
}

function ContainerLayout({ type, data }: IProps) {
  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [isTopOpen, setIsTopOpen] = useState<boolean>(false);
  const [issue, setIssue] = useState<string>('');

  const { channelIdx } = useParams();

  const queryClient = useQueryClient();
  const createMutation = useMutation(postScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleCards');
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
    <div className={styles.container}>
      <div className={styles.title_container}>
        <span className={styles.type}>
          {type} ({data?.length})
        </span>
        <FontAwesomeIcon
          icon={faPlus}
          className={styles.title_plus_icon}
          onClick={() => setIsTopOpen(true)}
        />
      </div>
      <div>
        {isTopOpen && (
          <div className={styles.text_container}>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <button
              type="button"
              className={styles.add_button}
              onClick={handleCreateCard}
            >
              만들기
            </button>
            <button
              type="button"
              onClick={() => setIsTopOpen(!isTopOpen)}
              className={styles.close_button}
            >
              닫기
            </button>
          </div>
        )}
      </div>
      {data?.map((card) => (
        <Card card={card} />
      ))}
      <div>
        {!isBottomOpen ? (
          <button
            type="button"
            onClick={() => setIsBottomOpen(!isBottomOpen)}
            className={styles.create_issue_button}
          >
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            이슈 만들기
          </button>
        ) : (
          <div className={styles.text_container}>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <button
              type="button"
              className={styles.add_button}
              onClick={handleCreateCard}
            >
              만들기
            </button>
            <button
              type="button"
              onClick={() => setIsBottomOpen(!isBottomOpen)}
              className={styles.close_button}
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContainerLayout;
