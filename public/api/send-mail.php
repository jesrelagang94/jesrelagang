<?php
/**
 * Contact Form Mail Handler
 * Receives form data via POST and sends email
 */

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Configuration
$recipient_email = 'jesrelagang94@gmail.com';
$email_subject_prefix = '[Website Contact] ';

// Rate limiting using session
session_start();
$rate_limit_key = 'contact_form_submissions';
$max_submissions = 3;
$time_window = 300; // 5 minutes

if (!isset($_SESSION[$rate_limit_key])) {
    $_SESSION[$rate_limit_key] = [];
}

// Clean old entries
$_SESSION[$rate_limit_key] = array_filter($_SESSION[$rate_limit_key], function($time) use ($time_window) {
    return $time > (time() - $time_window);
});

// Check rate limit
if (count($_SESSION[$rate_limit_key]) >= $max_submissions) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many submissions. Please wait a few minutes.']);
    exit();
}

// Get and decode JSON input
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit();
}

// Sanitize function
function sanitize_input($input, $max_length = 1000) {
    if (!is_string($input)) return '';
    $input = trim($input);
    $input = strip_tags($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return substr($input, 0, $max_length);
}

// Validate email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Check for spam indicators
function has_spam_indicators($text) {
    $spam_patterns = [
        '/\b(viagra|cialis|casino|poker|lottery|winner|prize|claim|urgent|act now)\b/i',
        '/\b(buy now|limited time|special offer|click here|subscribe)\b/i',
        '/(https?:\/\/[^\s]+){3,}/i', // Multiple URLs
        '/(.)\1{10,}/', // Repeated characters
    ];

    foreach ($spam_patterns as $pattern) {
        if (preg_match($pattern, $text)) {
            return true;
        }
    }
    return false;
}

// Extract and sanitize form data
$name = sanitize_input($data['name'] ?? '', 100);
$email = sanitize_input($data['email'] ?? '', 254);
$phone = sanitize_input($data['phone'] ?? '', 20);
$service = sanitize_input($data['service'] ?? '', 100);
$message = sanitize_input($data['message'] ?? '', 5000);

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name is required (minimum 2 characters)';
}

if (empty($email) || !is_valid_email($email)) {
    $errors[] = 'Valid email is required';
}

if (empty($service)) {
    $errors[] = 'Please select a service';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required (minimum 10 characters)';
}

// Spam check
if (has_spam_indicators($message) || has_spam_indicators($name)) {
    $errors[] = 'Your message appears to contain spam';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit();
}

// Build email content
$email_subject = $email_subject_prefix . 'New inquiry from ' . $name;

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #C41E3A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>" . (empty($phone) ? 'Not provided' : htmlspecialchars($phone)) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Service Interested In:</div>
                <div class='value'>" . htmlspecialchars($service) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            Sent from jesrelagang.pro contact form<br>
            " . date('F j, Y \a\t g:i A') . "
        </div>
    </div>
</body>
</html>
";

// Plain text version
$plain_text = "
New Contact Form Submission
===========================

Name: $name
Email: $email
Phone: " . (empty($phone) ? 'Not provided' : $phone) . "
Service: $service

Message:
$message

---
Sent from jesrelagang.pro contact form
" . date('F j, Y \a\t g:i A') . "
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Jesrel Agang Website <noreply@jesrelagang.pro>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'X-Originating-IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown')
];

// Send email
$mail_sent = mail($recipient_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Record successful submission for rate limiting
    $_SESSION[$rate_limit_key][] = time();

    // Log successful submission (optional)
    error_log("Contact form submitted by $email at " . date('Y-m-d H:i:s'));

    echo json_encode([
        'success' => true,
        'message' => "Thank you! Your message has been sent. I'll get back to you within 24 hours."
    ]);
} else {
    http_response_code(500);
    error_log("Failed to send contact form email from $email");
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or email directly.'
    ]);
}
