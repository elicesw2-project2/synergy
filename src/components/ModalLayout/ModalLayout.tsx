import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './ModalLayout.module.scss';

interface IProps {
  onClickToggleModal: () => void;
  handleSubmit: () => void;
}

function ModalLayout({ onClickToggleModal, handleSubmit }: IProps) {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 나가기 버튼 */}
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.close_button}
          >
            X
          </button>
          {/* 서버 추가 버튼 */}
          <input type="submit" className={styles.submit_button} value="제출" />
          <Outlet />
        </form>
      </div>
    </div>
  );
}

export default ModalLayout;
