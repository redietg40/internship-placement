<?php
// Update application status endpoint
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

// Include database configuration
require_once 'config.php';

// Handle GET requests for testing/debugging
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => true,
        'message' => 'Update Application Status endpoint is working',
        'method' => 'GET',
        'info' => 'This endpoint accepts POST requests to update application status',
        'expected_fields' => [
            'id' => 'Application ID (integer)',
            'status' => 'New status (pending, reviewed, accepted, rejected)'
        ],
        'example_usage' => [
            'method' => 'POST',
            'content_type' => 'application/json',
            'body' => '{"id": 1, "status": "reviewed"}'
        ]
    ]);
    exit;
}

// Only allow POST requests for actual updates
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST with JSON data.',
        'allowed_methods' => ['GET', 'POST'],
        'content_type' => 'application/json'
    ]);
    exit;
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate required fields
    $id = $input['id'] ?? null;
    $status = $input['status'] ?? null;
    
    if (!$id || !$status) {
        throw new Exception('Application ID and status are required');
    }
    
    // Validate status value
    $validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!in_array($status, $validStatuses)) {
        throw new Exception('Invalid status value');
    }
    
    // Get database connection
    $pdo = getDBConnection();
    
    // Check if application exists
    $checkSQL = "SELECT id FROM applications WHERE id = :id";
    $checkStmt = $pdo->prepare($checkSQL);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() === 0) {
        throw new Exception('Application not found');
    }
    
    // Update application status
    $updateSQL = "UPDATE applications SET status = :status, updated_at = CURRENT_TIMESTAMP WHERE id = :id";
    $updateStmt = $pdo->prepare($updateSQL);
    $updateStmt->bindParam(':status', $status, PDO::PARAM_STR);
    $updateStmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    if ($updateStmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => "Application status updated to {$status}",
            'data' => [
                'id' => $id,
                'status' => $status,
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        throw new Exception('Failed to update application status');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>