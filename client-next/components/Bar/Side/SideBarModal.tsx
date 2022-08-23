import React, { useState } from 'react';
import styled from 'styled-components';
import RadioButton from '../../Button/RadioButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChannel } from '../../../api/api';

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
      queryClient.invalidateQueries(['channels']);
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
    <Background>
      <Container>
        {/* 나가기 버튼 */}
        <Form onSubmit={handleSubmit}>
          <CloseButton type="button" onClick={onClickToggleModal}>
            X
          </CloseButton>
          <h1>채널 만들기</h1>
          <RadioButton
            type="문서"
            setChannelType={setChannelType}
            checked
            key="1"
          />
          <RadioButton type="일정" setChannelType={setChannelType} key="2" />
          <Input>
            <h2>채널 이름</h2>
            <input
              placeholder="# 새로운 채널"
              onChange={handleChangeChannelName}
              required
            />
          </Input>
          {/* 서버 추가 버튼 */}
          <SubmitButton type="submit" value="제출" />
        </Form>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  color: white;
  position: relative;
  width: 80%;
  height: 30rem;
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  overflow: hidden;
  background-color: #495057;
`;

const Form = styled.form`
  height: 80%;
  h1 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  color: white;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  background: inherit;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #ced4da;
  }
`;

const Input = styled.div`
  h2 {
    padding: 2rem 0 0.5rem 0;
  }
  input {
    width: 95%;
    height: 2rem;
    padding-left: 0.5rem;
  }
`;

const SubmitButton = styled.input`
  position: absolute;
  right: 1.5rem;
  bottom: 2rem;
  cursor: pointer;
  border: 0;
  padding: 8px 16px;
  border-radius: 4px;
  color: black;
  background: #a9e34b;
  &:hover {
    opacity: 0.7;
  }
`;

export default SideBarModal;
