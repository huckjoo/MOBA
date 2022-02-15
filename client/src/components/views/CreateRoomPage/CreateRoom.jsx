import React from 'react';
import { v1 as uuid } from 'uuid';
import styles from './CreateRoom.module.css';
import Auth from '../../../hoc/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    const shopWidth = window.screen.width * 0.85;
    const userWidth = window.screen.width * 0.15;

    window.open(
      './chooseshop',
      'zz1',
      `width=${shopWidth}, left=${userWidth},top=0,height=10000, scrollbars=yes, resizable, status=yes, menubar=yes, titlebar=yes`
      // "target"
      // option_1
    );

    window.open(
      `/room/${id}`,
      `zz`,
      `width=${userWidth}, top=0, left=-10000, height=600, scrollbars=yes, resizable=no`,
      'target'
      // option_2
    );
    // props.history.push(`/room/${id}`);
  }
  const navigate = useNavigate();

  const logout = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/');
      }
      console.log(response.data);
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <span>모바</span>
        <p>함께 쇼핑하는 즐거움</p>
      </div>
      <button className={styles.startBtn} onClick={create}>
        친구와 함께 쇼핑하기
      </button>
      <button onClick={logout}> 로그아웃 </button>
    </div>
  );
};

export default Auth(CreateRoom, true);
