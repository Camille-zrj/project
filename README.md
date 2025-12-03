# Project info
Projectname: Student Management System
Student Name: ZHOU Ruijin 
SID: 13032809

# Project Overview
A simple web application for managing student records with authentication, CRUD operations, and RESTful APIs.

# Project Files
server.js: Main Express server with authentication, CRUD routes, and RESTful APIs
package.json: Dependencies: express, mongodb, ejs, express-session, bcryptjs
public/style.css: Basic styling for the application
views: EJS templates for all web pages
models/User.js: User model for authentication (simple MongoDB schema)

# Cloud Server URL


# Operation Guide

1. Login/Logout
- Visit the root URL or '/login'
- Use credentials: Username: 'admin', Password: 'admin123'
- After login, you'll be redirected to the students list
- Click "Logout" button in the header to logout

2. CRUD Web Pages
Create:Click "Add New Student" button → Fill form → Submit
Read:Students list displays automatically after login
Update:Click "Edit" next to any student → Modify → Submit
Delete: Click "Delete" next to any student → Confirm

3. RESTful APIs
Test these APIs using curl or Postman
