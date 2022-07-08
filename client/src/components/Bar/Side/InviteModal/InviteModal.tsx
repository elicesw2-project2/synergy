import React, { useState } from 'react';
import styles from './InviteModal.module.scss';

interface IProps {
  handleToggleInviteModal: () => void;
}

function InviteModal({ handleToggleInviteModal }: IProps) {
  const handleSubmit = () => {
    return 'hello';
  };

  const [isCopy, setIsCopy] = useState<boolean>(false);

  const handleClickCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {/* 나가기 버튼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={handleToggleInviteModal}
            className={styles.close_button}
          >
            X
          </button>
          <span className={styles.form_title}>친구를 그룹으로 초대하기</span>
          <div className={styles.form_invite_link}>
            <input value="https://synergy.gg/47abN6dr" />
            <button
              type="button"
              onClick={handleClickCopy}
              className={isCopy ? `${styles.copy}` : ''}
            >
              {isCopy ? '복사됨' : '초대 링크 복사'}
            </button>
          </div>
          <div className={styles.form_invite_edit}>
            <span>초대 링크가 ..일 후, 혹은 ..번 사용후 만료 돼요.</span>
            <button type="button">초대 링크 편집하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteModal;
