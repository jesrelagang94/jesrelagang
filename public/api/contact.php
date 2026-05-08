<?php
/**
 * Professional Contact Form Handler
 * Jesrel Agang Portfolio - Secure PHP Mailer
 *
 * Features:
 * - Input validation and sanitization
 * - Rate limiting (spam protection)
 * - HTML email templates
 * - CORS security
 * - Error logging
 */

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS - Update with your domain
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://jesrelagang.com',
    'https://www.jesrelagang.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Configuration
define('RECIPIENT_EMAILS', ['jessautogarage@gmail.com', 'jesrelagang94@gmail.com']);
define('SITE_NAME', 'Jesrel Agang Portfolio');
define('RATE_LIMIT_FILE', __DIR__ . '/rate_limit.json');
define('MAX_REQUESTS_PER_HOUR', 5);

/**
 * Rate Limiting Function
 */
function checkRateLimit($ip) {
    if (!file_exists(RATE_LIMIT_FILE)) {
        file_put_contents(RATE_LIMIT_FILE, json_encode([]));
    }

    $data = json_decode(file_get_contents(RATE_LIMIT_FILE), true) ?? [];
    $now = time();
    $hour_ago = $now - 3600;

    // Clean old entries
    $data = array_filter($data, function($timestamp) use ($hour_ago) {
        return $timestamp > $hour_ago;
    });

    // Check rate limit
    $ip_requests = array_filter($data, function($timestamp, $key) use ($ip) {
        return strpos($key, $ip) === 0;
    }, ARRAY_FILTER_USE_BOTH);

    if (count($ip_requests) >= MAX_REQUESTS_PER_HOUR) {
        return false;
    }

    // Add new request
    $data[$ip . '_' . $now] = $now;
    file_put_contents(RATE_LIMIT_FILE, json_encode($data));

    return true;
}

/**
 * Input Validation and Sanitization
 */
function validateAndSanitize($data) {
    $errors = [];
    $clean = [];

    // Name validation
    if (empty($data['name'])) {
        $errors[] = 'Name is required';
    } else {
        $clean['name'] = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
        if (strlen($clean['name']) < 2 || strlen($clean['name']) > 100) {
            $errors[] = 'Name must be between 2 and 100 characters';
        }
    }

    // Email validation
    if (empty($data['email'])) {
        $errors[] = 'Email is required';
    } else {
        $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Invalid email address';
        } else {
            $clean['email'] = $email;
        }
    }

    // Phone validation (optional)
    $clean['phone'] = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '';

    // Service validation
    if (empty($data['service'])) {
        $errors[] = 'Please select a service';
    } else {
        $allowed_services = [
            'N8N Automation',
            'Full-Stack Development',
            'Mobile App Development',
            'Virtual Assistant',
            'Multiple Services',
            'Other'
        ];
        if (!in_array($data['service'], $allowed_services)) {
            $errors[] = 'Invalid service selection';
        } else {
            $clean['service'] = htmlspecialchars($data['service'], ENT_QUOTES, 'UTF-8');
        }
    }

    // Message validation
    if (empty($data['message'])) {
        $errors[] = 'Message is required';
    } else {
        $clean['message'] = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
        if (strlen($clean['message']) < 10) {
            $errors[] = 'Message must be at least 10 characters';
        }
        if (strlen($clean['message']) > 5000) {
            $errors[] = 'Message is too long (max 5000 characters)';
        }
    }

    return ['errors' => $errors, 'data' => $clean];
}

/**
 * Generate HTML Email Template
 */
function generateEmailTemplate($data) {
    $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f75023 0%, #ff6b3d 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .field-label { font-weight: 600; color: #f75023; text-transform: uppercase; font-size: 12px; margin-bottom: 5px; }
        .field-value { color: #333; font-size: 15px; }
        .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #f75023; border-radius: 4px; margin-top: 10px; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .badge { display: inline-block; padding: 5px 12px; background: #1cbe59; color: white; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 New Contact Form Submission</h1>
            <p>Someone just reached out via your portfolio website</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">{$data['name']}</div>
            </div>
            <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value"><a href="mailto:{$data['email']}" style="color: #f75023; text-decoration: none;">{$data['email']}</a></div>
            </div>
HTML;

    if (!empty($data['phone'])) {
        $html .= <<<HTML
            <div class="field">
                <div class="field-label">📞 Phone</div>
                <div class="field-value">{$data['phone']}</div>
            </div>
HTML;
    }

    $html .= <<<HTML
            <div class="field">
                <div class="field-label">🎯 Service Interested In</div>
                <div class="field-value">
                    {$data['service']}
                    <span class="badge">NEW LEAD</span>
                </div>
            </div>
            <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="message-box">{$data['message']}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from your portfolio contact form at <strong>jesrelagang.com</strong></p>
            <p style="margin-top: 10px; color: #999;">Received on {$data['timestamp']}</p>
        </div>
    </div>
</body>
</html>
HTML;

    return $html;
}

/**
 * Generate Plain Text Email
 */
function generatePlainTextEmail($data) {
    $text = "New Contact Form Submission\n";
    $text .= "================================\n\n";
    $text .= "Name: {$data['name']}\n";
    $text .= "Email: {$data['email']}\n";
    if (!empty($data['phone'])) {
        $text .= "Phone: {$data['phone']}\n";
    }
    $text .= "Service: {$data['service']}\n\n";
    $text .= "Message:\n";
    $text .= "--------\n";
    $text .= "{$data['message']}\n\n";
    $text .= "================================\n";
    $text .= "Received: {$data['timestamp']}\n";
    $text .= "From: jesrelagang.com contact form\n";

    return $text;
}

/**
 * Send Email to Multiple Recipients
 */
function sendEmail($data) {
    $recipients = RECIPIENT_EMAILS;
    $subject = "[" . SITE_NAME . "] New Message from {$data['name']} - {$data['service']}";
    $reply_to = $data['email'];

    // Add timestamp
    $data['timestamp'] = date('F j, Y \a\t g:i A');

    // Generate email content
    $html_message = generateEmailTemplate($data);
    $plain_message = generatePlainTextEmail($data);

    // Email headers
    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: multipart/alternative; boundary=\"PHP-mixed-" . md5(time()) . "\"";
    $headers[] = "From: " . SITE_NAME . " <noreply@jesrelagang.com>";
    $headers[] = "Reply-To: {$data['name']} <{$reply_to}>";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "X-Priority: 1";
    $headers[] = "Importance: High";

    $boundary = "PHP-mixed-" . md5(time());

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $plain_message . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $html_message . "\r\n\r\n";
    $body .= "--{$boundary}--";

    // Send to all recipients
    $all_sent = true;
    foreach ($recipients as $recipient) {
        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));
        if (!$sent) {
            $all_sent = false;
            error_log("Failed to send email to: " . $recipient);
        }
    }

    return $all_sent;
}

/**
 * Main Execution
 */
try {
    // Get client IP
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    // Rate limit check
    if (!checkRateLimit($ip)) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many requests. Please try again later.'
        ]);
        exit();
    }

    // Get POST data
    $raw_data = file_get_contents('php://input');
    $post_data = json_decode($raw_data, true);

    // Fallback to $_POST if JSON decode fails
    if (json_last_error() !== JSON_ERROR_NONE) {
        $post_data = $_POST;
    }

    // Validate and sanitize
    $validation = validateAndSanitize($post_data);

    if (!empty($validation['errors'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $validation['errors']
        ]);
        exit();
    }

    // Send email
    $email_sent = sendEmail($validation['data']);

    if ($email_sent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! I will get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    // Log error (in production, use proper logging)
    error_log("Contact form error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or email me directly at jessautogarage@gmail.com'
    ]);
}
