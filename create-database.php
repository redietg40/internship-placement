<?php
// Database setup script
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include config file instead of redefining constants
require_once 'config.php';

// Function to test database connection
function testConnection() {
    try {
        $pdo = getDBConnection();
        return [
            'success' => true,
            'message' => 'Database connection successful!'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Database connection failed: ' . $e->getMessage()
        ];
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup - InternConnect</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1e293b;
            margin-bottom: 10px;
        }
        .status {
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        .error {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
        }
        .info {
            background: #dbeafe;
            color: #1d4ed8;
            border: 1px solid #bfdbfe;
        }
        .button {
            background: #3b82f6;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 10px 5px;
        }
        .button:hover {
            background: #2563eb;
        }
        .button.secondary {
            background: #6b7280;
        }
        .button.secondary:hover {
            background: #4b5563;
        }
        .section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }
        .code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 InternConnect Database Setup</h1>
            <p>Initialize your database and create required tables</p>
        </div>

        <?php
        // Initialize variables
        $dbExists = false;
        $tablesExist = false;
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
            $action = $_POST['action'];
            
            try {
                if ($action === 'create_database') {
                    // Connect to MySQL server (without database selection)
                    $dsn = "mysql:host=" . DB_HOST . ";charset=utf8mb4";
                    $options = [
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                    ];
                    
                    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
                    
                    // Create database
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    echo '<div class="status success">✅ Database "' . DB_NAME . '" created successfully!</div>';
                }
                
                if ($action === 'create_tables') {
                    // Get database connection using our config function
                    $pdo = getDBConnection();
                    
                    // Create applications table with proper field mapping
                    $createApplicationsTable = "
                        CREATE TABLE IF NOT EXISTS applications (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            full_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phone VARCHAR(20) NOT NULL,
                            university VARCHAR(255) NOT NULL,
                            program VARCHAR(100) NOT NULL,
                            year_of_study VARCHAR(20) NOT NULL,
                            gpa DECIMAL(3,2) NULL,
                            programming_languages TEXT NOT NULL,
                            technologies TEXT NULL,
                            portfolio_url VARCHAR(500) NULL,
                            motivation TEXT NOT NULL,
                            experience TEXT NULL,
                            application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            INDEX idx_status (status),
                            INDEX idx_email (email),
                            INDEX idx_created_at (created_at)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
                    ";
                    
                    $pdo->exec($createApplicationsTable);
                    echo '<div class="status success">✅ Applications table created successfully!</div>';
                    
                    // Insert sample data
                    $sampleData = "
                        INSERT IGNORE INTO applications (
                            full_name, email, phone, university, program, year_of_study, 
                            gpa, programming_languages, technologies, portfolio_url, 
                            motivation, experience, status
                        ) VALUES 
                        (
                            'John Doe', 
                            'john.doe@example.com', 
                            '+251-911-123456', 
                            'Addis Ababa University', 
                            'computer-science', 
                            '4', 
                            3.75, 
                            'Python, JavaScript, Java', 
                            'React, Node.js, Django, Docker', 
                            'https://github.com/johndoe', 
                            'I am passionate about using technology to solve real-world problems and contribute to innovation in Ethiopia.', 
                            'Internship at local tech company, built several web applications', 
                            'pending'
                        )
                    ";
                    
                    $pdo->exec($sampleData);
                    echo '<div class="status success">✅ Sample data inserted successfully!</div>';
                }
                
                if ($action === 'test_connection') {
                    $result = testConnection();
                    if ($result['success']) {
                        echo '<div class="status success">✅ ' . $result['message'] . '</div>';
                        
                        // Count applications
                        $pdo = getDBConnection();
                        $stmt = $pdo->query("SELECT COUNT(*) as count FROM applications");
                        $count = $stmt->fetch()['count'];
                        echo '<div class="status info">📊 Found ' . $count . ' applications in the database</div>';
                    } else {
                        echo '<div class="status error">❌ ' . $result['message'] . '</div>';
                    }
                }
                
            } catch (PDOException $e) {
                echo '<div class="status error">❌ Database Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
            } catch (Exception $e) {
                echo '<div class="status error">❌ Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
            }
        }
        
        // Check current status
        try {
            $result = testConnection();
            $dbExists = $result['success'];
            
            if ($dbExists) {
                $pdo = getDBConnection();
                $stmt = $pdo->query("SHOW TABLES LIKE 'applications'");
                $tablesExist = $stmt->rowCount() > 0;
            }
            
        } catch (Exception $e) {
            echo '<div class="status error">❌ Connection Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
            echo '<div class="status info">💡 Please check your database credentials in config.php</div>';
        }
        ?>
        
        <div class="section">
            <h3>📋 Setup Checklist</h3>
            <p><strong>Current Status:</strong></p>
            <ul>
                <li><?php echo $dbExists ? '✅' : '❌'; ?> Database "<?php echo DB_NAME; ?>" exists</li>
                <li><?php echo $tablesExist ? '✅' : '❌'; ?> Applications table exists</li>
            </ul>
        </div>
        
        <div class="section">
            <h3>🔧 Database Configuration</h3>
            <p><strong>Current Settings:</strong></p>
            <ul>
                <li><strong>Host:</strong> <span class="code"><?php echo DB_HOST; ?></span></li>
                <li><strong>Database:</strong> <span class="code"><?php echo DB_NAME; ?></span></li>
                <li><strong>Username:</strong> <span class="code"><?php echo DB_USER; ?></span></li>
            </ul>
            <p><em>💡 To change these settings, edit the <span class="code">config.php</span> file.</em></p>
        </div>
        
        <div class="section">
            <h3>🚀 Setup Actions</h3>
            
            <?php if (!$dbExists): ?>
            <form method="POST" style="display: inline;">
                <input type="hidden" name="action" value="create_database">
                <button type="submit" class="button">Create Database</button>
            </form>
            <?php endif; ?>
            
            <?php if ($dbExists && !$tablesExist): ?>
            <form method="POST" style="display: inline;">
                <input type="hidden" name="action" value="create_tables">
                <button type="submit" class="button">Create Tables & Sample Data</button>
            </form>
            <?php endif; ?>
            
            <form method="POST" style="display: inline;">
                <input type="hidden" name="action" value="test_connection">
                <button type="submit" class="button secondary">Test Connection</button>
            </form>
        </div>
        
        <?php if ($dbExists && $tablesExist): ?>
        <div class="section">
            <h3>✅ Setup Complete!</h3>
            <p>Your database is ready to use. You can now:</p>
            <ul>
                <li>Test the application form on your website</li>
                <li>View applications by visiting <a href="get_applications.php" class="code">get_applications.php</a></li>
                <li>Submit test applications through the form</li>
            </ul>
        </div>
        <?php endif; ?>
        
        <div class="section">
            <h3>🔗 Quick Links</h3>
            <a href="get_applications.php" class="button secondary">View Applications</a>
            <a href="profile.html" class="button secondary">Application Form</a>
            <a href="process_application.php" class="button secondary">API Test</a>
        </div>
    </div>
</body>
</html>