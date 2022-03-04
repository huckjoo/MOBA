const express = require("express");
const collectionRouter = express.Router();
const voteList = require("../models/VoteList");
const User = require("../models/User");

collectionRouter.get('/', (req, res) => {
  console.log('콜렉션 페이지 요청입니다.')
  User.find().select('products').where('product_name').then((users) => {
    const result = users
    res.send(result)
  })
})

collectionRouter.post('/items', (req, res) => {
  console.log('콜렉션 저장해주세요.')
  console.log(req.body);
})

module.exports = collectionRouter