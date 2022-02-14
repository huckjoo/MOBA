const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const rooms = {};

io.on('connection', (socket) => {
  socket.on('join room', (roomID) => {
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
      socket.emit('other user', otherUser);
      socket.to(otherUser).emit('user joined', socket.id);
    }
  });

  socket.on('offer', (payload) => {
    io.to(payload.target).emit('offer', payload);
  });

  socket.on('answer', (payload) => {
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', (incoming) => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});

server.listen(8000, () => console.log('server is running on port 8000'));
