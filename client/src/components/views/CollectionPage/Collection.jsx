import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Collection.module.css';

const Collection = () => {
  const [productImg, setProductImg] = useState([]);

  useEffect(async () => {
    let productImg = [];
    await axios.get('/collection').then((response) => {
      const users = response.data;
      console.log(users);

      for (let user of users) {
        for (let product of user.products) {
          productImg.push(product.img);
        }
      }
      setProductImg(productImg);
    });
  }, []);

  console.log('이거나오냐?ㅎ', productImg);

  return (
    <>
      <h1>콜렉션 페이지</h1>
      <section>
        <article>
          <div>
            <ul>
              {productImg.map((item, index) => (
                <img key={index} className={styles.itemImg} src={item} alt="img"></img>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </>
  );
};

export default Collection;
