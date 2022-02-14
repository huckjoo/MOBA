import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/')
      .then((response) => { console.log('메인 랜딩 페이지입니다.') })
  }, [])

  const signin = () => {
    navigate('/register');
  }

  const login = () => {
    navigate('/login');
  }



  return (
    <div style={
      { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }
    }>

      <h1> 시작 페이지 </h1>
      <button onClick={signin}> 회원가입 </button>
      <button onClick={login}> 로그인 </button>

    </div >
  )
}

export default Auth(LandingPage, false)