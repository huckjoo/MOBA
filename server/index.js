const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socket = require("socket.io");

const config = require("./config/key");
const User = require("./models/User");
const { auth } = require("./middleware/auth");
const roomRouter = require('./router/room');

const app = express();

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("MongoDB Connected"))
  .catch((error) => console.log(error));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

///// 공유 위시리스트 관련 코드 /////
app.use('/room', roomRouter);
//////////////////////////////

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 아이디를 데이터 베이스에서 찾는다.
  User.findOne({ username: req.body.username }, (error, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력하신 아이디에 해당하는 유저가 없습니다.",
      });
    }

    // 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((error, user) => {
        if (error) return res.status(400).send(error);

        // 토큰을 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    console.log(req.user._id),
    { token: "" },
    (error, user) => {
      if (error) return res.json({ success: false, error });
      return res.clearCookie("x_auth").status(200).send({
        success: true,
        message: "로그아웃 되었습니다.",
      });
    }
  );
});


///// 영상 통화 및 화면 공유 관련 코드 /////
const server = http.createServer(app);
const io = socket(server);
const rooms = {};
io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      // 이미 있는 방이면
      rooms[roomID].push(socket.id); // socket.id를 roomID를 key로 갖는 object에 push
    } else {
      // 그게 아니면 rooms에 roomID를 key로 하는 배열 생성
      rooms[roomID] = [socket.id];
    }
    // roomID를 key로 갖는 방에 나 말고 다른 socket.id가 있으면 다른 user임
    const otherUser = rooms[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      // 다른 user가 존재하면
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});
///////////////////////////////////




server.listen(8000);
