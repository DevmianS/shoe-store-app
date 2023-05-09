import React from 'react';

import styles from './spinner.module.css';

const Spinner = ({style}) => {
  return <div className={styles.spinner} style={{...style}}></div>;
};

export default Spinner;
