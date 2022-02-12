import * as userRepository from './auth.js';

// 임의로 넣는 데이터
let tweets = [
  {
    id: '1',
    text: 'TEAM MOBA 프론트 엔드 화이팅',
    createdAt: new Date().toString,
    userId: '1',
  },
  {
    id: '2',
    text: 'TEAM MOBA 백엔드 화이팅',
    createdAt: new Date().toString,
    userId: '1',
  },
];

export async function getAllTweets() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllTweetsByUsername(username) {
  return getAllTweets().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getTweetById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  console.log(found);
  const { username, name, url } = await userRepository.findById(found.userId);

  return { ...found, username, name, url };
}

export async function createTweet(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getTweetById(tweet.id);
}

export async function updateTweet(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getTweetById(tweet.id);
}

export async function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

