<?php
// Process POST request
$username = $_POST['username'] ?? 'Unknown';
$userId = $_POST['userid'] ?? 'Unknown';
$avatarUrl = $_POST['avatarurl'] ?? 'No Avatar';

// Set cookies for userid, username, and avatarurl
// Cookies will expire after 30 days (30 * 24 * 60 * 60 seconds)
setcookie('userid', $userId, time() + (30 * 24 * 60 * 60), "/");
setcookie('username', $username, time() + (30 * 24 * 60 * 60), "/");
setcookie('avatarurl', $avatarUrl, time() + (30 * 24 * 60 * 60), "/");

// Optional: Output user information for debugging
echo "Username: " . htmlspecialchars($username) . "\n";
echo "User ID: " . htmlspecialchars($userId) . "\n";
echo "Avatar URL: " . htmlspecialchars($avatarUrl) . "\n";

// Redirect to index.php after setting cookies
header('Location: index.php');
exit(); // Ensure the script stops after the redirect
?>
