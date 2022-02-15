import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = props => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const roomNumber = window.location.pathname.split("/")[2];

  const onChangeUrl = e => {
    setUrl(e.target.value);
  };

  const onClickAddBtn = () => {
    if (url.length === 0) {
      alert("url을 확인해주세요");
      return;
    }
    axios
      .post(`/room/${roomNumber}/wishlist`, { url })
      .then(Response => {
        console.log("post : ", Response.data);
        console.log(Response.status);
        if (Response.status === 201) {
          // setProducts([...products, Response.data]);
          props.handleAddProduct(Response.data);
        }
      })
      .catch(Error => {
        console.log(Error);
      });
    setUrl("");
  };

  return (
    <div className={styles.AddWishList}>
      <input className={styles.inputs} value={url} onChange={onChangeUrl} type="text" placeholder="위시리스트에 추가"></input>
      <button className={styles.button} onClick={onClickAddBtn}>
        추가
      </button>
    </div>
  );
  //   <div className={styles.search}>
  //     <input type="text" placeholder="추가" />
  //     <button onClick={onClickAddBtn}>추가</button>
  //   </div>
  // );
};

export default AddProduct;
