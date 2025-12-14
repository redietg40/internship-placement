<?php
// Include database configuration
require_once 'config.php';

// Set content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get database connection
    $pdo = getDBConnection();
    
    // Check if applications table exists
    $tableCheckSQL = "SHOW TABLES LIKE 'applications'";
    $stmt = $pdo->query($tableCheckSQL);
    
    if ($stmt->rowCount() === 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Applications table does not exist. Please run create_database.php first.',
            'data' => [],
            'pagination' => [
                'current_page' => 1,
                'total_pages' => 0,
                'total_records' => 0,
                'per_page' => 10,
                'has_next' => false,
                'has_prev' => false
            ]
        ]);
        exit;
    }
    
    // Get query parameters
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 10;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;
    
    $offset = ($page - 1) * $limit;
    
    // Build WHERE clause
    $whereConditions = [];
    $params = [];
    
    if ($status && in_array($status, ['pending', 'reviewed', 'accepted', 'rejected'])) {
        $whereConditions[] = "status = ?";
        $params[] = $status;
    }
    
    if ($search) {
        $whereConditions[] = "(full_name LIKE ? OR email LIKE ? OR university LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }
    
    $whereClause = !empty($whereConditions) ? "WHERE " . implode(" AND ", $whereConditions) : "";
    
    // Get total count
    $countSQL = "SELECT COUNT(*) as total FROM applications $whereClause";
    $countStmt = $pdo->prepare($countSQL);
    $countStmt->execute($params);
    $totalRecords = $countStmt->fetch()['total'];
    
    // Get applications
    $sql = "
        SELECT 
            id, full_name, email, phone, university, program, year_of_study,
            gpa, programming_languages, technologies, portfolio_url,
            motivation, experience, status, application_date, created_at, updated_at
        FROM applications 
        $whereClause 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    ";
    
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $applications = $stmt->fetchAll();
    
    // Calculate pagination info
    $totalPages = ceil($totalRecords / $limit);
    
    echo json_encode([
        'success' => true,
        'data' => $applications,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_records' => $totalRecords,
            'per_page' => $limit,
            'has_next' => $page < $totalPages,
            'has_prev' => $page > 1
        ],
        'filters' => [
            'status' => $status,
            'search' => $search
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred',
        'error' => $e->getMessage(),
        'debug' => [
            'code' => $e->getCode(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'debug' => [
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]
    ]);
}
?>
