import React from 'react';
import Auth from '../../../hoc/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../header/Header';
import styles from './ShopsPage.module.css';
function ShopsPage() {
  function OnClickHandler(event) {
    console.log(event.target.id);
    // event.preventDefault();
    switch (event.target.id) {
      case 'moo':
        return (document.location.href = 'https://www.musinsa.com/app/');
      case 'wConcept':
        return (document.location.href = 'https://www.wconcept.co.kr/');
      case 'brandy':
        return (document.location.href = 'https://www.brandi.co.kr/');
      default:
        return (document.location.href = 'http://www.youtube.com');
    }
  }

  return (
    <>
      <Header />
      <div className={styles.background}>
        <div className={styles.title}>
          <span>모바</span>
          <p>쇼핑몰을 선택하세요.</p>
        </div>
        <p>
          <button id="moo" className={styles.startBtn} onClick={OnClickHandler}>
            무신사
          </button>
        </p>
        <p>
          <button
            id="w Concept"
            className={styles.startBtn}
            onClick={OnClickHandler}
          >
            W 컨셉
          </button>
        </p>
        <p>
          <button
            id="brandy"
            className={styles.startBtn}
            onClick={OnClickHandler}
          >
            브랜디
          </button>
        </p>
      </div>
    </>
  );
}

export default Auth(ShopsPage, true);
