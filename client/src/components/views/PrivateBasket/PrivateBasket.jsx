import React, { useState, useEffect } from 'react';
import styles from './PrivateBasket.module.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import NormalHeader from '../../NormalHeader/NormalHeader';
import { v1 as uuid } from 'uuid';
import Auth from '../../../hoc/auth';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { VscTrash } from 'react-icons/vsc';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateBasket = (props) => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);

  const getCookie = (name) => {
    const cookies = new Cookies();
    return cookies.get(name);
  };
  const token = getCookie('x_auth');

  useEffect(() => {
    axios
      .get(`/privatebasket/${token}`)
      .then((Response) => {
        console.log('token : ', token);
        console.log('response data : ', Response.data);
        setProducts(Response.data.reverse());
      })
      .catch((Error) => {
        console.log(Error);
      })
      .then(() => {});
  }, []);

  const [voteList, setVoteList] = useState([]);

  const handleProductClick = (e, item) => {
    // e.stopPropagation();
    if (!checked) {
      window.open(item.shop_url);
    } else {
      if (voteList.includes(item)) {
        e.target.classList.remove('clicked');
        setVoteList(voteList.filter((voteItem) => voteItem !== item));
      } else {
        e.target.classList.add('clicked');
        console.log('개수 : ', voteList.length);
        setVoteList([...voteList, item]);
      }
    }
    return false;
  };

  const [inputs, setInputs] = useState({
    text: '',
  });

  const onChangeVoteMessage = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const shareKakao = (inputs, id) => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '모바',
        description: inputs.text,
        imageUrl: '#',
        link: {
          webUrl: `http://localhost:3000/vote/${id}`,
        },
      },
      buttons: [
        {
          title: '투표하기로 이동',
          link: {
            webUrl: `http://localhost:3000/vote/${id}`,
          },
        },
      ],
    });
  };

  const sendCheckedProduct = (token, voteList, id, inputs) => {
    axios.post('/vote', {
      token: token,
      products: voteList,
      room_info: id,
      room_message: inputs.text,
    });
  };

  const HandleSubmitVote = (e) => {
    if (voteList.length < 2 || voteList.length > 4) {
      e.preventDefault();
      toast.warn('상품 개수를 다시 확인해주세요!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const token = getCookie('x_auth');

    const id = uuid();

    sendCheckedProduct(token, voteList, id, inputs);
    shareKakao(inputs, id);
  };

  const HandleDeleteProductBtn = (shop_url) => {
    console.log('delelte');
    axios
      .delete(`/privatebasket/product`, { data: { token, shop_url } })
      .then(function (response) {
        console.log(response);
        setProducts(products?.filter((product) => product.shop_url !== shop_url));
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <div>
      <NormalHeader />
      <div className={styles.container}>
        <div className={styles.experienceContents}>
          <ul className={styles.experienceCategory}>
            <li className={styles.categoryName}>
              <div
                className={checked ? styles.maskText : styles.maskText + ' ' + styles.selected}
                onClick={() => {
                  setChecked(false);
                }}
              >
                <span>장바구니</span>
              </div>
            </li>
            <li className={styles.categoryName}>
              <div
                className={!checked ? styles.maskText : styles.maskText + ' ' + styles.selected}
                onClick={() => {
                  setChecked(true);
                }}
              >
                <span>투표</span>
              </div>
            </li>
            {!checked ? (
              <></>
            ) : (
              <div className={styles.voteContainer}>
                <form
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onSubmit={(e) => HandleSubmitVote(e)}
                >
                  <textarea
                    className={styles.voteText}
                    name='text'
                    type='text'
                    onChange={onChangeVoteMessage}
                    style={{ fontSize: '23px' }}
                    placeholder='투표 요청시 친구들에게 전달할 내용을 입력해주세요.'
                    value={inputs.text}
                  ></textarea>
                  <button className={styles.voteBtn} type='submit'>
                    전송
                  </button>
                </form>
              </div>
            )}
            {checked && voteList.length !== 0 && (voteList.length < 2 || voteList.length > 4) ? (
              <p className={styles.voteDescription}>투표할 상품을 1개 이상 5개 미만으로 선택해주세요</p>
            ) : (
              ''
            )}
          </ul>

          <div className={styles.experienceGrid}>
            <div className={styles.experienceList}>
              {products.map((item, index) => (
                // <a href={item.shop_url} target="_blank">
                <div key={index} style={{ position: 'relative' }}>
                  <div className={styles.productContainer}>
                    <div className={styles.productImgContainer}>
                      <img className={styles.itemImg} src={item.removedBgImg} />
                      <div className={!checked ? styles.productInfo : styles.voteInfo}>
                        {/* <AiOutlineCheckCircle size="150" className={styles.checkedIcon} /> */}

                        {!checked ? (
                          <div
                            onClick={() => {
                              HandleDeleteProductBtn(item.shop_url);
                            }}
                            className={styles.deleteContainer}
                          >
                            <VscTrash className={styles.deleteBtn} size='30px' />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div
                          className={styles.productWrap}
                          onClick={(e) => {
                            handleProductClick(e, item);
                          }}
                        ></div>

                        <div className={styles.infoContainer}>
                          {/* <ImCross size="20px" style={{ position: 'absolute', top: '20px', right: '20px' }} /> */}
                          <span className={styles.shopName}>{item.shop_name}</span>
                          <div className={styles.productName}>{item.product_name}</div>

                          {item.price === item.sale_price ? (
                            <div className={styles.originalPrice}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                          ) : (
                            <div>
                              <div className={styles.price}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                              <div className={styles.salePrice}>{item.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.experienceLoading}>
            <ToastContainer
              position='bottom-center'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth(PrivateBasket, true);
