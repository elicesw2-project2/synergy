import React, { Dispatch, SetStateAction, useState } from 'react';

interface iProps {
  type: string;
  setChannelType: Dispatch<SetStateAction<string>>;
  checked?: boolean;
}

function RadioButton({ type, setChannelType, checked }: iProps) {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setChannelType(target.value);
  };

  return (
    <div className="SideBarModal__Form__Type">
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
