import React from 'react';
import { v1 as uuid } from 'uuid';
import styles from './CreateRoom.module.css';
const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <span>모바</span>
        <p>함께 쇼핑하는 즐거움</p>
      </div>
      <button className={styles.startBtn} onClick={create}>
        친구와 함께 쇼핑하기
      </button>
    </div>
  );
};

export default CreateRoom;
