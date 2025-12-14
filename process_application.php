<?php
// Include database configuration
require_once 'config.php';



// Set content type to JSON for API responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token, Accept, Origin');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// REMOVE THIS DUPLICATE LINE - it's already included above
// require_once 'config.php';

// Handle GET requests (for testing)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // ... rest of your code
    echo json_encode([
        'success' => true,
        'message' => 'Application processing endpoint is working',
        'method' => 'GET',
        'info' => 'This endpoint accepts POST requests to process application submissions',
        'expected_fields' => [
            'fullName', 'email', 'phone', 'university', 'program', 
            'year', 'gpa', 'portfolio', 'programmingLanguages', 'technologies', 
            'motivation', 'experience'
        ]
    ]);
    exit;
}

// Only allow POST requests for actual processing
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    error_log("Processing application form submission");
    error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
    error_log("Content type: " . ($_SERVER['CONTENT_TYPE'] ?? 'not set'));
    
    // Get database connection
    $pdo = getDBConnection();
    error_log("Database connection established successfully");
    
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            university VARCHAR(255) NOT NULL,
            program VARCHAR(100) NOT NULL,
            year_of_study VARCHAR(20) NOT NULL,
            gpa DECIMAL(3,2) NOT NULL,
            portfolio_url VARCHAR(500) NOT NULL,
            programming_languages TEXT NOT NULL,
            technologies TEXT NOT NULL,
            motivation TEXT NOT NULL,
            experience TEXT NOT NULL,
            application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_email (email),
            INDEX idx_status (status),
            INDEX idx_email (email),
            INDEX idx_created_at (created_at),
            INDEX idx_university (university),
            INDEX idx_program (program)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    $pdo->exec($createTableSQL);
    error_log("Applications table checked/created successfully");

    // Get input data from JSON payload
    $rawInput = file_get_contents('php://input');
    error_log("Raw input received: " . $rawInput);
    
    $input = json_decode($rawInput, true);
    if (!$input) {
        error_log("JSON decode error: " . json_last_error_msg());
        throw new Exception("Invalid JSON input or no data received. JSON Error: " . json_last_error_msg());
    }

    error_log("Parsed input data: " . json_encode($input));

    // Server-side validation functions
    function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    function validateGPA($gpa) {
        if (empty($gpa)) {
            return false; // GPA is now required
        }
        $gpaValue = floatval($gpa);
        return $gpaValue >= 0 && $gpaValue <= 4.0;
    }
    
    function validatePhone($phone) {
        $cleanPhone = preg_replace('/\D/', '', $phone);
        return strlen($cleanPhone) >= 10 && strlen($cleanPhone) <= 15;
    }
    
    function validateURL($url) {
        if (empty($url)) {
            return false; // Portfolio is now required
        }
        return filter_var($url, FILTER_VALIDATE_URL);
    }

    // Map form fields to database fields and sanitize
    $cleanData = [
        'fullName' => trim($input['fullName'] ?? ''),
        'email' => trim($input['email'] ?? ''),
        'phone' => trim($input['phone'] ?? ''),
        'university' => trim($input['university'] ?? ''),
        'program' => trim($input['program'] ?? ''),
        'year' => trim($input['year'] ?? ''),
        'gpa' => trim($input['gpa'] ?? ''),
        'portfolio' => trim($input['portfolio'] ?? ''),
        'programmingLanguages' => trim($input['programmingLanguages'] ?? ''),
        'technologies' => trim($input['technologies'] ?? ''),
        'motivation' => trim($input['motivation'] ?? ''),
        'experience' => trim($input['experience'] ?? '')
    ];

    $errors = [];

    // Required field validation with detailed messages
    if (empty($cleanData['fullName']) || strlen($cleanData['fullName']) < 2) {
        $errors[] = "Full name is required and must be at least 2 characters";
    }

    if (empty($cleanData['email'])) {
        $errors[] = "Email address is required";
    } elseif (!validateEmail($cleanData['email'])) {
        $errors[] = "Please enter a valid email address";
    }

    if (empty($cleanData['phone'])) {
        $errors[] = "Phone number is required";
    } elseif (!validatePhone($cleanData['phone'])) {
        $errors[] = "Please enter a valid phone number (10-15 digits)";
    }

    if (empty($cleanData['university']) || strlen($cleanData['university']) < 2) {
        $errors[] = "University/Institution is required and must be at least 2 characters";
    }

    if (empty($cleanData['program'])) {
        $errors[] = "Study program is required";
    }

    if (empty($cleanData['year'])) {
        $errors[] = "Year of study is required";
    }

    if (!validateGPA($cleanData['gpa'])) {
        $errors[] = "GPA is required and must be between 0.0 and 4.0";
    }

    if (empty($cleanData['portfolio'])) {
        $errors[] = "Portfolio URL is required";
    } elseif (!validateURL($cleanData['portfolio'])) {
        $errors[] = "Please enter a valid portfolio URL starting with http:// or https://";
    }

    if (empty($cleanData['programmingLanguages']) || strlen($cleanData['programmingLanguages']) < 20) {
        $errors[] = "Programming languages are required (minimum 20 characters)";
    }

    if (empty($cleanData['technologies']) || strlen($cleanData['technologies']) < 15) {
        $errors[] = "Technology frameworks are required (minimum 15 characters)";
    }

    if (empty($cleanData['motivation']) || strlen($cleanData['motivation']) < 100) {
        $errors[] = "Motivation is required (minimum 100 characters)";
    }

    if (empty($cleanData['experience']) || strlen($cleanData['experience']) < 50) {
        $errors[] = "Relevant experience is required (minimum 50 characters)";
    }

    if (!empty($errors)) {
        error_log("Validation errors: " . json_encode($errors));
        error_log("Submitted data: " . json_encode($cleanData));
        
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation errors occurred',
            'errors' => $errors,
            'error_count' => count($errors)
        ]);
        exit;
    }

    // Check if email already exists
    $emailCheckSQL = "SELECT id FROM applications WHERE email = ?";
    $stmt = $pdo->prepare($emailCheckSQL);
    $stmt->execute([$cleanData['email']]);
    
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'An application with this email address already exists',
            'error_type' => 'duplicate_email'
        ]);
        exit;
    }
    
    $sql = "INSERT INTO applications (
                full_name, email, phone, university, program, year_of_study, 
                gpa, portfolio_url, programming_languages, technologies, 
                motivation, experience
            ) VALUES (
                :fullName, :email, :phone, :university, :program, :year, 
                :gpa, :portfolio, :programmingLanguages, :technologies, 
                :motivation, :experience
            )";
            
    $stmt = $pdo->prepare($sql);

    // Convert GPA to float (now required)
    $gpaValue = floatval($cleanData['gpa']);

    // Bind parameters
    $stmt->bindParam(':fullName', $cleanData['fullName']);
    $stmt->bindParam(':email', $cleanData['email']);
    $stmt->bindParam(':phone', $cleanData['phone']);
    $stmt->bindParam(':university', $cleanData['university']);
    $stmt->bindParam(':program', $cleanData['program']);
    $stmt->bindParam(':year', $cleanData['year']);
    $stmt->bindValue(':gpa', $gpaValue, PDO::PARAM_STR);
    $stmt->bindParam(':portfolio', $cleanData['portfolio']);
    $stmt->bindParam(':programmingLanguages', $cleanData['programmingLanguages']);
    $stmt->bindParam(':technologies', $cleanData['technologies']);
    $stmt->bindParam(':motivation', $cleanData['motivation']);
    $stmt->bindParam(':experience', $cleanData['experience']);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        $applicationId = $pdo->lastInsertId();
        error_log("New application submitted - ID: $applicationId, Email: " . $cleanData['email']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Application submitted successfully! We will review your application and contact you soon.',
            'application_id' => $applicationId,
            'data' => [
                'id' => $applicationId,
                'full_name' => $cleanData['fullName'],
                'email' => $cleanData['email'],
                'status' => 'pending',
                'submitted_at' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        throw new Exception("Failed to save application to database");
    }
    
} catch (PDOException $e) {
    error_log("PDO Database Error: " . $e->getMessage());
    error_log("PDO Error Code: " . $e->getCode());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred. Please try again later.',
        'error_type' => 'database_error',
        'debug' => [
            'message' => $e->getMessage(),
            'code' => $e->getCode()
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Application Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_type' => 'application_error'
    ]);
}
?>
