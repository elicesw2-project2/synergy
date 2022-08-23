import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface IProps {
  list: string[];
  top: string;
  setFn: Dispatch<SetStateAction<string>>;
  toggleFn: () => void;
}

const EditModal = ({ list, top, setFn, toggleFn }: IProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 바깥쪽 탐지 감지
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (wrapperRef && !wrapperRef.current?.contains(target)) {
      toggleFn();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleSelect = (event: any) => {
    setFn(event.currentTarget.innerText);
    toggleFn();
  };

  return (
    <Container top={top} ref={wrapperRef}>
      <ul>
        {list.map((item, i) => (
          <li key={i} onClick={handleSelect}>
            {item}
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  width: 21rem;
  background: #3b3f44;
  li {
    padding: 15px;
    &:hover {
      background-color: #2e3136;
    }
  }
`;

export default EditModal;
