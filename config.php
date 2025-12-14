<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'broker_portfolio_db');
                                        
// Create connection with better error handling
function getDBConnection() {
    try {
        // First try to connect without database to check server availability
        $pdo = new PDO("mysql:host=" . DB_HOST, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Check if database exists, create if not
        $stmt = $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" . DB_NAME . "'");
        if ($stmt->rowCount() == 0) {
            $pdo->exec("CREATE DATABASE " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        }
        
        // Now connect to the specific database
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        
        return $pdo;
    } catch(PDOException $e) {
        // More detailed error logging
        error_log("Database Error [" . date('Y-m-d H:i:s') . "]: " . $e->getMessage());
        error_log("Connection details - Host: " . DB_HOST . ", User: " . DB_USER . ", Database: " . DB_NAME);
        
        throw new Exception("Database connection failed. Please check your credentials and try again.");
    }
}
?>
