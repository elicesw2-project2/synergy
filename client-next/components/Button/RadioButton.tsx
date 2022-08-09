import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

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
    <Type>
      <span>{type} 채널</span>
      <input
        type="radio"
        name="type"
        value={type}
        onClick={handleClick}
        defaultChecked={checked}
      />
    </Type>
  );
}

const Type = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #495057;
  padding: 2rem 1rem;
`;

export default RadioButton;
