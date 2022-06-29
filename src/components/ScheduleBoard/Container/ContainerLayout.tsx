import React from 'react';
import Card from '../Card/Card';

import styles from './ContainerLayout.module.scss';

interface IProps {
  type: string;
}

function ContainerLayout({ type }: IProps) {
  return (
    <div className={styles.container}>
      <span>{type}</span>
      <Card />
    </div>
  );
}

export default ContainerLayout;
