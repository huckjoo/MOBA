import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      {productImg.map((item, index) => (
        <img src={item} alt="img"></img>
      ))}
      <h1>콜렉션 페이지</h1>
    </>
  );
};

export default Collection;
