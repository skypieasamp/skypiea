<?php
// MySQL database configuration with new credentials
$host = '172.232.124.96'; // New MySQL hostname
$db = 's8646_skypiea';    // New database name
$user = 'u8646_823cc88gFx'; // New MySQL username
$pass = 'SV8!CSYYDxuuLD!m62=YL8aP'; // New MySQL password

// Create a database connection
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the spin items and chances
$sql = "SELECT item_name, win_percentage FROM spin_items";
$result = $conn->query($sql);

$items = [];
$percentages = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row['item_name'];
        $percentages[] = $row['win_percentage'];
    }
} else {
    echo "No items found!";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spin Wheel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }

        #wheel-container {
            position: relative;
            width: 350px;
            height: 350px;
            margin: 0 auto;
        }

        #wheel {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
            transform: rotate(-90deg); /* Rotates so that the top points upwards */
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .item {
            position: absolute;
            width: 50%;
            height: 50%;
            background-color: #FF5733;
            clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 2px #000;
            transform-origin: 100% 100%;
            text-align: center;
            font-size: 14px;
        }

        #spinButton {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }

        #spinButton:hover {
            background-color: #0056b3;
        }

        #pointer {
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 30px solid red;
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
        }
    </style>
</head>
<body>

<div id="wheel-container">
    <div id="pointer"></div>
    <div id="wheel"></div>
</div>
<button id="spinButton">Spin the Wheel</button>

<script>
    // PHP Variables passed to JavaScript
    const items = <?php echo json_encode($items); ?>;
    const percentages = <?php echo json_encode($percentages); ?>;
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#FF8F33", "#33FFF8"]; // Add more colors if needed

    // Create wheel segments
    const wheel = document.getElementById('wheel');
    const totalItems = items.length;
    const angle = 360 / totalItems;

    items.forEach((item, index) => {
        const segment = document.createElement('div');
        segment.classList.add('item');
        segment.style.transform = `rotate(${index * angle}deg)`;
        segment.style.backgroundColor = colors[index % colors.length]; // Assign a color from the array
        segment.innerHTML = `<p>${item}</p>`;
        wheel.appendChild(segment);
    });

    // Spin functionality
    document.getElementById('spinButton').addEventListener('click', () => {
        const random = Math.random() * 100;
        let cumulativePercentage = 0;
        let winningIndex = 0;

        for (let i = 0; i < percentages.length; i++) {
            cumulativePercentage += parseFloat(percentages[i]);
            if (random <= cumulativePercentage) {
                winningIndex = i;
                break;
            }
        }

        const rotationAngle = 360 * 5 + (winningIndex * angle); // 5 full rotations plus the winning segment
        wheel.style.transition = 'transform 5s ease';
        wheel.style.transform = `rotate(${rotationAngle}deg)`;

        setTimeout(() => {
            alert(`You won: ${items[winningIndex]}!`);
        }, 5000); // After spin ends
    });
</script>

</body>
</html>
