



function startplaypc() {
    window.location.href = 'samp://172.232.124.96:5198';
}
function ip() {
    alert('172.232.124.96:5198');
}

function showgallery() {
    const gallery = document.getElementById('gallery');
    const button = document.querySelector('.galleryopen');

    if (gallery.style.display === 'none' || gallery.style.display === '') {
        gallery.style.display = 'flex';
        button.textContent = 'Close Gallery';
    } else {
        gallery.style.display = 'none';
        button.textContent = 'Open Gallery';
    }
}

function opengallery(src) {
    document.getElementById('popupImage').src = src;
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('popup').style.display = 'flex';
    document.body.style.overflowY = 'hidden';
}
function register() {
    if (!getCookie('userid')) {
        closePopup()
        notification('Login to discord to register', 3000, 'red');
    } else {
        document.getElementById('overlay').style.display = 'flex';
        document.getElementById('register').style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    }
}
function download() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('download').style.display = 'flex';
    document.body.style.overflowY = 'hidden';
    notification('Popup closed', 1000);
}
function pcdownload() {
    window.open("downloadlink", "_blank");
    closePopup();
}
function mobiledownload() {
    window.open("downloadlink", "_blank");
    closePopup();
}
function closePopup() {
    document.body.style.overflowY = 'scroll';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('download').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('fixed-buttons').style.display = 'none';
    document.getElementById('overlay').style.background = 'rgba(0, 0, 0, 0.7)';
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closePopup();
    }
});

function threebar() {
    document.body.style.overflowY = 'hidden';
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('overlay').style.background = 'rgba(0, 0, 0, 0.925)';
    document.getElementById('fixed-buttons').style.display = 'flex';
}

function link(link) {
    if (link === 1) {
        window.location.href = 'https://discord.gg/zWXz68SrPT';
    } else if (link === 2) {
        window.location.href = ''; // youtube
    } else if (link === 3) {
        window.location.href = ''; //instagram
    }
}

function notification(msg, time, color) {
    const notificationContainer = document.getElementById('notification-container');
    const noti = document.createElement('div');
    noti.classList.add('notification');
    noti.innerHTML = `
      <img src="../images/icon/envelope-regular.svg" width="18px" height="18px">
      &nbsp;&nbsp; ${msg}
    `;
    noti.style.backgroundColor = color;
    notificationContainer.appendChild(noti);

    setTimeout(() => {
        noti.style.opacity = '1';
        noti.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        noti.style.opacity = '0';
        noti.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            notificationContainer.removeChild(noti);
        }, 300);
    }, time);
}

