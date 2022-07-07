import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { getDocument, postDocument } from 'utils/api';

import styles from './Document.module.scss';

export interface IDocument {
  document_idx: number;
  nickname: string;
  title: string;
  content: string;
  date: string;
  channel_idx: string;
}

function Document() {
  const { channelIdx } = useParams();

  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    const result = axios
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
    ['document', channelIdx],
    () => getDocument(channelIdx)
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
      queryClient.invalidateQueries('document');
    },
  });

  const handleSaveContent = () => {
    saveMutation.mutate({
      nickname: documents?.nickname,
      title,
      content,
      channel_idx: channelIdx,
    });
  };

  return (
    <div className={styles.home}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.title_container}>
            <input
              className={styles.title}
              placeholder="제목 없음"
              value={title}
              onChange={handleChangeTitle}
            />
            <button
              className={styles.save_button}
              type="button"
              onClick={handleSaveContent}
            >
              저장
            </button>
          </div>
          <span className={styles.date}>{documents?.date.slice(0, 10)}</span>
          {documents?.nickname ? (
            <span className={styles.nickname}>{documents?.nickname}</span>
          ) : (
            <span className={styles.nickname}>{nickname}</span>
          )}
          {/* <span className={styles.content_span}>{documents?.content}</span> */}
          <textarea
            className={styles.content}
            placeholder="내용을 작성해주세요.."
            value={content}
            onChange={handleChangeContent}
          />
        </>
      )}
    </div>
  );
}

export default Document;
