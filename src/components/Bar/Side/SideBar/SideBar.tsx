import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { getChannelCategory } from 'utils/api';
import { useParams } from 'react-router-dom';

// css
import styles from './SideBar.module.scss';

// components
import ChannelCategory from '../ChannelCategory/ChannelCategory';
import AddChannelCategory from '../AddChannelCategory/AddChannelCategory';

export interface IChannelCategory {
  category_idx: number;
  name: string;
  workspace_idx: number;
}

function SideBar() {
  const { workspaceIdx } = useParams();
  const { isLoading, data: channelCategories } = useQuery<IChannelCategory[]>(
    ['channelCategory', workspaceIdx],
    () => getChannelCategory(Number(workspaceIdx))
  );

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const onClickToggleDropdown = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className={styles.container}>
      {/* 워크 스페이스 이름 */}
      <div className={styles.workspace_title} onClick={onClickToggleDropdown}>
        <h1>워크스페이스</h1>
        {isOpenDropdown && (
          <div className={styles.dropdown}>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={onClickToggleModal}
                  className={styles.dropdown_button}
                >
                  채널 카테고리 추가
                </button>
              </li>
            </ul>
          </div>
        )}
        <FontAwesomeIcon icon={faAngleDown} onClick={onClickToggleDropdown} />
      </div>

      {isOpenModal && (
        <AddChannelCategory
          workspaceIdx={workspaceIdx}
          onClickToggleModal={onClickToggleModal}
        />
      )}

      {/* 채널 카테고리 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        channelCategories?.map((category) => (
          <ChannelCategory key={category.category_idx} category={category} />
        ))
      )}
    </div>
  );
}

export default SideBar;
