<?php
// Load Composer's autoloader
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Load environment variables from the .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Function to send email via SMTP using PHPMailer with credentials from the .env file
function sendEmail($to, $subject, $body, $fromEmail) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST']; // Lark's SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME']; // SMTP username from .env
        $mail->Password = $_ENV['SMTP_PASSWORD']; // SMTP password from .env
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT']; // TCP port for Lark (587)

        // Recipients
        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']); // Sender's info from .env
        $mail->addAddress($to); // Add recipient email

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        // Send email
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formType = $_POST['form_type'];

    // Sanitize input data
    function sanitizeInput($data) {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    // Common form fields
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $errors = [];

    // Email settings
    $to = $_ENV['SMTP_FROM_EMAIL']; // Replace with your receiving email
    $subjectLine = "New Submission from Website";

    if (empty($name)) {
        $errors[] = "Name is required";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }

    // Process form based on type
    if ($formType == 'contact_form') {
        $subject = sanitizeInput($_POST['subject']);
        $message = sanitizeInput($_POST['message']);

        if (empty($subject)) {
            $errors[] = "Subject is required";
        }
        if (empty($message)) {
            $errors[] = "Message is required";
        }

        if (empty($errors)) {
            // Prepare email content for Form 1
            $body = "<h1>Contact Form Submission</h1>
                     <p><strong>Name:</strong> $name</p>
                     <p><strong>Email:</strong> $email</p>
                     <p><strong>Subject:</strong> $subject</p>
                     <p><strong>Message:</strong> $message</p>";

            // Send email via SMTP
            if (sendEmail($to, $subjectLine, $body, $email)) {
                echo "Form 1 (Contact Form) submitted successfully!";
            } else {
                echo "Error sending email.";
            }
        }
    } elseif ($formType == 'booking_form_1') {
        $sessionDate = sanitizeInput($_POST['session-date']);
        $package = sanitizeInput($_POST['package']);
        $message = sanitizeInput($_POST['message']);

        if (empty($sessionDate)) {
            $errors[] = "Preferred session date is required";
        }
        if (empty($package)) {
            $errors[] = "Package selection is required";
        }

        if (empty($errors)) {
            // Prepare email content for Form 2
            $body = "<h1>Booking Form 1 Submission</h1>
                     <p><strong>Name:</strong> $name</p>
                     <p><strong>Email:</strong> $email</p>
                     <p><strong>Session Date:</strong> $sessionDate</p>
                     <p><strong>Package:</strong> $package</p>
                     <p><strong>Additional Message:</strong> $message</p>";

            if (sendEmail($to, $subjectLine, $body, $email)) {
                echo "Form 2 (Booking Form 1) submitted successfully!";
            } else {
                echo "Error sending email.";
            }
        }
    } elseif ($formType == 'booking_form_2') {
        $sessionDate = sanitizeInput($_POST['session-date']);
        $package = sanitizeInput($_POST['package']);
        $consoleHours = sanitizeInput($_POST['console-hours']);
        $message = sanitizeInput($_POST['message']);

        if (empty($sessionDate)) {
            $errors[] = "Preferred session date is required";
        }
        if (empty($package)) {
            $errors[] = "Package selection is required";
        }
        if (empty($consoleHours)) {
            $errors[] = "Console hours selection is required";
        }

        if (empty($errors)) {
            // Prepare email content for Form 3
            $body = "<h1>Booking Form 2 Submission</h1>
                     <p><strong>Name:</strong> $name</p>
                     <p><strong>Email:</strong> $email</p>
                     <p><strong>Session Date:</strong> $sessionDate</p>
                     <p><strong>Package:</strong> $package</p>
                     <p><strong>Console Hours:</strong> $consoleHours</p>
                     <p><strong>Additional Message:</strong> $message</p>";

            if (sendEmail($to, $subjectLine, $body, $email)) {
                echo "Form 3 (Booking Form 2) submitted successfully!";
            } else {
                echo "Error sending email.";
            }
        }
    }

    // Display errors if any
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p>Error: $error</p>";
        }
    }
}
?>
