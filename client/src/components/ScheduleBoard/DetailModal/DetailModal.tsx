import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import React from 'react';
import styles from './DetailModal.module.scss';
import 'styles/base/Modal.module.scss';

interface IProps {
  onClickToggleModal: () => void;
  card: IScheduleCard;
}

function DetailModal({ onClickToggleModal, card }: IProps) {
  return (
    <div className={styles.background}>
      <div className={styles.custom_container}>
        <form className={styles.form}>
          {/* 나가기 버튼 */}
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.close_button}
          >
            X
          </button>
          <div className={styles.input_container}>
            <span className={styles.issue_title}>{card.title}</span>
            <span>{card.category}</span>
            <span>{card.content}</span>
            <textarea />
          </div>
          {/* 서버 추가 버튼 */}
          <input type="submit" className={styles.submit_button} value="제출" />
        </form>
      </div>
    </div>
  );
}

export default DetailModal;
