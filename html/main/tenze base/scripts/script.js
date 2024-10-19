

var registered = 0;
function startplay() {
    window.location.href = '#how';
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
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('register').style.display = 'flex';
    document.body.style.overflowY = 'hidden';
}
function download() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('download').style.display = 'flex';
    document.body.style.overflowY = 'hidden';
}
function closePopup() {
    document.body.style.overflowY = 'scroll';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('download').style.display = 'none';
    document.getElementById('fixed-buttons').style.display = 'none';
    document.getElementById('overlay').style.background = 'rgba(0, 0, 0, 0.7)';
    document.getElementById('popup').style.display = 'none';
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
    }else if (link === 3) {
        window.location.href = ''; //instagram
    }
}
function getip() {
    const ip = '172.232.124.96:5187';
    const notification1 = document.getElementById('ipnotification1');
    const notification2 = document.getElementById('ipnotification2');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(ip)
            .then(() => {
                if (notification1) {
                    notification1.style.display = 'flex';
                    setTimeout(() => {
                        notification1.style.display = 'none';
                    }, 3000);
                } else {
                    console.error('Notification element not found');
                }
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    } else {
        console.error('Clipboard API not supported');
        if (notification2) {
            notification2.style.display = 'flex';
            setTimeout(() => {
                notification2.style.display = 'none';
                alert(ip);
            }, 3000);
        }
    }
}