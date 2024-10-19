<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../images/logo.ico">
    <link rel="stylesheet" href="../styles/mobstyle.css">
    <script src="../scripts/script.js"></script>
    <script src="../scripts/discordcon.js"></script>
    <title>SkyPiea Roleplay</title>
</head>
<body>
    <noscript>Javascript not loading sorry for ths inconvenince. Probabily its your browser issue try reloading,if you
        want Report this issue to discord id zyndor. </noscript>
    <div class="overlay" id="overlay" ontouchstart="closePopup()"></div>
    <header>
        <div class="logo">
            <img src="../images/logo.png" alt="Logo" width="150px" height="150px">
        </div>
        <?php
        if (!empty($_COOKIE['userid']) || !empty($_COOKIE['username']) || !empty($_COOKIE['avatarurl'])): ?>
            <img id="user-avatar" class="user-avatar" src="<?php echo htmlspecialchars($_COOKIE['avatarurl']); ?>" alt="User Avatar" width="50px" height="50px" style="border-radius: 50%;">
            <button class="headerbuttons" id="user-info"><?php echo htmlspecialchars($_COOKIE['username']); ?></button>
        <?php endif; ?>
        <div class="threebar">
            <button class="threebar1" ontouchstart="threebar()"><img src="../images/icon/threebar.svg"
                    alt="Three line bar" width="75px" height="75px"></button>
        </div>
    </header>
    <div class="fixed-buttons" id="fixed-buttons">
        <a href="#how">How to start playing SkyPiea?</a>
        <button ontouchstart="closePopup(),window.location.href='https://tenze.gitbook.io/rule-book'">Rules</button>
        <button ontouchstart="closePopup(),window.location.href='premium.html'">Premium Plans</button>
        <button ontouchstart="closePopup(),window.location.href='https://discord.gg/fgZBCJaxAW'">Announcement</button>
        <?php
        if (!isset($_COOKIE['userid']) || !isset($_COOKIE['username']) || !isset($_COOKIE['avatarurl'])): ?>
            <button id="login" ontouchstart="redirectToDiscord()" style="display:block;">Log In</button>
        <?php endif; ?>
    </div>
    <main>
        <div class="main">
            <center>
                <div class="maintext">
                    <h1><span>SkyPiea</span><br><span>ROLEPLAY</span></h1><br>
                    <h3>Most featuristic server in <br> samp communtiy</h3>
                </div>
            </center>
            <center><button class="mainbutton" ontouchstart="getuserip()">Verify IP</button></center>
        </div>
    </main>
    <div class="startplay">
        <div class="how" id="how">
            How to join <br> SkyPiea RP
            <div class="joincontainer">
                <div class="joinmainbox">
                    <div class="step">step 1</div>
                    Download Files<br><br>
                    <button class="mainbutton2" ontouchstart="download()">
                        <img src="../images/icon/download-solid.svg" alt="download-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Download
                    </button>
                </div>
                <div class="joinmainbox">
                    <div class="step">step 2</div>
                    Register name<br><br>
                    <button class="mainbutton2" ontouchstart="redirectToDiscord()">
                        <img src="../images/icon/address-card-solid.svg" alt="address-card-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Log in
                    </button>
                </div>
                <div class="joinmainbox step4">
                    <div class="step">step 3</div>
                    Start Your SkyPiea Roleplay Journey:<br><br>
                    <h6>Must be joined in discord server to get registered</h6>
                    <button class="mainbutton2" ontouchstart="ip()">
                        <img src="../images/icon/server-solid.svg" alt="server-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Get-IP
                    </button>
                    <button class="mainbutton2" ontouchstart="register()">
                        <img src="../images/icon/address-card-solid.svg" alt="address-card-solid" width="20px"
                            height="20px">&nbsp;&nbsp;Register
                    </button>
                    <a href="#discord" class="mainbutton2">
                        <img src="../images/icon/discord-brands-solid.svg" alt="discord-brands-solid" width="20px"
                            height="20px">&nbsp;&nbsp;join discord
                    </a>
                    <button class="mainbutton2" ontouchstart="startplay()">
                        <img src="../images/icon/circle-play-regular.svg" alt="play-regular" width="20px"
                            height="20px">&nbsp;&nbsp;startplay
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="notification" id="notification"></div>
    <div class="popup1" id="download">
        <div class="download">
            <h1>Which version of the file would you like to download?</h1>
            <button class="mainbutton2"><img src="../images/icon/clipboard-regular.svg" alt="clipboard-regular"
                    width="20px" height="20px">&nbsp;&nbsp;PC</button>
            <button class="mainbutton2"><img src="../images/icon/mobile-screen-solid.svg" alt="clipboard-regular"
                    width="20px" height="20px">&nbsp;&nbsp;MOBILE</button>
        </div>
    </div>
    <div class="popup1" id="register">
        <div class="registration">
            <h2>Registration</h2>
            <form id="ingamename">
                Your Character Name : <input type="text" id="name" maxlength="20" placeholder="Format: Firstname_Secondname" required autofocus> <br>
                Your Character Age : <input type="number" min="18" id="age" placeholder="age" required> <br>
                Your Character Gender : <input type="radio" id="gender" name="gender" value="male" required> male &nbsp;&nbsp;
                <input type="radio" id="gender" name="gender" value="female" required>
                female <br><br>
                Password : <input type="password" minlength="4" id="password" placeholder="Enter your password" required>
                <button type="submit" ontouchstart="registername()">Submit</button>
            </form>
        </div>
    </div>
    <div class="gallcenter">
        <button class="galleryopen mainbutton2" ontouchstart="showgallery()"> <img
                src="../images/icon/images-regular.svg" alt="images-regular" width="20px" height="20px"> open
            gallery</button>
    </div>
    <div class="gallery" id="gallery">
        <div class="gallery-container"><img src='../images/gallery/chase1.jpg' alt="Chase 1">
            <div ontouchstart="opengallery('../images/gallery/chase1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"> <img src='../images/gallery/chase2.jpg' alt="Chase 2">
            <div ontouchstart="opengallery('../images/gallery/chase2.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"> <img src='../images/gallery/gang1.jpg' alt="Gang 1">
            <div ontouchstart="opengallery('../images/gallery/gang1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/gang2.jpg' alt="Gang 2">
            <div ontouchstart="opengallery('../images/gallery/gang2.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/heli1.jpg' alt="Heli 1">
            <div ontouchstart="opengallery('../images/gallery/heli1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/pd1.jpg' alt="PD 1">
            <div ontouchstart="opengallery('../images/gallery/pd1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/pd2.png' alt="PD 2">
            <div ontouchstart="opengallery('../images/gallery/pd2.png')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/pd3.jpg' alt="PD 3">
            <div ontouchstart="opengallery('../images/gallery/pd3.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/robbery1.jpg' alt="Robbery 1">
            <div ontouchstart="opengallery('../images/gallery/robbery1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/rp1.jpg' alt="RP 1">
            <div ontouchstart="opengallery('../images/gallery/rp1.jpg')" class="gallery-overlay"></div>
        </div>
        <div class="gallery-container"><img src='../images/gallery/rp2.png' alt="RP 1">
            <div ontouchstart="opengallery('../images/gallery/rp2.png')" class="gallery-overlay"></div>
        </div>
    </div>
    <div class="gallerypopup" id="popup">
        <button class="close-btn" ontouchstart="closePopup()">X</button>
        <img src="" alt="Popup Image" id="popupImage">
    </div>
    <div class="discord" id='discord' ontouchstart="link(1)">
        <img src="../images/icon/discord-brands-solid.svg" alt="discord-brands-solid">
        <h3>Join the SkyPiea Discord!</h3>
        <p>Click to join our vibrant Discord community. Get instant updates, chat with fellow players, discuss
            gameplay strategies, share your ideas, and suggest improvements. Be part of the SkyPiea family!</p>
    </div>

    <div class="youtube" ontouchstart="link(2)">
        <img src="../images/icon/youtube-brands-solid.svg" alt="youtube-brands-solid">
        <h3>Subscribe to our YouTube Channel!</h3>
        <p>Click to watch exclusive content, tutorials, gameplay highlights, and more. Don't forget to subscribe
            and
            turn on notifications to stay updated with the latest SkyPiea videos!</p>
    </div>

    <div class="instagram" ontouchstart="link(3)">
        <img src="../images/icon/instagram-brands-solid.svg" alt="instagram-brands-solid">
        <h3>Follow us on Instagram!</h3>
        <p>Click to follow our Instagram for behind-the-scenes moments, player spotlights, and sneak peeks of
            upcoming events. Join our visual journey and connect with us!</p>
    </div>
    <div class="popup"></div>
    <div class="tail">
        <h1>Grand Theft Auto Samp Roleplay server </h1>
        <h2>SkyPiea Roleplay</h2>
        <h3>Owner: marshall_rtx</h3>
        <h3>Samp developer: d4rk_spy</h3>
        For queries and suggestions <br> <br>
        Email : SkyPieasamp@gmail.com <br>
        Discord : <a href="https://discord.com/channels/922447966684450826/1120737100933906572" target="_blank"
            rel="noopener noreferrer"> query channel</a> <br><br><br>
        website developed by: zyndor.
    </div>
</body>

</html>