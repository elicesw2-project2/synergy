import React from 'react';
import ContainerLayout from 'components/ScheduleBoard/ContainerLayout';
import { useQuery } from '@tanstack/react-query';
import { getScheduleCards } from 'api/api';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export interface IScheduleCard {
  schedulecard_idx: number;
  channel_idx: number;
  title: string;
  category: string;
  content: string;
  create_date: string;
  due_date: string;
  nickname: string;
}

export interface IScheduleCardType {
  todo: IScheduleCard[];
  process: IScheduleCard[];
  done: IScheduleCard[];
}

function ScheduleBoard() {
  const router = useRouter();
  const channelIdx = router.query.channelIdx as string;

  const { data: scheduleCards } = useQuery<IScheduleCardType>(
    ['scheduleCards', channelIdx[2]],
    () => getScheduleCards(channelIdx[2])
  );

  if (!channelIdx) return null;

  // const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  // const onClickToggleDropdown = useCallback(() => {
  //   setIsOpenDropdown(!isOpenDropdown);
  // }, [isOpenDropdown]);

  return (
    <Home>
      {/* <FontAwesomeIcon
        icon={faEllipsis}
        className={styles.menu_icon}
        onClick={onClickToggleDropdown}
      />
      {isOpenDropdown && (
        <div className={styles.dropdown}>
          <ul>
            <li>
              <button type="button" className={styles.dropdown_button}>
                보드 구성
              </button>
              <button type="button" className={styles.dropdown_button}>
                워크플로 관리
              </button>
              <button type="button" className={styles.dropdown_button}>
                사용자 지정 필터 관리
              </button>
            </li>
          </ul>
        </div>
      )} */}
      <Board>
        <ContainerLayout type="todo" data={scheduleCards?.todo} />
        <ContainerLayout type="process" data={scheduleCards?.process} />
        <ContainerLayout type="done" data={scheduleCards?.done} />
      </Board>
    </Home>
  );
}

const Home = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: white;
  background-color: #343a40;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Board = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.5rem 0 1rem;
`;

export default ScheduleBoard;
