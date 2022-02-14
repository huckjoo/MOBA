import React from 'react';
import Auth from '../../../hoc/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShopsPage() {
  const navigate = useNavigate();

  const logout = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃에 실패하였습니다.');
      }
      console.log(response.data);
    });
  };

  return (
    <>
      <div> 쇼핑몰 선택 페이지입니다. </div>
      <button onClick={logout}> 로그아웃 </button>
    </>
  );
}

export default Auth(ShopsPage, true);
