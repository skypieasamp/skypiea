<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="SkyPiea Roleplay">
    <meta property="og:description" content="Skypiea Roleplay Offical website">
    <meta property="og:image" content="images/logo.png">
    <meta property="og:url" content="http://tvrp.byethost11.com">
</head>
</html>

<?php
function isMobileDevice() {
    $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);

    // A list of common mobile devices' keywords in the user agent string
    $mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'ipad', 'blackberry', 'webos', 'opera mini', 'opera mobi'];

    foreach ($mobileKeywords as $keyword) {
        if (strpos($userAgent, $keyword) !== false) {
            return true;
        }
    }
    return false;
}

if (isMobileDevice()) {
    // If the device is mobile, redirect to mobile version
    header('Location: samp/index2.php');
} else {
    // Otherwise, redirect to the desktop version
    header('Location: samp/index1.php');
}
exit;
?>