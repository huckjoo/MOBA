const express = require('express');
const oauthRouter = express.Router();
const winston = require('winston');
const logger = winston.createLogger();
const qs = require('qs');

class Kakao {
  constructor(code) {
    this.url = 'https://kauth.kakao.com/oauth/token';
    this.clientID = '497af053ca6574eb9e8a19b5797cf024';
    this.clientSecret = 'o2Xtu0bUdX799R2vweOkXx3VPigyUtdK';
    this.redirectUri = 'http://localhost:3000/login';
    this.code = code;
    this.userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
  }
}

//  TODO Naver

//  TODO Google

const getAccessToken = async (options) => {
  try {
    return await fetch(options.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: qs.stringify({
        grant_type: 'authorization_code',
        client_id: options.clientID,
        client_secret: options.clientSecret,
        redirectUri: options.redirectUri,
        code: options.code,
      }),
    }).then(res => res.json());
  } catch (e) {
    logger.info("error", e);
  }
};

const getUserInfo = async (url, access_token) => {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Bearer ${access_token}`
      }
    }).then(res => res.json());
  } catch (e) {
    logger.info("error", e);
  }
};

const getOption = (coperation, code) => {
  switch (coperation) {
    case 'kakao':
      return new Kakao(code);
      break;
    case 'google':
      // return new Google(code);
      break;
    case 'naver':
      // return new Naver(code);
      break;
  }
}

oauthRouter.get(`/:coperation`, async (req, res) => {
  const coperation = req.params.coperation;
  const code = req.body.code;
  const options = getOption(coperation, code);
  const token = await getAccessToken(options);
  const userInfo = await getUserInfo(options.userInfoUrl, token.access_token);

  // TODO Redirect Frot Server (쿠키, 세션, local_store 중에 로그인을 유지한다.)
  // TODO Data Base or 쿠키 reflesh Token 저장 방법 모색
  console.log(userInfo);
  res
    .redirect('http://localhost:3000/createroom')
    .cookie('x_auth', token.access_token)
    .send(userInfo);
})

module.exports = oauthRouter;