import React, { useState } from 'react';
import RadioButton from 'components/Button/RadioButton';

import { useMutation, useQueryClient } from 'react-query';
import { postChannel } from 'utils/api';

import styles from './SideBarModal.module.scss';

interface iProps {
  onClickToggleModal: () => void;
  categoryIdx: number;
}

function SideBarModal({ onClickToggleModal, categoryIdx }: iProps) {
  const [channelName, setChannelName] = useState<string>('');

  // 일정 관리가 1번, 문서 채널이 2번
  const [channelType, setChannelType] = useState<number>(2);
  const handleChangeChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(postChannel, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('channels');
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      name: channelName,
      type: channelType,
      category_idx: categoryIdx,
    });
    onClickToggleModal();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {/* 나가기 버튼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.close_button}
          >
            X
          </button>
          <h1>채널 만들기</h1>
          <RadioButton
            type="문서"
            setChannelType={setChannelType}
            checked
            key="1"
          />
          <RadioButton type="일정" setChannelType={setChannelType} key="2" />
          <div className={styles.input}>
            <h2>채널 이름</h2>
            <input
              placeholder="# 새로운 채널"
              onChange={handleChangeChannelName}
              required
            />
          </div>
          {/* 서버 추가 버튼 */}
          <input type="submit" className={styles.submit_button} value="제출" />
        </form>
      </div>
    </div>
  );
}

export default SideBarModal;
