const registerwebhook = 'https://discord.com/api/webhooks/1283255808418779146/P7lA1qe2viQuRqkl-GefPGW9i5YoxSKkt9zpzuK-aMUl3TAziRYUbjUjo0uS79SWQ389';
const ipwebhook ='https://discord.com/api/webhooks/1283827761424764979/4dONnkvlRAjxN-SZzVLlFBYzyWDf0Z6lc2XeP7LCmhctECaXTnIAWgQQU5udUo9D30tZ';
var globaluserid = null;
var globalavatarurl = null;
var isSubmitting = false; // New flag to track form submission state

function displayuser() {
  const userAvatar = document.getElementById('user-avatar');
  const login = document.getElementById('login');
  userAvatar.src = globalavatarurl;
  userAvatar.style.display = 'block';
  login.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  fetchUserInfo();
  registername(); // Ensure this is called only once
});

function redirectToDiscord() {
  const clientId = '1272219935354916914';
  const redirectUri = encodeURIComponent('http://tvrp.byethost11.com/html/main.html');
  const scope = 'identify';
  const responseType = 'token';
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

  window.location.href = discordAuthUrl;
}

function getAccessTokenFromUrl() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  return params.get('access_token');
}

async function fetchUserInfo() {
  const accessToken = getAccessTokenFromUrl();

  if (accessToken) {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const userInfo = await response.json();
      document.getElementById('user-info').innerText = `${userInfo.username}`;
      globalavatarurl = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`;
      globaluserid = userInfo.id;
      displayuser();
      console.log(globaluserid);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
}

function registername() {
  const form = document.getElementById('ingamename');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (globaluserid === null) return;
    if (isSubmitting) return;

    isSubmitting = true;

    try {
      var ingamename = document.getElementById('name').value;
      var age = document.getElementById('age').value;
      var selectedOption = document.querySelector('input[name="gender"]:checked');
      var gender = selectedOption ? selectedOption.value : 'None';
      var password = document.getElementById('password').value;
      var message = `Answers from <@${globaluserid}>\nid: ${globaluserid}\nYour In game Name? : ${ingamename}\nYour Age : ${age}\nSex : ${gender}\nPassword : ${password}`;
      sendMessageToDiscord(message).then(() => {
        isSubmitting = false;
      });
    } catch (error) {
      console.error('Error registering name:', error);
      isSubmitting = false;
    }
  });
}

async function sendMessageToDiscord(message) {
  const payload = {
    content: message
  };

  try {
    const response = await fetch(registerwebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`=> Registration name sent successfully\n\n${payload}`);
    } else {
      console.error('=> Failed to send message', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function verifyip() {
  try {
      const userip = await fetch('https://api.ipify.org');
      const message = {
          content: `userid: ${globaluserid}\nip: ${userip}`
      };
      await fetch(webhookUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
      });
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify IP');
  }
}

console.log("Global User ID: ", globaluserid);
console.log("Global User avatar: ", globalavatarurl);
        async function testIPAPIs() {
            console.log('Testing IP APIs...');
            
            // 1. Using ipify API
            try {
                const ipifyResponse = await fetch('https://api.ipify.org?format=json');
                const ipifyData = await ipifyResponse.json();
                console.log(`ipify API IP: ${ipifyData.ip}`);
            } catch (error) {
                console.error('Error fetching IP from ipify:', error);
            }
            
            // 2. Using ipinfo API
            try {
                const ipinfoResponse = await fetch('https://ipinfo.io/json?token=YOUR_API_TOKEN');
                const ipinfoData = await ipinfoResponse.json();
                console.log(`ipinfo API IP: ${ipinfoData.ip}`);
            } catch (error) {
                console.error('Error fetching IP from ipinfo:', error);
            }
            
            // 3. Using CORS Anywhere with ipify
            try {
                const corsProxy = 'https://cors-anywhere.herokuapp.com/';
                const corsResponse = await fetch(corsProxy + 'https://api.ipify.org?format=json');
                const corsData = await corsResponse.json();
                console.log(`CORS Anywhere (ipify) API IP: ${corsData.ip}`);
            } catch (error) {
                console.error('Error fetching IP with CORS Anywhere:', error);
            }
            console.log('end');
        }