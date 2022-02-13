import React from 'react';
import styles from './Iframe.module.css';
const Iframe = (props) => (
  <section className={styles.iframe__box}>
    <h1>쇼핑화면</h1>
    <iframe
      title="shopping with your friends, MOBA"
      // src="https://www.wconcept.co.kr/"
      src="https://www.google.com"
      className={styles.iframe__control}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </section>
);

export default Iframe;
