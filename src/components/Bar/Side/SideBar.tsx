import React from 'react';

// css
import 'styles/Bars/SideBar.scss';

// components
import { useQuery } from 'react-query';
import { getChannelCategory } from 'utils/api';
import { useParams } from 'react-router-dom';
import ChannelCategory from './ChannelCategory';

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

  return (
    <div className="SideBar">
      {/* 워크 스페이스 이름 */}
      <div className="SideBar__category">
        <h1>워크스페이스</h1>
      </div>

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
