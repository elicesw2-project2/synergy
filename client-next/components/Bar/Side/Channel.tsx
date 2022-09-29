import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faGear, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChannel, patchChannel } from '../../../api/api';
import Link from 'next/link';
import { IChannel } from './ChannelCategory';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface IProps {
  channel: IChannel;
}

function Channel({ channel }: IProps) {
  const router = useRouter();
  const workspaceIdx = router.query.workspaceIdx as string;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(channel.name);

  const channelIcon = channel.type === 1 ? '🗓' : '📝';

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(!isEdit);
    console.log(isEdit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  // 수정 및 삭제 API 요청 처리
  const queryClient = useQueryClient();
  const updateMutation = useMutation(patchChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channels']);
    },
  });
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedChannel = channel;
    updatedChannel.name = name;
    updateMutation.mutate(updatedChannel);
    setIsEdit(false);
  };

  const deleteMutation = useMutation(deleteChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channels']);
    },
  });
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteMutation.mutate(channel.channel_idx);
  };

  return (
    <Container
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {isEdit ? (
        <li>
          <Input value={name} onChange={handleChange} />
        </li>
      ) : (
        <Link
          href={`/workspace/${workspaceIdx}/channels/${channel.category_idx}/channel/${channel.channel_idx}/${channel.type}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <a>
            <ChannelName>
              {/* <FontAwesomeIcon icon={faHashtag} /> */}
              {channelIcon}
              {channel.name.length > 10
                ? ` ${channel.name.slice(0, 10)}...`
                : ` ${channel.name}`}
            </ChannelName>
          </a>
        </Link>
      )}
      {isVisible && (
        <>
          {isEdit ? (
            <ConfirmButton type="button" onClick={handleConfirm}>
              확인
            </ConfirmButton>
          ) : (
            <ButtonWrapper>
              <EditIcon icon={faGear} onClick={handleEdit} />
              <DeleteIcon icon={faX} onClick={handleDelete} />
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 4px 0px;
  &:hover {
    box-shadow: 0 0 50px #ccc;
    background-color: #fff;
  }
`;

const ConfirmButton = styled.button`
  color: black;
  background: #74b816;
  height: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 10px;
  gap: 10px;
`;

const EditIcon = styled(FontAwesomeIcon)`
  align-self: center;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  align-self: center;
  cursor: pointer;
`;

const Input = styled.input`
  width: 60%;
  color: #adb5bd;
  background: inherit;
  padding: 0.6rem 0.5rem;
  border: none;
  outline: none;
`;

const ChannelName = styled.li`
  font-size: 0.9rem;
  width: 100%;
  padding: 0.6rem 0.5rem;
  border: gray;
  text-decoration: none;
`;

export default Channel;
