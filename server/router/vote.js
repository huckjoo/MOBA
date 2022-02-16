const express = require("express");
const voteRouter = express.Router();
const voteList = require("../models/VoteList");
const User = require("../models/User");

voteRouter.post("/", async (req, res) => {
  // console.log(req.body);
  // 투표를 만들 상품들이 들어갈 리스트
  const candidates = req.body.products.map((product) => {
    return {
      product_name: product.product_name,
      price: product.price,
      sale_price: product.sale_price,
      shop_name: product.shop_name,
      shop_url: product.shop_url,
      img: product.img,
      likes: 0,
    };
  });
  console.log(candidates);

  // token 으로 투표 생성 유저를 츶기
  const cur_user = await User.findOne({
    token: req.body.token,
  });

  await voteList.insertMany({
    room_info: req.body.room_info,
    creater: cur_user.username,
    products: candidates,
  });

  res.send("success create vote");
});

voteRouter.delete("/", async (req, res) => {
  if (req.body){
    await voteList.findByIdAndDelete(req.body._id)
    res.send("success to del vote")
    return;
  } else {
    res.send("fail to del vote")
  }
});

module.exports = voteRouter;
