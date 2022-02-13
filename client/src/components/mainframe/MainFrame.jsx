import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './MainFrame.module.css';
import Iframe from '../iframe/Iframe';
import WebCam from '../webCam/WebCam';
const MainFrame = (props) => {
  return (
    <section className={styles.frame}>
      <Header />
      <div className={styles.container}>
        <Iframe />
        <WebCam />
      </div>
      <Footer />
    </section>
  );
};

export default MainFrame;
