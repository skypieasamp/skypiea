<?php
// MySQL database configuration with new credentials
$host = '172.232.124.96'; // New MySQL hostname
$db = 's8646_skypiea';    // New database name
$user = 'u8646_823cc88gFx'; // New MySQL username
$pass = 'SV8!CSYYDxuuLD!m62=YL8aP'; // New MySQL password

// Create a database connection
$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        // Action: getPlans to fetch plans data
        if ($_GET['action'] === 'getPlans') {
            // Fetch plans data
            getPlans($conn);
        }
        // Action: getUserCredits to fetch user's credit points
        elseif ($_GET['action'] === 'getUserCredits' && isset($_GET['user_id'])) {
            $user_id = $_GET['user_id']; // User ID from browser cache
            // Fetch user's credits based on user_id
            getUserCredits($conn, $user_id);
        }
    }
}

// Function to fetch plans data as JSON
function getPlans($conn)
{
    // Query to select all plans
    $sql = "SELECT * FROM plans";
    $result = $conn->query($sql);

    $plans = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $plans[] = $row;
        }
    }

    // Output the plans as JSON
    echo json_encode($plans);

    // Close connection
    $conn->close();
    exit();
}

// Function to fetch user credits from the user_credits table
function getUserCredits($conn, $user_id)
{
    $credit_points = '';
    // Query to select credit_points based on user_id
    $sql = "SELECT credit_points FROM user_credits WHERE user_id = ?";

    // Prepare the statement to avoid SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id); // Bind the user_id parameter

    // Execute the query
    $stmt->execute();
    $stmt->bind_result($credit_points);

    // Fetch the credit points
    if ($stmt->fetch()) {
        // Output the credit points as JSON
        echo json_encode(['credit_points' => $credit_points]);
    } else {
        echo json_encode(['error' => 'User not found']);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/pstylev2.css">
    <script src="../scripts/discordconv2.js"></script>
    <script src="../scripts/pscriptv2.js"></script>
    <title>Skypiea Premiums</title>
</head>

<body>
    <div class="overlay" id="overlay" onclick="closeQRCode()"></div>
    <div id="notification-container"></div>

    <div class="qrcode-container">
        <button class="close-button" onclick="closeQRCode()">×</button>
        <div class="qrcode">
            <img src="../images/Qr.png" alt="QR code" class="qrcode-image">
        </div>
        <p class="qrcode-text">Scan this QR code to buy credits!</p>
    </div>

    <div class="popup" id="terms-popup">
        <h1>Terms and Conditions</h1>
        <p>
            - Age Restriction: Only individuals aged 18 and above can purchase the premium plan.<br>
            - Parental Supervision: Users under 18 must be supervised by a parent or guardian at all times.<br>
            - Real Money Trading: Trading real money for in-game items or benefits is strictly prohibited.<br>
            - Donation Regulations: All donated items are non-refundable.<br>
            - Account Exchange Prohibition: Swapping or exchanging accounts is strictly forbidden.<br>
            - Fair Gaming Standards: Pay-to-play systems are not endorsed. Maintaining fair play is the responsibility
            of each player.<br>
            - Guidelines for Gang Teams: Premium memberships obtained by a gang cannot be transferred to another
            gang.<br>
        </p>
        <button onclick="closeTermsPopup()">Agree to Terms and Conditions</button>
    </div>

    <div class="header">
        <img src="../images/logo.png" alt="Logo" width="150px" height="150px" loading="lazy">
        <button class="button" onclick="window.location.href='../index.php'">Go Back</button>
    </div>

    <div class="confirmation-popup" id="confirmationPopup">
        <h1>Confirm Purchase</h1>
        <span id="confirmpurchase"></span><br>
        <button class="confirm-button" onclick="confirmPurchase()">Confirm</button>
        <button class="decline-button" onclick="declinePurchase()">Decline</button>
    </div>

    <div class="plan">
        <div class="creditbox">
            <h1>Balance: <span id="dbcredit">0</span></h1>
            <h3>Buy credits by sending money to the QR code below and send the screenshot to Discord</h3>
            <button class="button" onclick="showqrcode()">QR code</button>
        </div>
        <div class="onbutton">
            <button class="button" onclick="packs()">packs and items</button>
            <a class="button" href="#main">Vehicles</a>
        </div>
    </div>


    <div class="hardplans" id="hardplans">
        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/diamond.jpg" alt="premium plan pic"></center>
            <h1>Diamond premium plan</h1>
            <h2><label for="diamond-select">Choose Diamond Donator Pack:</label></h2>
            <select id="diamond-select" onchange="handleDiamondSelection()">
                <option value="">--Select Duration--</option>
                <option value="diamond1">30 days (1 month)</option>
                <option value="diamond2">90 days (3 months)</option>
                <option value="diamond3">365 days (1 year)</option>
            </select>
            <h2>
                <span id="diamondpremiumname"></span><br>
                <div class="pcredits">Credits:<span id="diamondpremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Diamond donator pack?<br><br>You will get diamond donator role and diamond donator features in-game.','diamond')">Buy
                Diamond Pack</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/gold.jpg" alt="premium plan pic"></center>
            <h1>Gold premium plan</h1>
            <h2><label for="gold-select">Choose Gold Donator Pack:</label></h2>
            <select id="gold-select" onchange="handleGoldSelection()">
                <option value="">--Select Duration--</option>
                <option value="gold1">30 days (1 month)</option>
                <option value="gold2">90 days (3 months)</option>
                <option value="gold3">365 days (1 year)</option>
            </select>
            <h2>
                <span id="goldpremiumname"></span><br>
                <div class="pcredits">Credits:<span id="goldpremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Gold donator pack?<br><br>You will get gold donator role and gold donator features in-game.','gold')">Buy
                Gold Pack</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/platinum.jpg" alt="premium plan pic"></center>
            <h1>Platinum premium plan</h1>
            <h2><label for="platinum-select">Choose Platinum Donator Pack:</label></h2>
            <select id="platinum-select" onchange="handlePlatinumSelection()">
                <option value="">--Select Duration--</option>
                <option value="platinum1">30 days (1 month)</option>
                <option value="platinum2">90 days (3 months)</option>
            </select>
            <h2>
                <span id="platinumpremiumname"></span><br>
                <div class="pcredits">Credits:<span id="platinumpremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Platinum donator pack?<br><br>You will get platinum donator role and platinum donator features in-game.','platinum')">Buy
                Platinum Pack</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/gangpremium.jpg" alt="gang premium pic"></center>
            <h1>Gang premium plan</h1>
            <h2><label for="gang-select">Choose Gang Premium Plan:</label></h2>
            <select id="gang-select" onchange="handleGangSelection()">
                <option value="">--Select Gang premium--</option>
                <option value="gang1">Heli</option>
                <option value="gang2">Custom vehicle</option>
                <option value="gang3">Heli + Custom vehicle</option>
            </select>
            <h2>
                <span id="gangpremiumname"></span><br>
                <div class="pcredits">Credits:<span id="gangpremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Gang premium?<br><br>You will be given Gang premium vehicles in-game.','gang')">Buy
                Gang Pack</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/shop.jpg" alt="shop pic"></center>
            <h1>Shop</h1>
            <h2><label for="shop-select">Choose Shop:</label></h2>
            <select id="shop-select" onchange="handleShopSelection()">
                <option value="">--Select Size--</option>
                <option value="shop1">24/7</option>
                <option value="shop2">Cloth shop</option>
                <option value="shop3">Food shop</option>
                <option value="shop4">Fuel Pump</option>
            </select>
            <h2>
                <span id="shoppremiumname"></span><br>
                <div class="pcredits">Credits:<span id="shoppremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Shop?<br><br>You will get Shop in-game.','shop')">Buy
                Shop</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/housepremium.jpg" alt="house premium pic"></center>
            <h1>House</h1>
            <h2><label for="house-select">Choose House:</label></h2>
            <select id="house-select" onchange="handleHouseSelection()">
                <option value="">--Select House Type--</option>
                <option value="house1">Lower class House</option>
                <option value="house2">Medium class House</option>
                <option value="house3">Upper class House</option>
                <option value="house4">Mansion</option>
            </select>
            <h2>
                <span id="housepremiumname"></span><br>
                <div class="pcredits">Credits:<span id="housepremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the House?<br><br>You will get House in-game.','house')">Buy
                House</button>
        </div>

        <div class="premium-plan">
            <center><img class="pimg" src="../images/premium/backpack.jpg" alt="backpack pic"></center>
            <h1>Backpack</h1>
            <h2><label for="backpack-select">Choose Backpack:</label></h2>
            <select id="backpack-select" onchange="handleBackpackSelection()">
                <option value="">--Select Backpack--</option>
                <option value="backpack1">Small Backpack</option>
                <option value="backpack2">Medium Backpack</option>
                <option value="backpack3">Large Backpack</option>
            </select>
            <h2>
                <span id="backpackpremiumname"></span><br>
                <div class="pcredits">Credits:<span id="backpackpremium">0</span><br></div>
            </h2>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the Special item?<br><br>You will get Special item in-game.','backpack')">Buy
                Backpack</button>
        </div>
    </div>

    <div class="main-container" id="main">
        <!-- Credit box to display credits -->
        <div class="creditbox" id="creditbox">
            <h1><span id="backpackpremiumname">Vehicles</span></h1><br>
            <h1>Credits: <span id="Credits">0</span></h1>
            <h3>Items added:</h3>
            <ol id="items"></ol>
            <button class="button"
                onclick="showConfirmation('Are you sure you want to proceed with purchasing the selected vehicles?<br><br>You will get all the purchased vehicles ingame.','vehicles')">Purchase
                vehicles</button>
            <button class="button" onclick="clearList()">Clear List</button>
        </div>
    </div>
    <div id="items-container">
    </div>
</body>



</html>