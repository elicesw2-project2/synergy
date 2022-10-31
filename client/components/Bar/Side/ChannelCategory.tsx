import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteChannelCategory, getChannels } from 'apis';
import Channel from './Channel';
import SideBarModal from './SideBarModal';
import { IChannelCategory } from './SideBar';
import styled from 'styled-components';

export interface IChannel {
  channel_idx?: number;
  category_idx: number;
  name: string;
  type: number;
}

interface IProps {
  category: IChannelCategory;
}

function ChannelCategory({ category }: IProps) {
  const { isLoading, data: channels } = useQuery(
    ['channels', category.category_idx],
    () => getChannels(category.category_idx)
  );

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const onClickToggleDropdown = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  const handleContextMenu = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClickToggleDropdown();
  };

  // 채널 카테고리 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteChannelCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channelCategory']);
    },
  });
  const handledeleteCategory = () => {
    deleteMutation.mutate(category.category_idx);
    onClickToggleDropdown();
  };

  return (
    <Category>
      <CategoryTitle>
        <h1 onContextMenu={handleContextMenu}>{category.name}</h1>
        <AddButton icon={faPlus} onClick={onClickToggleModal} />
      </CategoryTitle>
      {isOpenDropdown && (
        <Dropdown>
          <ul>
            <li>
              <DropdownButton type="button" onClick={handledeleteCategory}>
                채널 카테고리 삭제
              </DropdownButton>
            </li>
          </ul>
        </Dropdown>
      )}
      {/* 채널 */}
      <Channels>
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <ul>
            {channels?.map((channel: any) => (
              <Channel key={channel.channel_idx} channel={channel} />
            ))}
          </ul>
        )}
      </Channels>
      {/* 채널 생성 모달창 */}
      {isOpenModal && (
        <SideBarModal
          onClickToggleModal={onClickToggleModal}
          categoryIdx={category.category_idx}
        />
      )}
    </Category>
  );
}

const Category = styled.div`
  position: relative;
  text-align: center;
  background-color: #e9ecef;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  font-weight: 600;
  h1 {
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }
`;

const AddButton = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 12px;
  right: 5px;
  opacity: 0.8;
  cursor: pointer;
`;

const Dropdown = styled.div`
  top: 2rem;
  right: 5%;
  position: absolute;
  color: wheat;
  background-color: #2f3640;
  width: 90%;
  padding: 1rem 0;
  border-radius: 0.4rem;
  z-index: 99;
`;

const DropdownButton = styled.button`
  color: white;
  border: 0;
  width: 100%;
  background-color: inherit;
  padding: 0.4rem;
  cursor: pointer;
  &:hover {
    background-color: #91a7ff;
  }
`;

const Channels = styled.div`
  padding: 0 0.7rem;
`;

export default ChannelCategory;
