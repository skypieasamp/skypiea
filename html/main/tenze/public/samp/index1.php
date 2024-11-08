<!DOCTYPE html>
<?php
// Function to delete cookies
function deleteCookies()
{
    // Delete all cookies
    foreach ($_COOKIE as $name => $value) {
        setcookie($name, '', time() - 3600, '/'); // Change the path if necessary
    }
    return "All cookies deleted.";
}

// Check if the request is made via AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'deleteCookies') {
    // Call the function and return the message
    echo deleteCookies();
    exit; // Exit to prevent further output
}
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../images/logo.ico">
    <link rel="stylesheet" href="../styles/style.css">
    <script src="../scripts/script.js"></script>
    <script src="../scripts/discordconv2.js"></script>
    <title>SkyPiea Roleplay</title>
</head>

<body>
    <noscript>Javascript not loading sorry for ths inconvenince. Probabily
        its your browser issue try reloading,if you want Report this issue
        to discord id zyndor. </noscript>
    <div class="overlay" id="overlay" onclick="closePopup()"></div>
    <header>
        <div class="logo">
            <img src="../images/logo.png" alt="Logo" width="150px" height="150px" loading="lazy">
        </div>
        &nbsp;&nbsp;
        <a class="headerbuttons" href="#how" style="font-size: 30px;">How to start playing SkyPiea?</a>
        <div class="fixed-buttons">
            <button class="headerbuttons" onclick="window.location.href='https://tenze.gitbook.io/rule-book'">Rules</button>
            <button class="headerbuttons" onclick="window.location.href='premium.php'">Premium Plans</button>
            <button class="headerbuttons" onclick="window.location.href='https://discord.gg/fgZBCJaxAW'">Announcement</button>

            <?php
            if (!isset($_COOKIE['userid']) || !isset($_COOKIE['username']) || !isset($_COOKIE['avatarurl'])): ?>
                <button class="headerbuttons" id="login" onclick="redirectToDiscord()">Log In</button>
            <?php else: ?>
                <img id="user-avatar" class="user-avatar" src="<?php echo htmlspecialchars($_COOKIE['avatarurl']); ?>" alt="User Avatar" width="50px" height="50px" style="border-radius: 50%;">
                <button class="headerbuttons" id="user-info"><?php echo htmlspecialchars($_COOKIE['username']); ?></button>
            <?php endif; ?>

        </div>
    </header>
    <main>
        <div class="main">
            <center>
                <div class="maintext">
                    <h1><span>SkyPiea</span><br><span>ROLEPLAY</span></h1><br>
                    <h3>Most featuristic server in samp communtiy</h3>
                </div>
            </center>
            <center><button class="mainbutton" onclick="getuserip()">Verify IP</button>
            </center>
        </div>
    </main>
    <div class="startplay">
        <div class="how" id="how">
            How to join <br>SkyPiea RP
            <div class="joincontainer">
                <div class="joinmainbox">
                    <div class="step">step 1</div>
                    Download Files<br><br>
                    <button class="mainbutton2" onclick="download()">
                        <img src="../images/icon/download-solid.svg" alt="download-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Download
                    </button>
                </div>
                <div class="joinmainbox">
                    <div class="step">step 2</div>
                    Login with discord<br><br>
                    <button class="mainbutton2" onclick="redirectToDiscord()">
                        <img src="../images/icon/handshake-solid.svg" alt="handshake-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Log in
                    </button>

                </div>
                <div class="joinmainbox step4">
                    <div class="step">step 3</div>
                    Start Your SkyPiea Roleplay Journey:<br><br>
                    <h6>Must be joined in discord server to get registered</h6>
                    <button class="mainbutton2" onclick="ip()">
                        <img src="../images/icon/server-solid.svg" alt="server-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Get-IP
                    </button>
                    <button class="mainbutton2" onclick="register()">
                        <img src="../images/icon/address-card-solid.svg" alt="address-card-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Register
                    </button>
                    <a href="#discord" class="mainbutton2">
                        <img src="../images/icon/discord-brands-solid.svg" alt="discord-brands-solid" width="20px"
                            height="20px">&nbsp;&nbsp;join discord
                    </a>
                    <button class="mainbutton2" onclick="startplaypc()">
                        <img src="../images/icon/circle-play-regular.svg" alt="play-regular" width="20px"
                            height="20px">&nbsp;&nbsp;startplay
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="notification-container"></div>

    <div class="popup1" id="download">
        <div class="download">
            <h1>Which version of the file would you like to download?</h1>
            <button class="mainbutton2" onclick="pcdownload()">
                <img src="../images/icon/clipboard-regular.svg" alt="clipboard-regular"
                    width="20px" height="20px">&nbsp;&nbsp;PC</button>
            <button class="mainbutton2" onclick="mobiledownload()">
                <img src="../images/icon/mobile-screen-solid.svg" alt="clipboard-regular"
                    width="20px" height="20px">&nbsp;&nbsp;MOBILE</button>
        </div>
    </div>
    <div class="popup1" id="register">
        <div class="registration">
            <h2>Registration</h2>
            <form id="ingamename">
                Your Character Name : <input type="text" id="name" maxlength="20" placeholder="Format: Firstname_Secondname" required autofocus> <br>
                Your Character Age : <input type="number" min="13" id="age" placeholder="age" required> <br>
                Your Character Gender : <input type="radio" id="gender" name="gender" value="male" required> male &nbsp;&nbsp;
                <input type="radio" id="gender" name="gender" value="female" required>
                female <br><br>
                Password : <input type="password" minlength="4" id="password" placeholder="Enter your password" required>
                <button type="submit" onclick="registername()">Submit</button>
            </form>
        </div>
    </div>
    <div class="gallery" id="gallery">
        <div class="gallery-container"><img src='../images/gallery/1.png' alt="image  1">
            <div onclick="opengallery('../images/gallery/1.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"> <img src='../images/gallery/2.png' alt="image  2">
            <div onclick="opengallery('../images/gallery/2.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"> <img src='../images/gallery/3.png' alt="image 3">
            <div onclick="opengallery('../images/gallery/3.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/4.png' alt="image 4">
            <div onclick="opengallery('../images/gallery/4.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/5.png' alt="image 5">
            <div onclick="opengallery('../images/gallery/5.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/6.png' alt="image 6">
            <div onclick="opengallery('../images/gallery/6.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/7.png' alt="image 7">
            <div onclick="opengallery('../images/gallery/7.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/8.png' alt="image 8">
            <div onclick="opengallery('../images/gallery/8.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/9.png' alt="image 9">
            <div onclick="opengallery('../images/gallery/9.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/10.png' alt="image 10">
            <div onclick="opengallery('../images/gallery/10.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/11.png' alt="image 11">
            <div onclick="opengallery('../images/gallery/11.png')" class="gallery-overlay"></div>
        </div>
    </div>
    <div class="gallerypopup" id="popup">
        <button class="close-btn" onclick="closePopup()">X</button>
        <img src alt="Popup Image" id="popupImage">
    </div>
    <div class='links'>
        <div class="discord" id='discord' onclick="link(1)">
            <img src="../images/icon/discord-brands-solid.svg" alt="discord-brands-solid">
            <h3>Join the SkyPiea Discord!</h3>
            <p>Click to join our vibrant Discord community. Get instant updates, chat with fellow players, discuss
                gameplay strategies, share your ideas, and suggest improvements. Be part of the SkyPiea family!</p>
        </div>
        <div class="youtube" onclick="link(2)">
            <img src="../images/icon/youtube-brands-solid.svg" alt="youtube-brands-solid">
            <h3>Subscribe to our YouTube Channel!</h3>
            <p>Click to watch exclusive content, tutorials, gameplay highlights, and more. Don't forget to subscribe and
                turn on notifications to stay updated with the latest SkyPiea videos!</p>
        </div>
        <div class="instagram" onclick="link(3)">
            <img src="../images/icon/instagram-brands-solid.svg" alt="instagram-brands-solid">
            <h3>Follow us on Instagram!</h3>
            <p>Click to follow our Instagram for behind-the-scenes moments, player spotlights, and sneak peeks of
                upcoming events. Join our visual journey and connect with us!</p>
        </div>
    </div>
    <div id="fixed-buttons"></div>
    <div class="tail">
        <h1>Grand Theft Auto Samp Roleplay server </h1>
        <h2>SkyPiea Roleplay</h2>
        <h3>Owner: marshall_rtx</h3>
        <h3>Samp devloper: d4rk_spy</h3>
        <h3>Bot devloper: rosario_god</h3>
        <div class="tailright">
            For queries and suggestions <br> <br>
            Email : SkyPieasamp@gmail.com <br>
            Discord : <a href="https://discord.com/channels/922447966684450826/1120737100933906572" target="_blank"
                rel="noopener noreferrer"> query channel</a> <br><br><br>
        </div>
        <h3>website developed by: zyndor.</h3>
        <script>
            function deleteAllCookies() {
                // Create an AJAX request
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'index1.php', true); // Updated to the correct file
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send('action=deleteCookies'); // Send the request with action parameter
            }
        </script>
        <button class="mainbutton2" onclick="deleteAllCookies()">log out</button>
    </div>
</body>

</html>