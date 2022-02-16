import React, { useState } from 'react';
import AddProduct from '../addUrl/AddProduct';
import axios from 'axios';
import styles from './RoomMemu.module.css';
import WishList from '../wishlist/Wishlist';

const RoomMemu = (props) => {
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const roomNumber = window.location.pathname.split('/')[2];

  const getWishList = () => {
    axios
      .get(`/room/${roomNumber}/wishlist`)
      .then((Response) => {
        console.log('axios get');
        setProducts([...Response.data]);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const HandleWishlist = () => {
    getWishList();
    if (isWishlistOpen) {
      setWishlistOpen(false);
    } else {
      setWishlistOpen(true);
    }
  };

  const deleteAPIWishlistItem = (shop_url) => {
    axios
      .delete(`/room/${roomNumber}/wishlist`, { data: { shop_url } })
      .then(function (response) {
        console.log(response);
        setProducts(
          products?.filter((product) => product.shop_url !== shop_url)
        );
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const deleteItem = (shop_url) => {
    console.log('deleteItem : ', shop_url);
    deleteAPIWishlistItem(shop_url);
  };

  const handleAddProduct = (new_product) => {
    setProducts([...products, new_product]);
  };

  return (
    <div>
      <AddProduct handleAddProduct={handleAddProduct} />

      <div className={styles.menuList}>
        <button className={styles.buttons} onClick={props.onShareScreen}>
          <i className="fa-brands fa-slideshare fa-xl"></i>
        </button>
        <button className={styles.buttons} onClick={HandleWishlist}>
          <i className="fa-solid fa-hand-holding-heart fa-xl"></i>
        </button>
        <button className={styles.buttons}>
          <i className="fa-solid fa-cart-plus fa-xl"></i>
        </button>
        <button className={styles.buttons}>
          <i className="fa-solid fa-check-to-slot fa-xl"></i>
        </button>
      </div>
      <div>
        {isWishlistOpen ? (
          <WishList data={products} deleteItem={deleteItem} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RoomMemu;
