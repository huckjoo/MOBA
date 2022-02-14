import React from 'react';
import styles from './ChooseShop.module.css';
// import { Link } from "react-router-dom";

const ChooseShop = (props) => {
  function OnClickHandler(event) {
    switch (event.target.id) {
      case 'musinsa':
        return (document.location.href = 'https://www.musinsa.com/app/');
      case 'wConcept':
        return (document.location.href = 'https://www.wconcept.co.kr/');
      case 'brandy':
        return (document.location.href = 'https://www.brandi.co.kr/');
      default:
        return (document.location.href = '#');
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <span>모바</span>
        <p>쇼핑몰을 선택하세요.</p>
      </div>
      <p>
        <button
          id="musinsa"
          className={styles.startBtn}
          onClick={OnClickHandler}
        >
          무신사
        </button>
      </p>
      <p>
        <button
          id="wConcept"
          className={styles.startBtn}
          onClick={OnClickHandler}
        >
          W Concept
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
  );
};

export default ChooseShop;
