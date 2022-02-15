import React from 'react';
import styles from './InviteBtn.module.css';

const InviteBtn = (props) => {
  function copyLink() {
    let currentUrl = window.document.location.href; //복사 잘됨
    navigator.clipboard.writeText(currentUrl);
    console.log(currentUrl);
  }
  return (
    <>
      <button className={styles.copyBtn} onClick={copyLink}>
        초대링크 복사
      </button>
    </>
  );
};

export default InviteBtn;
