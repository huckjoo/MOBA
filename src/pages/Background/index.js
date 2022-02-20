console.log('This is the background page.');
console.log('Put the background scripts here.');


// 특정 페이지에서만 동작하도록 변경
chrome.runtime.onInstalled.addListener(function () {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlContains: 'store.musinsa.com/app/goods/',
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});




function isLogedIn(sendResponse) {
  function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
      item = item.replace(' ', '');
      var dic = item.split('=');
      if (key === dic[0]) {
        result = dic[1];
        return true;    // break;
      }
      return false;
    });
    return result;
  }
  const userCookie = getCookie('x_auth')
  if (userCookie) {
    chrome.storage.local.set({
      userStatus: userCookie
    })
    sendResponse({ message: 'success' })
  } else {
    sendResponse({ message: 'login' });
  }
};

// async function getAuth(userInfo, sendResponse) {
//   const params = {
//     email: userInfo.email,
//     password: userInfo.pwd
//   };
//   const response = await fetch('yourUrl', {
//     method: 'POST',
//     body: JSON.stringify(params),
//     headers: { 'Content-Type': 'application/json' }
//   });
//   if (response.status !== 200) {
//     sendResponse('fail');
//   } else {
//     const result = await response.json();
//     chrome.storage.local.set({
//       userStatus: result.userStatus
//     }, (res) => {
//       if (chrome.runtime.lastError) sendResponse('fail');
//       sendResponse('success');
//     });
//   }
// };


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userStatus') {

    isLogedIn(sendResponse);
    return true;
  } else if (request.message === 'login') {
    // getAuth(request.payload, sendResponse);
    return true;
  }
});