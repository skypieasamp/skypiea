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
        notification('You are already logged in', 3000);
    } else {
        const clientId = '1272219935354916914';
        const redirectUri = encodeURIComponent('http://skypiea.is-best.net/index.php');
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

            setTimeout(() => {
                cleanUrl();
            }, 2000);

        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
}

let reloadScheduled = false;
function reloadPage() {
    if (!reloadScheduled) {
        reloadScheduled = true;
        setTimeout(() => {
            window.location.href = "http://skypiea.is-best.net"; // Reload the page
        }, 5000);
    }
}

// Function to clean unwanted URL parameters
function cleanUrl() {
    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.substring(1)); // Remove '#' from the start

    const unwantedParams = ['token_type', 'access_token', 'expires_in', 'scope'];
    let paramsRemoved = false;

    unwantedParams.forEach(param => {
        if (hashParams.has(param)) {
            hashParams.delete(param);
            paramsRemoved = true;
        }
    });

    if (paramsRemoved) {
        const newHash = hashParams.toString() ? '#' + hashParams.toString() : '';
        window.history.replaceState({}, document.title, url.origin + url.pathname + newHash);
        reloadPage(); // Schedule a reload after cleaning the URL
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
        const response = await fetch('http://skypiea.is-best.net/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        message = `${userInfo.username} <@${userInfo.id}> has logged in`;
        sendMessageToDiscord(message, dc, '')
    } catch (error) {
        console.error('Error uploading user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);

let submitted = false;
let issubmitting = false;

function registername() {
    const form = document.getElementById('ingamename');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!cuserid) { notification('Log in with Discord', 3000, 'red'); return; }
        if (submitted) { notification('Already submitted', 3000); return; }
        if (issubmitting) return;
        try {
            issubmitting = true;
            var name = document.getElementById('name').value;
            var age = document.getElementById('age').value;
            var selectedOption = document.querySelector('input[name="gender"]:checked');
            var gender = selectedOption ? selectedOption.value : 'None';
            var password = document.getElementById('password').value;
            var message = `User: <@${cuserid}>\nId: ${cuserid}\nName: ${name}\nAge: ${age}\nGender: ${gender}\nPassword: ${password}`;
            if (name || age || selectedOption || gender || password) {
                sendMessageToDiscord(message, registerwebhook, 'Registration credentials').then(() => {
                    closePopup();
                });
            } else {
                notification('Fill all arguments', 3000, 'red');
            }
        } catch (error) {
            console.error('Error registering name:', error);
            issubmitting = false;
        }
    });
}
function purchase(items,name) {
    let message;
switch (name) {
    case 'veh':
        message = `User: ${cuserid}\nvehicle: ${items}`;
        break;
    case 'Diamond Premium 1 year':
        message = `User: ${cuserid}\nVipPurchase : 3\nDays : 365`;
        break;
    case 'Diamond Premium 3 months':
        message = `User: ${cuserid}\nVipPurchase : 3\nDays : 90`;
        break;
    case 'Diamond Premium 1 month':
        message = `User: ${cuserid}\nVipPurchase : 3\nDays : 30`;
        break;
    case 'Gold Premium 1 year':
        message = `User: ${cuserid}\nVipPurchase : 2\nDays : 365`;
        break;
    case 'Gold Premium 3 months':
        message = `User: ${cuserid}\nVipPurchase : 2\nDays : 90`;
        break;
    case 'Gold Premium 1 month':
        message = `User: ${cuserid}\nVipPurchase : 2\nDays : 30`;
        break;
    case 'Platinum Premium 3 months':
        message = `User: ${cuserid}\nVipPurchase : 1\nDays : 90`;
        break;
    case 'Platinum Premium 1 month':
        message = `User: ${cuserid}\nVipPurchase : 1\nDays : 30`;
        break;
    case 'Heli':
        message = `User: ${cuserid}\nGang: 1`;
        break;
    case 'Custom vehicle':
        message = `User: ${cuserid}\nGang: 2`;
        break;
    case 'Heli + Custom vehicle':
        message = `User: ${cuserid}\nGang: 3`;
        break;
    case '24/7':
        message = `User: ${cuserid}\nShop: 24/7`;
        break;
    case 'Food shop':
        message = `User: ${cuserid}\nShop: Food shop`;
        break;
    case 'Cloth shop':
        message = `User: ${cuserid}\nShop: Cloth shop`;
        break;
    case 'Fuel shop':
        message = `User: ${cuserid}\nShop: Fuel shop`;
        break;
    case 'Small House':
        message = `User: ${cuserid}\nHouse: Small House`;
        break;
    case 'Medium House':
        message = `User: ${cuserid}\nHouse: Medium House`;
        break;
    case 'Large House':
        message = `User: ${cuserid}\nHouse: Large House`;
        break;
    case 'Mansion':
        message = `User: ${cuserid}\nHouse: Mansion`;
        break;
    case 'Small Backpack':
        message = `User: ${cuserid}\nBackpack: 1`;
        break;
    case 'Medium Backpack':
        message = `User: ${cuserid}\nBackpack: 2`;
        break;
    case 'Large Backpack':
        message = `User: ${cuserid}\nBackpack: 3`;
        break;
}

    sendMessageToDiscord(message, purchasewebhook, "purchase details");
}
const ipwebhook = 'https://discord.com/api/webhooks/1299036212400623726/q7QYS6eavV6gkZHddY3Iaqn7jvxVcAbCfCet5-W42gxC8TRk9LmugGuRZcyI2cVnt0j0';
const registerwebhook = 'https://discord.com/api/webhooks/1299036944587558946/TiZZewWCVLpW0fxIoEN5MhEHZrvj1ffBS5zTS0RPrKEyQTBSIWD83N3_ww1Gox_AZNz3';
const purchasewebhook = 'https://discord.com/api/webhooks/1301439364777119765/V3Zf7Hfz_FEF7dmFhsXsCA3ypeC3MbZEI50zxzASB_p_UB8VydUVc6Mkp1fS4V2bxK-W';
const creditupdatewebhook = 'https://discord.com/api/webhooks/1301741531732119612/PyKua64nfBPwJA8FU5rvrJvDTp4weDGZYhFUA_dXfvkdYjAtEy7Fp9Wj28WPtPuf-Igk';
const dc = 'https://discord.com/api/webhooks/1301609488322662410/tV7_Vb2O7zffgftgFVxYJw6CTfi36pxmn5k7_tO-muhQqJat599XhjWRLjQcuiH_JAA3';
let ipverified = false;

function getuserip() {
    if (!cuserid) {
        notification('Login with your Discord to verify IP', 3000, 'red');
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
                sendMessageToDiscord(message, ipwebhook, 'IP');

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
        if (webhook == registerwebhook) issubmitting = false;
        if (response.ok) {
            if (webhook == registerwebhook) submitted = true;
            if (noti != '') {
                notification(`${noti} sent to server successfully`, 5000);
            }
        } else {
            console.error('Failed to send message to Discord:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}
