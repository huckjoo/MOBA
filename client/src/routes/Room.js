import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Iframe from '../components/iframe/Iframe';
import styles from './Room.module.css';
const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);
  const mobaBtn = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect('/');
        socketRef.current.emit('join room', props.match.params.roomID);

        socketRef.current.on('other user', (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on('user joined', (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on('offer', handleRecieveCall);

        socketRef.current.on('answer', handleAnswer);

        socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
      });
  }, []);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    //senders에 넣어준다 - 중요!
    userStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, userStream.current)
        )
      );
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com',
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit('offer', payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        // 오류코드
        // userStream.current
        //   .getTracks()
        //   .forEach((track) =>
        //     peerRef.current.addTrack(track, userStream.current)
        //   );
        userStream.current
          .getTracks()
          .forEach((track) =>
            senders.current.push(
              peerRef.current.addTrack(track, userStream.current)
            )
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit('answer', payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit('ice-candidate', payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      //face를 screen으로 바꿔줌
      senders.current
        .find((sender) => sender.track.kind === 'video')
        .replaceTrack(screenTrack);
      console.log('partnerVideo current', partnerVideo.current);
      //크롬에서 사용자가 공유중지를 누르면, screen을 face로 다시 바꿔줌
      screenTrack.onended = function () {
        senders.current
          .find((sender) => sender.track.kind === 'video')
          .replaceTrack(userStream.current.getTracks()[1]);
      };
    });
  }
  // let flag = 1;
  // const handleMobaBtn = () => {
  //   // 모바? 버튼 눌렀을 때
  //   if (flag == 1) {
  //     const width = 1500;
  //     const height = 1000;
  //     let myVideo = userVideo.current;
  //     let largeVideo = partnerVideo.current;
  //     myVideo.width = 0;
  //     myVideo.height = 0;
  //     largeVideo.width = width;
  //     largeVideo.height = height;
  //     mobaBtn.current.innerText = '안봐!';
  //     flag = 0;
  //   } else {
  //     // 안봐! 버튼 눌렀을 때
  //     const width = 340;
  //     const height = 257;
  //     let myVideo = userVideo.current;
  //     let largeVideo = partnerVideo.current;
  //     myVideo.width = width;
  //     myVideo.height = height;
  //     largeVideo.width = width;
  //     largeVideo.height = height;
  //     mobaBtn.current.innerText = '모바?';
  //     flag = 1;
  //   }
  // };

  return (
    <>
      <section className={styles.frame}>
        <Header />
        <div className={styles.container}>
          <Iframe />
          <div className={styles.webcam__box}>
            <button
              ref={mobaBtn}
              className={styles.mobaBtn}
              onClick={shareScreen}
            >
              화면공유
            </button>
            <video
              width="340"
              height="257"
              className={styles.video__control}
              autoPlay
              ref={userVideo}
            />
            <video
              controls
              width="340"
              height="257"
              className={styles.video__control}
              autoPlay
              ref={partnerVideo}
            />
            {/* <button
              ref={mobaBtn}
              className={styles.mobaBtn}
              onClick={handleMobaBtn}
            >
              모바?
            </button> */}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Room;
