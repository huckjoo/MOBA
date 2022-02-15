import React from "react";
import styles from "./Wishlist.module.css";

const Product = props => {
  const item = props.item;

  const onChange = e => {
    props.changeHandler(e.target.checked, item.product_name);
  };

  return (
    <div className={styles.productItem}>
      <p className={styles.itemDelete} onClick={() => props.deleteItem(item.shop_url)}>
        X
      </p>
      <div className={styles.productLabel}>{item.shop_name}</div>
      <div className={styles.containerImg}>
        <img className={styles.productItemImg} src={item.img} alt="상품 이미지" onClick={() => {}} />
      </div>
      <div className={styles.productItemDetails}>
        <h3 className={styles.productItemTitle}>{item.product_name}</h3>
        <div className={styles.line}></div>
        <h3 className={styles.productItemPrice}>{item.price}</h3>

        <input className={styles.productCheckbox} type="checkbox" onChange={onChange} />
        <button onClick={() => window.open(item.shop_url, "_blank")}>바로가기</button>
      </div>
    </div>
  );
};

export default Product;
