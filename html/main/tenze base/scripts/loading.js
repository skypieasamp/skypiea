setTimeout(function() {
    detectDevice();
}, 5000);

    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

        if (isMobile) {
            window.location.href = 'html/mob.html';
        } else {
            window.location.href = 'html/main.html';
        }
    }
