import React from 'react';
import Auth from '../../../hoc/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../header/Header';
import styles from './MainPage.module.css';
function MainPage() {
  const navigate = useNavigate();

  const logout = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃에 실패하였습니다.');
      }
      console.log(response.data);
    });
  };
  const goToShops = () => {
    navigate('/shops');
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.selectBtns}>
          <button className={styles.buttons}>친구관리</button>
          <button className={styles.buttons}>장바구니</button>
          <button
            id={styles.shoppingStart}
            className={styles.buttons}
            onClick={goToShops}
          >
            쇼핑시작
          </button>
          <button
            className={styles.buttons}
            id={styles.logoutBtn}
            onClick={logout}
          >
            {' '}
            로그아웃{' '}
          </button>
        </div>
      </div>
    </>
  );
}

export default Auth(MainPage, true);
