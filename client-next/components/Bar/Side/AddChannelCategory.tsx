import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChannelCategory } from '../../../utils/api';
import styled from 'styled-components';

interface IProps {
  onClickToggleModal: () => void;
  workspaceIdx: string | undefined;
}

const AddChannelCategory = ({ onClickToggleModal, workspaceIdx }: IProps) => {
  const [name, setName] = useState<string>('');

  const queryClient = useQueryClient();
  const mutation = useMutation(postChannelCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channelCategory']);
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
    <Background>
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>채널 카테고리 만들기</h1>
          <CloseButton type="button" onClick={onClickToggleModal}>
            X
          </CloseButton>
          <input
            type="text"
            placeholder="새로운 카테고리"
            onChange={handleChange}
          />
          <SubmitButton type="submit">제출</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
};

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
  display: flex;
  position: relative;
  height: 8.5rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 15px;
  overflow: hidden;
  background-color: #495057;
`;

const Form = styled.form`
  display: flex;
  width: 20rem;
  flex-direction: column;
  h1 {
    font-size: 1.2rem;
    padding: 0 0.3rem;
    margin-bottom: 1.5rem;
  }
  input {
    width: 93%;
    color: white;
    background-color: #343a40;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 0.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.1rem;
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

const SubmitButton = styled.button`
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

export default AddChannelCategory;
