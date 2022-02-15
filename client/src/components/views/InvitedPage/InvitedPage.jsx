import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import Header from '../../header/Header';
import styles from './InvitedPage.module.css';

function InvitedPage(props) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.invitedBox}>
          <div className={styles.invitedContents}>
            <div className={styles.invitedText}>
              <span>초대장</span>
              <p>내일 소개팅인데 도와줘!</p>
            </div>
            <button className={styles.buttons}>접속하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth(InvitedPage, 'login');
