import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Collection = () => {
  // const [productImg, setProductImg] = useState([]);

  // useEffect(() => {
  //   axios.get('/collection').then((response) => {
  //     const users = response.data;
  //     console.log(users);

  //     for (let user of users) {
  //       for (let product of user.products) {
  //         console.log(product.img);
  //         setProductImg([...productImg, product.img]);
  //       }
  //     }
  //   });
  // }, []);

  const productImg = [];
  useEffect(() => {
    axios.get('/collection').then((response) => {
      const users = response.data;
      console.log(users);

      for (let user of users) {
        for (let product of user.products) {
          productImg.push(product.img);
        }
      }
    });
  }, []);
  console.log('이거나오냐?ㅎ', productImg);

  return (
    <>
      {productImg.map((items, index) => (
        <div>hi</div>
      ))}
      <h1>콜렉션 페이지</h1>
    </>
  );
};

export default Collection;
