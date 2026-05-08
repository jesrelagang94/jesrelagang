<?php
/**
 * Visitor Tracking System
 * Jesrel Agang Portfolio - Tracks visitors and sends email notifications with location
 *
 * Features:
 * - IP-based geolocation
 * - Email notifications
 * - Rate limiting (1 notification per IP per hour)
 * - Visitor logging
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
    'https://www.jesrelagang.com',
    'https://jesrelagang.pro',
    'https://www.jesrelagang.pro'
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
define('NOTIFICATION_EMAILS', ['jessautogarage@gmail.com', 'jesrelagang94@gmail.com']);
define('SITE_NAME', 'Jesrel Agang Portfolio');
define('VISITORS_LOG_FILE', __DIR__ . '/visitors_log.json');
define('NOTIFICATION_LIMIT_FILE', __DIR__ . '/notification_limit.json');
define('NOTIFICATION_COOLDOWN', 3600); // 1 hour cooldown per IP

/**
 * Get visitor IP address
 */
function getVisitorIP() {
    $ip = '';

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
        $ip = $_SERVER['HTTP_X_REAL_IP'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }

    return trim($ip);
}

/**
 * Check if we should send notification for this IP (rate limiting)
 */
function shouldSendNotification($ip) {
    if (!file_exists(NOTIFICATION_LIMIT_FILE)) {
        file_put_contents(NOTIFICATION_LIMIT_FILE, json_encode([]));
    }

    $data = json_decode(file_get_contents(NOTIFICATION_LIMIT_FILE), true) ?? [];
    $now = time();

    // Clean old entries (older than cooldown period)
    foreach ($data as $key => $timestamp) {
        if ($now - $timestamp > NOTIFICATION_COOLDOWN) {
            unset($data[$key]);
        }
    }

    // Check if this IP was notified recently
    if (isset($data[$ip]) && ($now - $data[$ip]) < NOTIFICATION_COOLDOWN) {
        // Update the file with cleaned data
        file_put_contents(NOTIFICATION_LIMIT_FILE, json_encode($data));
        return false;
    }

    // Add/update this IP's timestamp
    $data[$ip] = $now;
    file_put_contents(NOTIFICATION_LIMIT_FILE, json_encode($data));

    return true;
}

/**
 * Get geolocation data from IP using free API
 */
function getGeoLocation($ip) {
    // Skip for localhost/private IPs
    if ($ip === '127.0.0.1' || $ip === 'localhost' || $ip === '::1' ||
        preg_match('/^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/', $ip)) {
        return [
            'ip' => $ip,
            'city' => 'Local Development',
            'region' => 'N/A',
            'country' => 'N/A',
            'country_code' => 'N/A',
            'isp' => 'Localhost',
            'timezone' => date_default_timezone_get(),
            'lat' => 0,
            'lon' => 0
        ];
    }

    // Use ip-api.com (free, no API key needed, 45 requests/minute limit)
    $url = "http://ip-api.com/json/{$ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,query";

    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'ignore_errors' => true
        ]
    ]);

    $response = @file_get_contents($url, false, $context);

    if ($response === false) {
        return [
            'ip' => $ip,
            'city' => 'Unknown',
            'region' => 'Unknown',
            'country' => 'Unknown',
            'country_code' => 'XX',
            'isp' => 'Unknown',
            'timezone' => 'Unknown',
            'lat' => 0,
            'lon' => 0
        ];
    }

    $data = json_decode($response, true);

    if ($data['status'] !== 'success') {
        return [
            'ip' => $ip,
            'city' => 'Unknown',
            'region' => 'Unknown',
            'country' => 'Unknown',
            'country_code' => 'XX',
            'isp' => 'Unknown',
            'timezone' => 'Unknown',
            'lat' => 0,
            'lon' => 0
        ];
    }

    return [
        'ip' => $ip,
        'city' => $data['city'] ?? 'Unknown',
        'region' => $data['regionName'] ?? 'Unknown',
        'country' => $data['country'] ?? 'Unknown',
        'country_code' => $data['countryCode'] ?? 'XX',
        'isp' => $data['isp'] ?? 'Unknown',
        'org' => $data['org'] ?? '',
        'timezone' => $data['timezone'] ?? 'Unknown',
        'lat' => $data['lat'] ?? 0,
        'lon' => $data['lon'] ?? 0,
        'zip' => $data['zip'] ?? ''
    ];
}

/**
 * Log visitor to file
 */
function logVisitor($visitorData) {
    if (!file_exists(VISITORS_LOG_FILE)) {
        file_put_contents(VISITORS_LOG_FILE, json_encode([]));
    }

    $logs = json_decode(file_get_contents(VISITORS_LOG_FILE), true) ?? [];

    // Keep only last 1000 entries to prevent file bloat
    if (count($logs) >= 1000) {
        $logs = array_slice($logs, -999);
    }

    $logs[] = $visitorData;
    file_put_contents(VISITORS_LOG_FILE, json_encode($logs, JSON_PRETTY_PRINT));
}

/**
 * Get country flag emoji
 */
function getCountryFlag($countryCode) {
    if (strlen($countryCode) !== 2) {
        return '';
    }
    $countryCode = strtoupper($countryCode);
    $flag = '';
    for ($i = 0; $i < 2; $i++) {
        $flag .= mb_chr(127397 + ord($countryCode[$i]));
    }
    return $flag;
}

/**
 * Generate HTML email template for visitor notification
 */
function generateVisitorEmailTemplate($data) {
    $flag = getCountryFlag($data['geo']['country_code']);
    $mapUrl = "https://www.google.com/maps?q={$data['geo']['lat']},{$data['geo']['lon']}";

    $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Visitor Alert</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 25px; }
        .location-box { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; border: 1px solid #bae6fd; }
        .location-flag { font-size: 48px; margin-bottom: 10px; }
        .location-city { font-size: 24px; font-weight: 700; color: #0369a1; margin-bottom: 5px; }
        .location-country { font-size: 16px; color: #0284c7; }
        .field { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .field:last-child { border-bottom: none; }
        .field-label { font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase; }
        .field-value { color: #111827; font-size: 14px; text-align: right; }
        .map-link { display: block; text-align: center; margin-top: 20px; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .map-link:hover { background: #1d4ed8; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        .alert-badge { display: inline-block; padding: 4px 10px; background: #fef3c7; color: #92400e; border-radius: 20px; font-size: 11px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Visitor on Your Portfolio!</h1>
            <p>Someone just visited jesrelagang.com</p>
        </div>
        <div class="content">
            <div class="location-box">
                <div class="location-flag">{$flag}</div>
                <div class="location-city">{$data['geo']['city']}</div>
                <div class="location-country">{$data['geo']['region']}, {$data['geo']['country']}</div>
            </div>

            <div class="field">
                <span class="field-label">IP Address</span>
                <span class="field-value">{$data['geo']['ip']}</span>
            </div>
            <div class="field">
                <span class="field-label">ISP / Organization</span>
                <span class="field-value">{$data['geo']['isp']}</span>
            </div>
            <div class="field">
                <span class="field-label">Timezone</span>
                <span class="field-value">{$data['geo']['timezone']}</span>
            </div>
            <div class="field">
                <span class="field-label">Page Visited</span>
                <span class="field-value">{$data['page']}</span>
            </div>
            <div class="field">
                <span class="field-label">Referrer</span>
                <span class="field-value">{$data['referrer']}</span>
            </div>
            <div class="field">
                <span class="field-label">Device</span>
                <span class="field-value">{$data['device']}</span>
            </div>
            <div class="field">
                <span class="field-label">Browser</span>
                <span class="field-value">{$data['browser']}</span>
            </div>
            <div class="field">
                <span class="field-label">Visit Time</span>
                <span class="field-value">{$data['timestamp']}</span>
            </div>

            <a href="{$mapUrl}" class="map-link" target="_blank">View Location on Map</a>
        </div>
        <div class="footer">
            <span class="alert-badge">VISITOR ALERT</span>
            <p style="margin-top: 10px;">This notification was sent from your portfolio visitor tracking system.</p>
        </div>
    </div>
</body>
</html>
HTML;

    return $html;
}

/**
 * Generate plain text email
 */
function generateVisitorPlainTextEmail($data) {
    $text = "NEW VISITOR ALERT\n";
    $text .= "==================\n\n";
    $text .= "Someone just visited your portfolio website!\n\n";
    $text .= "LOCATION\n";
    $text .= "--------\n";
    $text .= "City: {$data['geo']['city']}\n";
    $text .= "Region: {$data['geo']['region']}\n";
    $text .= "Country: {$data['geo']['country']}\n";
    $text .= "IP: {$data['geo']['ip']}\n";
    $text .= "ISP: {$data['geo']['isp']}\n";
    $text .= "Timezone: {$data['geo']['timezone']}\n\n";
    $text .= "VISIT DETAILS\n";
    $text .= "-------------\n";
    $text .= "Page: {$data['page']}\n";
    $text .= "Referrer: {$data['referrer']}\n";
    $text .= "Device: {$data['device']}\n";
    $text .= "Browser: {$data['browser']}\n";
    $text .= "Time: {$data['timestamp']}\n\n";
    $text .= "Map: https://www.google.com/maps?q={$data['geo']['lat']},{$data['geo']['lon']}\n";

    return $text;
}

/**
 * Parse user agent to get device and browser info
 */
function parseUserAgent($ua) {
    $device = 'Unknown';
    $browser = 'Unknown';

    // Detect device
    if (preg_match('/mobile|android|iphone|ipad|ipod|blackberry|windows phone/i', $ua)) {
        if (preg_match('/ipad/i', $ua)) {
            $device = 'iPad';
        } elseif (preg_match('/iphone/i', $ua)) {
            $device = 'iPhone';
        } elseif (preg_match('/android/i', $ua)) {
            $device = 'Android';
        } else {
            $device = 'Mobile';
        }
    } elseif (preg_match('/tablet/i', $ua)) {
        $device = 'Tablet';
    } else {
        if (preg_match('/windows/i', $ua)) {
            $device = 'Windows PC';
        } elseif (preg_match('/macintosh|mac os/i', $ua)) {
            $device = 'Mac';
        } elseif (preg_match('/linux/i', $ua)) {
            $device = 'Linux';
        } else {
            $device = 'Desktop';
        }
    }

    // Detect browser
    if (preg_match('/edg/i', $ua)) {
        $browser = 'Microsoft Edge';
    } elseif (preg_match('/opr|opera/i', $ua)) {
        $browser = 'Opera';
    } elseif (preg_match('/chrome/i', $ua)) {
        $browser = 'Chrome';
    } elseif (preg_match('/safari/i', $ua) && !preg_match('/chrome/i', $ua)) {
        $browser = 'Safari';
    } elseif (preg_match('/firefox/i', $ua)) {
        $browser = 'Firefox';
    } elseif (preg_match('/msie|trident/i', $ua)) {
        $browser = 'Internet Explorer';
    }

    return ['device' => $device, 'browser' => $browser];
}

/**
 * Send notification email
 */
function sendNotificationEmail($data) {
    $recipients = NOTIFICATION_EMAILS;
    $subject = "[Visitor Alert] New visit from {$data['geo']['city']}, {$data['geo']['country']}";

    $html_message = generateVisitorEmailTemplate($data);
    $plain_message = generateVisitorPlainTextEmail($data);

    $boundary = "PHP-mixed-" . md5(time());

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: multipart/alternative; boundary=\"{$boundary}\"";
    $headers[] = "From: " . SITE_NAME . " <noreply@jesrelagang.com>";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "X-Priority: 3";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $plain_message . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $html_message . "\r\n\r\n";
    $body .= "--{$boundary}--";

    $all_sent = true;
    foreach ($recipients as $recipient) {
        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));
        if (!$sent) {
            $all_sent = false;
            error_log("Failed to send visitor notification to: " . $recipient);
        }
    }

    return $all_sent;
}

/**
 * Main Execution
 */
try {
    // Get visitor IP
    $ip = getVisitorIP();

    // Get POST data
    $raw_data = file_get_contents('php://input');
    $post_data = json_decode($raw_data, true) ?? [];

    // Get geolocation
    $geo = getGeoLocation($ip);

    // Parse user agent
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    $uaInfo = parseUserAgent($ua);

    // Prepare visitor data
    $visitorData = [
        'geo' => $geo,
        'page' => htmlspecialchars($post_data['page'] ?? '/', ENT_QUOTES, 'UTF-8'),
        'referrer' => htmlspecialchars($post_data['referrer'] ?? 'Direct', ENT_QUOTES, 'UTF-8'),
        'device' => $uaInfo['device'],
        'browser' => $uaInfo['browser'],
        'user_agent' => htmlspecialchars($ua, ENT_QUOTES, 'UTF-8'),
        'timestamp' => date('F j, Y \a\t g:i:s A T'),
        'unix_timestamp' => time()
    ];

    // Always log the visitor
    logVisitor($visitorData);

    // Check if we should send notification (rate limiting)
    $notificationSent = false;
    if (shouldSendNotification($ip)) {
        $notificationSent = sendNotificationEmail($visitorData);
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'tracked' => true,
        'notification_sent' => $notificationSent
    ]);

} catch (Exception $e) {
    error_log("Visitor tracking error: " . $e->getMessage());

    http_response_code(200); // Still return 200 to not affect user experience
    echo json_encode([
        'success' => true,
        'tracked' => false,
        'error' => 'Internal tracking error'
    ]);
}
