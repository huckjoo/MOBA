import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import axios from "axios";
import WishList from "./WishList";

const Header = props => {
  return (
    <div>
      <AddToWishlistBtn></AddToWishlistBtn>
    </div>
  );
};

const AddToWishlistBtn = () => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const onChangeUrl = e => {
    setUrl(e.target.value);
  };

  const onClickAddBtn = () => {
    if (url.length === 0) {
      alert("url을 확인해주세요");
      return;
    }
    axios
      .post("http://192.249.29.17:3000/room/1/wishlist", { url })
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

  const getWishList = () => {
    axios
      .get("http://192.249.29.17:3000/room/1/wishlist")
      .then(Response => {
        console.log("axios get");
        setProducts([...Response.data]);
      })
      .catch(Error => {
        console.log(Error);
      });
  };

  const deleteAPIWishlistItem = shop_url => {
    axios
      .delete("http://192.249.29.17:3000/room/1/wishlist", { data: { shop_url } })
      .then(function (response) {
        console.log(response);
        setProducts(products?.filter(product => product.shop_url !== shop_url));
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const onClickWishlistBtn = () => {
    getWishList();
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const deleteItem = shop_url => {
    console.log("deleteItem : ", shop_url);
    deleteAPIWishlistItem(shop_url);
  };

  return (
    <div className="">
      <div className={styles.AddWishList}>
        <input className={styles.input} value={url} onChange={onChangeUrl} type="text" placeholder="위시리스트에 추가"></input>
        <button className={styles.button} onClick={onClickAddBtn}>
          추가
        </button>
      </div>
      <div>
        <button onClick={onClickWishlistBtn}>위시리스트</button>
      </div>
      <div className="wrapper flex space-between">
        <div className="main flex-80">
          <div className="flex wrap">{isOpen ? <WishList data={products} deleteItem={deleteItem} /> : <></>}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
