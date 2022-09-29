import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChannelCategory } from '../../../api/api';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
            <FontAwesomeIcon icon={faX} />
          </CloseButton>
          <div>
            <input
              type="text"
              placeholder="새로운 채널 카테고리 이름을 입력해주세요."
              onChange={handleChange}
            />
            <SubmitButton type="submit">OK</SubmitButton>
          </div>
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
  width: 400px;
  height: 150px;
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 0px 12px;
  flex-direction: column;

  h1 {
    color: #3b4463;
    font-size: 1.2rem;
    padding: 0 0.3rem;
    margin-bottom: 1.5rem;
  }
  div {
    border: 1px solid #a3a6ba;
    border-radius: 16px;
    overflow: hidden;
    margin: 1px;
    input {
      width: 85%;
      border: none;
      outline: none;
      padding: 12px 16px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.1rem;
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
  bottom: 0;
  cursor: pointer;
  border: 0;
  padding: 6px 12px;
  border-radius: 8px;
  color: #fff;
  background: #8270ff;
  &:hover {
    opacity: 0.7;
  }
`;

export default AddChannelCategory;
