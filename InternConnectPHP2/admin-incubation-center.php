<?php
// Include database configuration
require_once 'config.php';

// Start session for admin authentication (basic implementation)
session_start();

// Simple admin authentication check
if (!isset($_SESSION['admin_logged_in'])) {
    // Simple login form if not authenticated
    if (isset($_POST['admin_login'])) {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        // Simple hardcoded admin credentials (in production, use proper authentication)
        if ($username === 'admin@bic.edu.et' && $password === 'BIC_Admin_2025!') {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        } else {
            $login_error = "Invalid credentials";
        }
    }
    
    if (!isset($_SESSION['admin_logged_in'])) {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>BIC Admin Login</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                }
                .login-container {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    width: 100%;
                    max-width: 400px;
                }
                .login-form h2 {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    color: #333;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #374151;
                    font-weight: 500;
                }
                .form-group input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    box-sizing: border-box;
                }
                .login-btn {
                    width: 100%;
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                }
                .login-btn:hover {
                    background: #5a67d8;
                }
                .error-message {
                    color: #ef4444;
                    text-align: center;
                    margin-bottom: 1rem;
                    padding: 0.5rem;
                    background: #fef2f2;
                    border-radius: 4px;
                }
                .login-info {
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="login-container">
                <div class="login-form">
                    <h2><i class="fas fa-shield-alt"></i> BIC Admin Panel</h2>
                    <?php if (isset($login_error)): ?>
                        <div class="error-message"><?php echo htmlspecialchars($login_error); ?></div>
                    <?php endif; ?>
                    <form method="POST">
                        <div class="form-group">
                            <label>Admin Username</label>
                            <input type="text" name="username" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" required>
                        </div>
                        <button type="submit" name="admin_login" class="login-btn">Login</button>
                    </form>
                    <p class="login-info">Default credentials: admin@bic.edu.et / BIC_Admin_2025!</p>
                </div>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // Get statistics
    $statsSQL = "
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'reviewed' THEN 1 ELSE 0 END) as reviewed,
            SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM applications
    ";
    
    $statsStmt = $pdo->query($statsSQL);
    $stats = $statsStmt->fetch();
    
} catch (Exception $e) {
    $stats = [
        'total' => 0,
        'pending' => 0,
        'reviewed' => 0,
        'accepted' => 0,
        'rejected' => 0
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BIC Admin Dashboard - Application Management</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
            color: #333;
        }

        /* Header */
        .admin-header {
            background: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-left h1 {
            color: #1e293b;
            font-size: 1.5rem;
        }

        .subtitle {
            color: #64748b;
            font-size: 0.875rem;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .admin-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #64748b;
        }

        .logout-btn {
            background: #ef4444;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.875rem;
            transition: background 0.3s;
        }

        .logout-btn:hover {
            background: #dc2626;
        }

        /* Main Content */
        .admin-main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Statistics Cards */
        .stats-section {
            margin-bottom: 2rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }

        .stat-card.total .stat-icon {
            background: #dbeafe;
            color: #1d4ed8;
        }

        .stat-card.pending .stat-icon {
            background: #fef3c7;
            color: #d97706;
        }

        .stat-card.accepted .stat-icon {
            background: #dcfce7;
            color: #16a34a;
        }

        .stat-card.rejected .stat-icon {
            background: #fecaca;
            color: #dc2626;
        }

        .stat-info h3 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .stat-info p {
            color: #64748b;
            font-size: 0.875rem;
        }

        /* Controls Section */
        .controls-section {
            margin-bottom: 2rem;
        }

        .controls-container {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .filters {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .filter-group label {
            font-size: 0.875rem;
            color: #64748b;
        }

        .filter-group select,
        .filter-group input {
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.875rem;
        }

        .controls {
            display: flex;
            gap: 0.5rem;
        }

        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary {
            background: #3b82f6;
            color: white;
        }

        .btn-primary:hover {
            background: #2563eb;
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .btn-secondary:hover {
            background: #4b5563;
        }

        .btn-success {
            background: #10b981;
            color: white;
        }

        .btn-success:hover {
            background: #059669;
        }

        .btn-danger {
            background: #ef4444;
            color: white;
        }

        .btn-danger:hover {
            background: #dc2626;
        }

        .btn-small {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
        }

        /* Applications Section */
        .applications-section {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .section-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .section-header h2 {
            font-size: 1.25rem;
            color: #1e293b;
        }

        .bulk-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        /* Table */
        .table-container {
            overflow-x: auto;
        }

        .applications-table {
            width: 100%;
            border-collapse: collapse;
        }

        .applications-table th,
        .applications-table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }

        .applications-table th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
            font-size: 0.875rem;
        }

        .applications-table td {
            font-size: 0.875rem;
        }

        .application-row:hover {
            background: #f8fafc;
        }

        .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
        }

        .status-pending {
            background: #fef3c7;
            color: #92400e;
        }

        .status-reviewed {
            background: #dbeafe;
            color: #1e40af;
        }

        .status-accepted {
            background: #dcfce7;
            color: #166534;
        }

        .status-rejected {
            background: #fecaca;
            color: #991b1b;
        }

        .actions-cell {
            display: flex;
            gap: 0.25rem;
        }

        /* Added styles for application details modal */
        .application-details {
            max-height: 70vh;
            overflow-y: auto;
        }

        .detail-section {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .detail-section:last-child {
            border-bottom: none;
        }

        .detail-section h4 {
            color: #374151;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .detail-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .detail-label {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }

        .detail-value {
            font-size: 0.875rem;
            color: #374151;
            word-break: break-word;
        }

        .detail-value.long-text {
            background: #f8fafc;
            padding: 0.75rem;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
            margin-top: 0.5rem;
        }

        .portfolio-link {
            color: #3b82f6;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }

        .portfolio-link:hover {
            text-decoration: underline;
        }

        .status-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
        }

        /* Pagination */
        .pagination-container {
            padding: 1rem 1.5rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .pagination-info {
            color: #64748b;
            font-size: 0.875rem;
        }

        .pagination-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .page-info {
            color: #64748b;
            font-size: 0.875rem;
        }

        /* Loading and Notifications */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .loading-spinner {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
        }

        .loading-spinner i {
            font-size: 2rem;
            color: #3b82f6;
            margin-bottom: 1rem;
        }

        .notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1100;
            max-width: 400px;
        }

        .notification {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-left: 4px solid #3b82f6;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            border-left-color: #10b981;
        }

        .notification.error {
            border-left-color: #ef4444;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            margin-left: auto;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }

            .controls-container {
                flex-direction: column;
                align-items: stretch;
            }

            .filters {
                justify-content: center;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
     Notification Container 
    <div id="notificationContainer" class="notification-container"></div>
    
     Loading Overlay 
    <div id="loadingOverlay" class="loading-overlay">
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Processing...</p>
        </div>
    </div>

     Header 
    <header class="admin-header">
        <div class="header-content">
            <div class="header-left">
                <h1><i class="fas fa-graduation-cap"></i> BIC Admin Dashboard</h1>
                <span class="subtitle">Application Management System</span>
            </div>
            <div class="header-right">
                <div class="admin-info">
                    <i class="fas fa-user-shield"></i>
                    <span>Welcome, Admin</span>
                </div>
                <a href="?logout=1" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </a>
            </div>
        </div>
    </header>

     Main Content 
    <main class="admin-main">
         Statistics Cards 
        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card total">
                    <div class="stat-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo $stats['total']; ?></h3>
                        <p>Total Applications</p>
                    </div>
                </div>
                
                <div class="stat-card pending">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo $stats['pending']; ?></h3>
                        <p>Pending Review</p>
                    </div>
                </div>
                
                <div class="stat-card accepted">
                    <div class="stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo $stats['accepted']; ?></h3>
                        <p>Accepted</p>
                    </div>
                </div>
                
                <div class="stat-card rejected">
                    <div class="stat-icon">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3><?php echo $stats['rejected']; ?></h3>
                        <p>Rejected</p>
                    </div>
                </div>
            </div>
        </section>

         Filters and Controls 
        <section class="controls-section">
            <div class="controls-container">
                <div class="filters">
                    <div class="filter-group">
                        <label>Status Filter:</label>
                        <select id="statusFilter">
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="searchInput" placeholder="Search by name, email, or university...">
                    </div>
                </div>
                
                <div class="controls">
                    <button class="btn btn-primary" onclick="refreshApplications()">
                        <i class="fas fa-sync-alt"></i>
                        Refresh
                    </button>
                    <button class="btn btn-secondary" onclick="exportApplications()">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                </div>
            </div>
        </section>

         Applications Table 
        <section class="applications-section">
            <div class="section-header">
                <h2><i class="fas fa-list"></i> Applications Management</h2>
            </div>
            
            <div class="table-container">
                <table class="applications-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>University</th>
                            <th>Program</th>
                            <th>Year/GPA</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="applicationsTableBody">
                        <tr>
                            <td colspan="10" style="text-align: center; padding: 2rem;">
                                <i class="fas fa-spinner fa-spin"></i> Loading applications...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
             Pagination 
            <div class="pagination-container">
                <div class="pagination-info">
                    <span id="paginationInfo">Showing 0 of 0 applications</span>
                </div>
                <div class="pagination-controls">
                    <button class="btn btn-small" onclick="previousPage()" id="prevPageBtn" disabled>
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    <span class="page-info" id="pageInfo">Page 1 of 1</span>
                    <button class="btn btn-small" onclick="nextPage()" id="nextPageBtn" disabled>
                        Next <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    </main>

     Application Details Modal 
    <div id="applicationDetailsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Application Details</h3>
                <span class="close" onclick="closeApplicationDetails()">&times;</span>
            </div>
            <div class="modal-body">
                <div id="applicationDetailsContent" class="application-details">
                     Content will be loaded dynamically 
                </div>
            </div>
        </div>
    </div>

    <script>
        // Configuration
        const API_BASE_URL = '.';
        let currentPage = 1;
        let currentFilters = {};
        
        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            loadApplications();
            setupEventListeners();
        });
        
        function setupEventListeners() {
            // Search and filter events
            document.getElementById('searchInput').addEventListener('input', debounce(handleFilter, 500));
            document.getElementById('statusFilter').addEventListener('change', handleFilter);
        }
        
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        function handleFilter() {
            currentFilters = {
                search: document.getElementById('searchInput').value.trim(),
                status: document.getElementById('statusFilter').value
            };
            currentPage = 1;
            loadApplications();
        }
        
        async function loadApplications() {
            try {
                showLoading(true);
                
                const params = new URLSearchParams({
                    page: currentPage,
                    limit: 10,
                    ...currentFilters
                });
                
                const response = await fetch(`${API_BASE_URL}/get_applications.php?${params}`);
                const result = await response.json();
                
                if (result.success) {
                    displayApplications(result.data);
                    updatePagination(result.pagination);
                } else {
                    showNotification(result.message, 'error');
                    document.getElementById('applicationsTableBody').innerHTML = 
                        '<tr><td colspan="10" style="text-align: center; color: #ef4444;">Error loading applications</td></tr>';
                }
                
            } catch (error) {
                console.error('Error loading applications:', error);
                showNotification('Failed to load applications', 'error');
                document.getElementById('applicationsTableBody').innerHTML = 
                    '<tr><td colspan="10" style="text-align: center; color: #ef4444;">Network error occurred</td></tr>';
            } finally {
                showLoading(false);
            }
        }
        
        function displayApplications(applications) {
            const tbody = document.getElementById('applicationsTableBody');
            
            if (applications.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: #6b7280;">No applications found</td></tr>';
                return;
            }
            
            tbody.innerHTML = applications.map(app => `
                <tr class="application-row">
                    <td>${app.id}</td>
                    <td>${escapeHtml(app.full_name)}</td>
                    <td>${escapeHtml(app.email)}</td>
                    <td>${escapeHtml(app.phone || 'N/A')}</td>
                    <td>${escapeHtml(app.university)}</td>
                    <td>${escapeHtml(app.program)}</td>
                    <td>${escapeHtml(app.year_of_study || 'N/A')}${app.gpa ? ' / ' + app.gpa : ''}</td>
                    <td>
                        <span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span>
                    </td>
                    <td>${formatDate(app.created_at)}</td>
                    <td class="actions-cell">
                        <button class="btn btn-small btn-primary" onclick="viewApplicationDetails(${app.id})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-small btn-success" onclick="updateApplicationStatus(${app.id}, 'accepted')" title="Accept">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="updateApplicationStatus(${app.id}, 'rejected')" title="Reject">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
        
        async function viewApplicationDetails(id) {
            try {
                showLoading(true);
                
                const response = await fetch(`${API_BASE_URL}/get_applications.php?id=${id}`);
                const result = await response.json();
                
                if (result.success && result.data.length > 0) {
                    const app = result.data[0];
                    displayApplicationDetails(app);
                    document.getElementById('applicationDetailsModal').style.display = 'block';
                } else {
                    showNotification('Application not found', 'error');
                }
                
            } catch (error) {
                console.error('Error loading application details:', error);
                showNotification('Failed to load application details', 'error');
            } finally {
                showLoading(false);
            }
        }

        function displayApplicationDetails(app) {
            const content = document.getElementById('applicationDetailsContent');
            content.innerHTML = `
                <div class="detail-section">
                    <h4><i class="fas fa-user"></i> Personal Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Full Name</span>
                            <span class="detail-value">${escapeHtml(app.full_name)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">${escapeHtml(app.email)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Phone</span>
                            <span class="detail-value">${escapeHtml(app.phone || 'Not provided')}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Application Date</span>
                            <span class="detail-value">${formatDate(app.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4><i class="fas fa-graduation-cap"></i> Academic Background</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">University/Institution</span>
                            <span class="detail-value">${escapeHtml(app.university)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Study Program</span>
                            <span class="detail-value">${escapeHtml(app.program)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Year of Study</span>
                            <span class="detail-value">${escapeHtml(app.year_of_study || 'Not provided')}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">GPA/CGPA</span>
                            <span class="detail-value">${app.gpa ? app.gpa + '/4.0' : 'Not provided'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4><i class="fas fa-code"></i> Technical Skills & Portfolio</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Portfolio/GitHub</span>
                            <span class="detail-value">
                                ${app.portfolio_url ? 
                                    `<a href="${escapeHtml(app.portfolio_url)}" target="_blank" class="portfolio-link">
                                        <i class="fas fa-external-link-alt"></i> View Portfolio
                                    </a>` : 
                                    'Not provided'
                                }
                            </span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Programming Languages</span>
                        <div class="detail-value long-text">${escapeHtml(app.programming_languages || 'Not provided')}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Technologies & Frameworks</span>
                        <div class="detail-value long-text">${escapeHtml(app.technologies || 'Not provided')}</div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4><i class="fas fa-heart"></i> Motivation & Experience</h4>
                    <div class="detail-item">
                        <span class="detail-label">Why do you want to join our innovation team?</span>
                        <div class="detail-value long-text">${escapeHtml(app.motivation || 'Not provided')}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Relevant Experience</span>
                        <div class="detail-value long-text">${escapeHtml(app.experience || 'Not provided')}</div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4><i class="fas fa-clipboard-check"></i> Application Status</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Current Status</span>
                            <span class="detail-value">
                                <span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Updated</span>
                            <span class="detail-value">${formatDate(app.updated_at || app.created_at)}</span>
                        </div>
                    </div>
                    <div class="status-actions">
                        <button class="btn btn-success" onclick="updateApplicationStatus(${app.id}, 'accepted')">
                            <i class="fas fa-check"></i> Accept Application
                        </button>
                        <button class="btn btn-danger" onclick="updateApplicationStatus(${app.id}, 'rejected')">
                            <i class="fas fa-times"></i> Reject Application
                        </button>
                        <button class="btn btn-primary" onclick="updateApplicationStatus(${app.id}, 'reviewed')">
                            <i class="fas fa-eye"></i> Mark as Reviewed
                        </button>
                    </div>
                </div>
            `;
        }

        function closeApplicationDetails() {
            document.getElementById('applicationDetailsModal').style.display = 'none';
        }

        async function updateApplicationStatus(id, status) {
            try {
                showLoading(true);
                
                const response = await fetch(`${API_BASE_URL}/update_application_status.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, status })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showNotification(`Application ${status} successfully`, 'success');
                    loadApplications(); // Refresh the table
                    closeApplicationDetails(); // Close modal if open
                } else {
                    showNotification(result.message || 'Failed to update status', 'error');
                }
                
            } catch (error) {
                console.error('Error updating application status:', error);
                showNotification('Failed to update application status', 'error');
            } finally {
                showLoading(false);
            }
        }
        
        function updatePagination(pagination) {
            document.getElementById('paginationInfo').textContent = 
                `Showing ${pagination.per_page * (pagination.current_page - 1) + 1} to ${Math.min(pagination.per_page * pagination.current_page, pagination.total_records)} of ${pagination.total_records} applications`;
            
            document.getElementById('pageInfo').textContent = `Page ${pagination.current_page} of ${pagination.total_pages}`;
            
            document.getElementById('prevPageBtn').disabled = !pagination.has_prev;
            document.getElementById('nextPageBtn').disabled = !pagination.has_next;
        }
        
        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                loadApplications();
            }
        }
        
        function nextPage() {
            currentPage++;
            loadApplications();
        }
        
        function refreshApplications() {
            currentPage = 1;
            loadApplications();
            showNotification('Applications refreshed', 'success');
        }
        
        function viewApplication(id) {
            viewApplicationDetails(id);
        }
        
        function exportApplications() {
            showNotification('Export feature coming soon', 'info');
        }
        
        function showLoading(show) {
            document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
        }
        
        function showNotification(message, type = 'info', duration = 5000) {
            const container = document.getElementById('notificationContainer');
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-times-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };
            
            notification.innerHTML = `
                <i class="${icons[type]}"></i>
                <span>${escapeHtml(message)}</span>
                <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
            `;
            
            container.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        window.onclick = function(event) {
            const modal = document.getElementById('applicationDetailsModal');
            if (event.target === modal) {
                closeApplicationDetails();
            }
        }
    </script>
</body>
</html>
