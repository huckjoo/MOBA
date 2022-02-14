import React, { useEffect, useState } from "react";
import axios from "axios";

const WishList = props => {
  let products = props.data;

  return <>{products.length > 0 ? products.map(item => <Product key={item.shop_url} item={item} deleteItem={props.deleteItem} />) : <></>}</>;
};

const Product = props => {
  const item = props.item;
  return (
    <div className="product-item">
      <p className="item-delete" onClick={() => props.deleteItem(item.shop_url)}>
        X
      </p>
      <div className="product-label">{item.shop_name}</div>
      <img className="product-item-img" src={item.img} alt="상품 이미지" />
      <div className="product-item-details">
        <h3 className="product-item-title">{item.product_name}</h3>
        <div className="line"></div>
        <h3 className="product-item-price">{item.price}</h3>
        <button onClick={() => window.open(item.shop_url, "_blank")}>바로가기</button>
      </div>
    </div>
  );
};

export default WishList;
