import Container from 'components/ScheduleBoard/Container/ContainerLayout';
import React from 'react';

import styles from './ScheduleBoard.module.scss';

function ScheduleBoard() {
  return (
    <div className="Home">
      <div className={styles.board}>
        <Container type="todo" />
        <Container type="process" />
        <Container type="done" />
      </div>
    </div>
  );
}

export default ScheduleBoard;
