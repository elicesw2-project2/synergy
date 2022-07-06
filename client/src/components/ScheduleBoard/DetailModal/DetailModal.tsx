import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';
import React, { useCallback, useState } from 'react';
import 'styles/base/Modal.module.scss';
import { useMutation, useQueryClient } from 'react-query';
import { patchScheduleCard } from 'utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import styles from './DetailModal.module.scss';

interface IProps {
  onClickToggleModal: () => void;
  card: IScheduleCard;
}

function DetailModal({ onClickToggleModal, card }: IProps) {
  const [content, setContent] = useState(card.content);
  const [isOpenContent, setIsOpenContent] = useState<boolean>(false);
  const onClickToggleContent = useCallback(() => {
    setIsOpenContent(!isOpenContent);
  }, [isOpenContent]);

  const handleChangeContent = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const [title, setTitle] = useState<string>(card.title);
  const [isOpenTitle, setIsOpenTitle] = useState<boolean>(false);
  const onClickToggleTitle = useCallback(() => {
    setIsOpenTitle(!isOpenTitle);
  }, [isOpenTitle]);

  const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const patchMutation = useMutation(patchScheduleCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleCards');
    },
  });

  const handleUpdateContent = () => {
    patchMutation.mutate({
      schedulecard_idx: card.schedulecard_idx,
      title,
      content,
    });
    onClickToggleContent();
  };

  return (
    <div className={styles.background}>
      <div className={styles.custom_container}>
        <form className={styles.form}>
          {/* 나가기 버튼 */}
          <div className={styles.input_container}>
            {isOpenTitle ? (
              <>
                <input
                  type="text"
                  className={styles.issue_title}
                  value={title}
                  onChange={handleChangeTitle}
                />
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.title_save_button}
                    onClick={handleUpdateContent}
                  />
                  <FontAwesomeIcon
                    icon={faX}
                    className={styles.title_close_button}
                    onClick={onClickToggleTitle}
                  />
                </div>
              </>
            ) : (
              <button
                type="button"
                className={`${styles.issue_title} ${styles.issue_title_button}`}
                onClick={onClickToggleTitle}
              >
                {card.title}
              </button>
            )}

            <span className={styles.description}>설명</span>
            {isOpenContent ? (
              <div>
                <textarea value={content} onChange={handleChangeContent} />
                <button
                  type="button"
                  onClick={handleUpdateContent}
                  className={styles.content_save_button}
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={onClickToggleContent}
                  className={styles.content_close_button}
                >
                  닫기
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onClickToggleContent}
                className={styles.add_button}
              >
                설명 추가하기...
              </button>
            )}
          </div>
          <div className={styles.detail_container}>
            <div>상태: {card.category}</div>
            <div>
              <span>작성자: {card.nickname}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.close_button}
          >
            X
          </button>
        </form>
      </div>
    </div>
  );
}

export default DetailModal;
