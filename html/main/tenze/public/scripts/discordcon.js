function getCookie(name) {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

let cuserid = getCookie('userid');
let cusername = getCookie('username');
let cavatarUrl = getCookie('avatarurl');

function redirectToDiscord() {
  if (cuserid && cusername && cavatarUrl) {
    notification('you are already logged in', 3000);
  } else {
    const clientId = '1272219935354916914';
    const redirectUri = encodeURIComponent('http://tvrp.byethost11.com/index.php');
    const scope = 'identify';
    const responseType = 'token';
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = discordAuthUrl;
  }
}

let userid, avatarurl, username;

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
      userid = userInfo.id;
      avatarurl = userInfo.avatar;
      username = userInfo.username;

      // Send the user info to PHP via URL-encoded POST
      await uploadUserInfo({
        id: userid,
        username: username,
        avatar: `https://cdn.discordapp.com/avatars/${userid}/${avatarurl}.png`
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
}

async function uploadUserInfo(userInfo) {
  try {
    // Create URL-encoded form data
    const formData = new URLSearchParams();
    formData.append('username', userInfo.username);
    formData.append('userid', userInfo.id);
    formData.append('avatarurl', userInfo.avatar);

    // Send the form data to PHP script
    const response = await fetch('http://tvrp.byethost11.com/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const result = await response.text();
    console.log('Server response:', result);
  } catch (error) {
    console.error('Error uploading user info:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);
let submitted= false;
let issubmitting = false;

function registername() {
  const form = document.getElementById('ingamename');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!cuserid){ notification('Log in with discord',3000); return;}
    if (submitted){notification('Already submitted',3000); return;}
    if (issubmitting)return;
    try {
      issubmitting = true;
      var name = document.getElementById('name').value;
      var age = document.getElementById('age').value;
      var selectedOption = document.querySelector('input[name="gender"]:checked');
      var gender = selectedOption ? selectedOption.value : 'None';
      var password = document.getElementById('password').value;
      var message = `User: <@${cuserid}>\nId: ${cuserid}\nName: ${name}\nAge: ${age}\nGender: ${gender}\nPassword: ${password}`;
      if (name || age || selectedOption || gender || password) {
        sendMessageToDiscord(message, registerwebhook,'Registration credentials').then(() => {
          closePopup();
        });
      } else {
        notification('fill all arguments', 3000);
      }
    } catch (error) {
      console.error('Error registering name:', error);
      issubmitting = false;
    }
  });
}

const ipwebhook = 'https://discord.com/api/webhooks/1284170575786541169/XGIJ2OjewZgg3FJwAAT1kxAyNr3ocARUoI8QA_Z6K4eOj6oWxnkTEiSPqmPUdPCmtH_I';
const registerwebhook = 'https://discord.com/api/webhooks/1283255808418779146/P7lA1qe2viQuRqkl-GefPGW9i5YoxSKkt9zpzuK-aMUl3TAziRYUbjUjo0uS79SWQ389';
let ipverfied = false;
function getuserip() {
  if (!cuserid) {
    notification('Login with your Discord to verify IP', 3000);
    return;
  }

  const ipVerified = sessionStorage.getItem('ipVerified');
  const ipVerifiedTime = sessionStorage.getItem('ipVerifiedTime');
  const iptimeleft = 60 * 1000; // time 1 min

  if (ipVerified === 'true' && ipVerifiedTime && (Date.now() - parseInt(ipVerifiedTime, 10) < iptimeleft)) {
    const countdown = Math.round((iptimeleft - (Date.now() - parseInt(ipVerifiedTime, 10))) / 1000); // Time left in seconds
    notification(`You can verify again after ${countdown} seconds`, 3000);
    return;
  }


  fetch('../scripts/getip.php')
    .then(response => response.json())
    .then(data => {
      if (data && data.ip) {
        notification(`Your IP: ${data.ip}`, 3000);

        let message = `id: ${cuserid}\nip: ${data.ip}`;
        sendMessageToDiscord(message, ipwebhook, 'Ip');

        sessionStorage.setItem('ipVerified', 'true');
        sessionStorage.setItem('ipVerifiedTime', Date.now().toString());


        setTimeout(() => {
          sessionStorage.removeItem('ipVerified');
          sessionStorage.removeItem('ipVerifiedTime');
        }, iptimeleft);
      } else {
        throw new Error('Invalid data format: IP not found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      notification('Failed to verify IP', 3000);
    });
}


async function sendMessageToDiscord(message, webhook, noti) {

  const payload = {
    content: message
  };

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (webhook = registerwebhook) issubmitting = false;
    if (response.ok) {
      if (webhook = registerwebhook) submitted = true;
      notification(`${noti} sent to server successfully`, 5000);
    } else {
      console.error('Failed to send message to Discord:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending message to Discord:', error);
  }
}


