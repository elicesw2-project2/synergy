import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { getChannels } from '../../../utils/api';
import { useRouter } from 'next/router';
import Link from 'next/link';

function TopBar() {
  const router = useRouter();
  const { channelCategoryIdx, channelIdx } = router.query;
  const { data: channels } = useQuery(
    ['channels', Number(channelCategoryIdx)],
    () => getChannels(Number(channelCategoryIdx))
  );

  const filteredChannel = channels?.find(
    (channel: any) => channel.channel_idx === Number(channelIdx)
  );

  return (
    <Container>
      <h1>{filteredChannel ? `# ${filteredChannel?.name}` : ''}</h1>
      <div>
        <Icon className="TopBar__icon" icon={faUser} />
        <Icon className="TopBar__icon" icon={faBell} />
        <Icon className="TopBar__icon" icon={faMagnifyingGlass} />
        <Link href="/login">
          <FontAwesomeIcon
            className="TopBar__icon"
            icon={faArrowRightFromBracket}
          />
        </Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  color: white;
  background-color: #343a40;
  h1 {
    font-size: 1.3rem;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  padding: 0 10px;
  color: white;
`;

export default TopBar;
