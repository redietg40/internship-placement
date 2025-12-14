# 🔧 InternConnect Application Form Troubleshooting Guide

## Issues Fixed

### 1. ✅ 405 Method Not Allowed Error
**Problem**: When accessing `update_application_status.php` directly in browser, you get "Method not allowed"
**Solution**: This is **CORRECT BEHAVIOR**. The endpoint only accepts POST requests with JSON data, not GET requests from browsers.
**Fix Applied**: Added GET request handling for testing/debugging purposes.

### 2. ✅ JSON Parsing Errors
**Problem**: JavaScript trying to parse PHP code as JSON
**Root Cause**: Server returning PHP source code instead of executing it
**Fix Applied**: 
- Enhanced error handling to detect when PHP code is returned
- Added clear error messages explaining the issue
- Improved debugging information

### 3. ✅ API Endpoint Configuration
**Problem**: Incorrect API base URL configuration
**Fix Applied**: 
- Updated `API_BASE_URL` to `"http://localhost/InternConnectPHP2"`
- Enhanced backend connection testing
- Added comprehensive error reporting

## How to Use the Fixed Application

### Step 1: Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Start **MySQL** service
4. Both should show green "Running" status

### Step 2: Access via Correct URL
**✅ Correct URL**: `http://localhost/InternConnectPHP2/profile.html`
**❌ Wrong URL**: `127.0.0.1:5501/profile.html` (Live Server)

### Step 3: Setup Database (First Time Only)
1. Go to: `http://localhost/InternConnectPHP2/create-database.php`
2. Click "Create Database" button
3. Click "Create Tables & Sample Data" button
4. Verify setup is complete

### Step 4: Test the Application
1. Go to: `http://localhost/InternConnectPHP2/test_api.html`
2. Run all test buttons to verify everything works
3. All tests should show green ✅ success messages

### Step 5: Submit Application
1. Go to: `http://localhost/InternConnectPHP2/profile.html`
2. Fill out the application form
3. Submit the application
4. You should see a success message

## Common Issues & Solutions

### Issue: "Server returned PHP/HTML instead of JSON"
**Cause**: Using Live Server instead of Apache
**Solution**: Use `http://localhost/InternConnectPHP2/` instead of `127.0.0.1:5501`

### Issue: "Cannot connect to server"
**Cause**: XAMPP Apache not running
**Solution**: Start Apache service in XAMPP Control Panel

### Issue: "Database error occurred"
**Cause**: MySQL not running or database not set up
**Solution**: 
1. Start MySQL in XAMPP
2. Run `create-database.php` to set up the database

### Issue: "Method not allowed" for update_application_status.php
**Cause**: This is normal behavior
**Solution**: The endpoint only accepts POST requests. Use the test page or application form.

## Testing Endpoints

### Application Processing
- **GET**: `http://localhost/InternConnectPHP2/process_application.php`
- **POST**: Submit application form data

### Status Updates
- **GET**: `http://localhost/InternConnectPHP2/update_application_status.php`
- **POST**: Update application status with JSON data

### View Applications
- **GET**: `http://localhost/InternConnectPHP2/get_applications.php`

## File Structure
```
InternConnectPHP2/
├── profile.html              # Main application form
├── process_application.php   # Handle form submissions
├── update_application_status.php # Update application status
├── get_applications.php      # Retrieve applications
├── create-database.php       # Database setup
├── config.php               # Database configuration
├── test_api.html            # API testing page
└── scriptsFolder/
    └── profile.js           # Form handling JavaScript
```

## Debug Information

The JavaScript now provides detailed console logging:
- `[v0] Form submission started`
- `[v0] Submitting application data: {...}`
- `[v0] Response status: 200`
- `[v0] Parsed response data: {...}`

Check browser console (F12) for detailed error information.

## Success Indicators

✅ **Working Correctly**:
- Form submits without errors
- Success notification appears
- Application data saved to database
- Console shows successful API calls

❌ **Still Has Issues**:
- Error notifications appear
- Console shows network errors
- Form doesn't submit
- Server returns PHP code instead of JSON

## Need Help?

1. Check the browser console (F12) for error messages
2. Use the test page: `http://localhost/InternConnectPHP2/test_api.html`
3. Verify XAMPP services are running
4. Ensure you're using the correct URL (Apache, not Live Server)
