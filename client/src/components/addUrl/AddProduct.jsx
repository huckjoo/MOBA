import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = props => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);

  const onChangeUrl = e => {
    setUrl(e.target.value);
  };

  const onClickAddBtn = () => {
    if (url.length === 0) {
      alert("url을 확인해주세요");
      return;
    }
    axios
      // .post("http://192.249.29.17:3000/room/1/wishlist", { url })
      .post("/room/1/wishlist", { url })
      .then(Response => {
        console.log("post : ", Response.data);
        console.log(Response.status);
        if (Response.status === 201) {
          setProducts([...products, Response.data]);
        }
      })
      .catch(Error => {
        console.log(Error);
      });
    setUrl("");
  };

  return (
    <div className={styles.AddWishList}>
      <input className={styles.input} value={url} onChange={onChangeUrl} type="text" placeholder="위시리스트에 추가"></input>
      <button className={styles.button} onClick={onClickAddBtn}>
        추가
      </button>
    </div>
  );
};

export default AddProduct;
