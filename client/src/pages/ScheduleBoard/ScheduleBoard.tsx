import Container from 'components/ScheduleBoard/Container/ContainerLayout';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getScheduleCards } from 'utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './ScheduleBoard.module.scss';

export interface IScheduleCard {
  schedulecard_idx: number;
  channel_idx: number;
  title: string;
  category: string;
  content: string;
  due_date: string;
  nickname: string;
}

export interface IScheduleCardType {
  todo: IScheduleCard[];
  process: IScheduleCard[];
  done: IScheduleCard[];
}

function ScheduleBoard() {
  const { channelIdx } = useParams();

  const { data: scheduleCards } = useQuery<IScheduleCardType>(
    ['scheduleCards', channelIdx],
    () => getScheduleCards(channelIdx)
  );

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const onClickToggleDropdown = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  return (
    <div className={styles.home}>
      <FontAwesomeIcon
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
      )}
      <div className={styles.board}>
        <Container type="todo" data={scheduleCards?.todo} />
        <Container type="process" data={scheduleCards?.process} />
        <Container type="done" data={scheduleCards?.done} />
      </div>
    </div>
  );
}

export default ScheduleBoard;
