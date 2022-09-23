import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocument, postDocument, deleteDocument } from '../api/api';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

export interface IDocument {
  document_idx: number;
  nickname: string;
  title: string;
  content: string;
  date: string;
  channel_idx: string;
}

function Document() {
  const router = useRouter();
  const channelIdx = router.query.channelIdx as string;

  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    axios
      .get(
        `https://circuit-synergy.herokuapp.com/users/${localStorage.getItem(
          'id'
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
          },
        }
      )
      .then((res) => setNickname(res.data.data.nickname));
  }, []);

  const { isLoading, data: documents } = useQuery<IDocument>(
    ['document', channelIdx[2]],
    () => getDocument(channelIdx[2])
  );

  const [title, setTitle] = useState<string | undefined>(documents?.title);
  const [content, setContent] = useState<string | undefined>(
    documents?.content
  );

  useEffect(() => {
    setTitle(documents?.title);
    setContent(documents?.content);
  }, [documents]);

  const handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeContent = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const saveMutation = useMutation(postDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(['document']);
    },
  });

  const handleSaveContent = () => {
    deleteDocument(Number(documents?.document_idx)).then((res) =>
      console.log(res)
    );
    saveMutation.mutate({
      nickname,
      title,
      content,
      channel_idx: channelIdx[2],
    });
  };

  const delButton = () => {
    console.log('asdf');
    deleteDocument(26).then((res) => console.log(res));
  };

  const testButton = () => {
    getDocument(channelIdx[2]).then((res) => console.log(res));
    axios
      .get(
        `https://circuit-synergy.herokuapp.com/documents/channel/${channelIdx[2]}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
          },
        }
      )
      .then((res) => console.log(res.data.data));
  };

  return (
    <Home>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <TitleWrapper>
            <Title
              placeholder="제목 없음"
              value={title}
              onChange={handleChangeTitle}
            />
          </TitleWrapper>
          <DateSpan>{documents?.date.slice(0, 10)}</DateSpan>
          {documents?.nickname ? (
            <NicknameSpan>{documents?.nickname}</NicknameSpan>
          ) : (
            <NicknameSpan>{nickname}</NicknameSpan>
          )}
          <Content
            placeholder="내용을 작성해주세요.."
            value={content}
            onChange={handleChangeContent}
          />
          <SaveButton type="button" onClick={handleSaveContent}>
            저장
          </SaveButton>
        </>
      )}
    </Home>
  );
}

const Home = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 90vh;
  color: black;
  background-color: #dbe1f0;
  border-radius: 10px;
  margin: 10px;
  padding: 5rem 10rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateSpan = styled.span`
  margin-bottom: 1.5rem;
  opacity: 0.7;
`;

const NicknameSpan = styled.span`
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  &::after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 1px solid #adb5bd;
    opacity: 0.7;
    margin-top: 1rem;
  }
`;

const Title = styled.input`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: inherit;
  color: black;
  border: none;
  outline: none;
`;

const Content = styled.textarea`
  background: inherit;
  height: 70%;
  font-size: 1rem;
  color: black;
  border: none;
  outline: none;
  resize: none;
`;

const SaveButton = styled.button`
  height: 3rem;
  width: 5rem;
  padding: 0.2rem 1rem;
  border: 0;
  border-radius: 10px;
  color: white;
  background-color: #8270ff;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default Document;
