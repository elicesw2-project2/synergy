import React, { Dispatch, SetStateAction } from 'react';

import styles from '../Bar/Side/SideBarModal/SideBarModal.module.scss';

interface iProps {
  type: string;
  setChannelType: Dispatch<SetStateAction<number>>;
  checked?: boolean;
}

function RadioButton({ type, setChannelType, checked }: iProps) {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value === '일정') {
      setChannelType(1);
    } else if (target.value === '문서') {
      setChannelType(2);
    }
  };

  return (
    <div className={styles.type}>
      <span>{type} 채널</span>
      <input
        type="radio"
        name="type"
        value={type}
        onClick={handleClick}
        defaultChecked={checked}
      />
    </div>
  );
}

export default RadioButton;
