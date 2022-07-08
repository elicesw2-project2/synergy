import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postChannelCategory } from 'utils/api';
import styles from './AddChannelCategory.module.scss';

interface IProps {
  onClickToggleModal: () => void;
  workspaceIdx: string | undefined;
}

function AddChannelCategory({ onClickToggleModal, workspaceIdx }: IProps) {
  const [name, setName] = useState<string>('');

  const queryClient = useQueryClient();
  const mutation = useMutation(postChannelCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('channelCategory');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 모달창 닫기
    e.preventDefault();
    mutation.mutate({ name, workspace_idx: workspaceIdx });
    onClickToggleModal();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <div className={styles.background}>
      <div className={styles.custom_container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>채널 카테고리 만들기</h1>
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.custom_close_button}
          >
            X
          </button>
          <input
            type="text"
            placeholder="새로운 카테고리"
            onChange={handleChange}
          />
          <button type="submit" className={styles.submit_button}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChannelCategory;
