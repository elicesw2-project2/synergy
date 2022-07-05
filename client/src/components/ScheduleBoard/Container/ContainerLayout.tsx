import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import styles from './ContainerLayout.module.scss';

interface IProps {
  type: string;
  data: IScheduleCard[] | undefined;
}

function ContainerLayout({ type, data }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [issue, setIssue] = useState<string>('');

  return (
    <div className={styles.container}>
      <span className={styles.type}>{type}</span>
      {data?.map((card) => (
        <div className={styles.card}>
          <span>{card.title}</span>
          <span>{card.content}</span>
        </div>
      ))}
      <div>
        {!isOpen ? (
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            이슈 만들기
          </button>
        ) : (
          <div className={styles.text_container}>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <button type="button" className={styles.add_button}>
              만들기
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
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
