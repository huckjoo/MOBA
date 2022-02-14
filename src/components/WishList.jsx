import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";

const WishList = props => {
  let products = props.data;

  // const [checkedItems, setCheckedItems] = useState(new Set());
  // const checkedItemHandler = (id, isChecked) => {
  //   if (isChecked) {
  //     checkedItems.add(id);
  //     setCheckedItems(checkedItems);
  //   } else if (!isChecked && checkedItems.has(id)) {
  //     checkedItems.delete(id);
  //     setCheckedItems(checkedItems);
  //   }
  //   console.log(checkedItems);
  // };

  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      console.log("체크 반영 완료");
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== id));
      console.log("체크 해제 반영 완료");
    }
  };
  console.log(checkedInputs);
  console.log(checkedInputs.length);

  const onClickVoteBtn = () => {
    /* 투표하기 만들기*/
  };

  return (
    <>
      {products.length > 0 ? (
        products.map((item, index) => <Product changeHandler={changeHandler} key={index} item={item} deleteItem={props.deleteItem} />)
      ) : (
        // products.map(item => <Product checkedItemHandler={checkedItemHandler} key={item.shop_url} item={item} deleteItem={props.deleteItem} />)
        <></>
      )}

      {products.length > 0 ? <button>투표 하기</button> : <></>}
    </>
  );
};

const Product = props => {
  const item = props.item;

  // const [bChecked, setChecked] = useState(false);

  // const checkHandler = ({ target }) => {
  //   setChecked(!bChecked);
  //   props.checkedItemHandler(props.key, target.checked);
  // };

  const onChange = e => {
    props.changeHandler(e.target.checked, item.product_name);
  };

  return (
    <div className="product-item">
      <p className="item-delete" onClick={() => props.deleteItem(item.shop_url)}>
        X
      </p>
      <div className="product-label">{item.shop_name}</div>
      <div className="container-img">
        <img className="product-item-img" src={item.img} alt="상품 이미지" onClick={() => {}} />
      </div>
      <div className="product-item-details">
        <h3 className="product-item-title">{item.product_name}</h3>
        <div className="line"></div>
        <h3 className="product-item-price">{item.price}</h3>

        <input className="product-checkbox" type="checkbox" onChange={onChange} />

        <button onClick={() => window.open(item.shop_url, "_blank")}>바로가기</button>
        {/* <button onClick={() => window.open(item.shop_url, "new", "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes")}>바로가기</button> */}
      </div>
    </div>
  );
};

export default WishList;
