import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './InviteModal.module.scss';

interface IProps {
  handleToggleInviteModal: () => void;
}

function InviteModal({ handleToggleInviteModal }: IProps) {
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClickCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <div className={styles.background}>
      {isEdit ? (
        <div className={styles.edit_container}>
          <button
            type="button"
            onClick={() => setIsEdit(false)}
            className={styles.close_button}
          >
            X
          </button>
          <span className={styles.edit_title}>서버 초대 링크 설정</span>
          <div className={styles.edit_detail}>
            <span>잔여 유효 기간</span>
            <button type="button" className={styles.edit_select_button}>
              <span>없음</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <span>최대 사용 횟수</span>
            <button type="button" className={styles.edit_select_button}>
              <span>없음</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          <div className={styles.edit_button_container}>
            <button type="button" onClick={() => setIsEdit(false)}>
              취소
            </button>
            <button type="button">새 링크 만들기</button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {/* 나가기 버튼 */}
          <form className={styles.form}>
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
              <button type="button" onClick={() => setIsEdit(true)}>
                초대 링크 편집하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default InviteModal;
