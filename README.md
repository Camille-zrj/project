## Project info
Project name: Student Management System<br>
Student Name: ZHOU Ruijin<br> 
SID: 13032809<br>

## Project Overview
A web application for managing student records with authentication, CRUD operations, and RESTful APIs.<p>

## Project Files
### server.js
1. User Authentication: The application provides secure user authentication, 
including login, logout, and password.
2. CRUD & RESTful CRUD Operations: <br>
Create: User can create students' information.<br>
Read: View the list of students' information and the details.<br>
Update: Edit the information that the user created.<br>
Delete: Remove the information created incorrectly.<p>
### package.json
"ejs": "^3.1.9",<br>
"express": "^4.18.2",<br>
"express-session": "^1.17.3",<br>
"express-formidable": "^1.2.0",<br>
"mongodb": "^5.7.0",<br>
"bcryptjs": "^2.4.3"<p>
### public
style.css: Basic styling for the application<br>
### views
Includes create.ejs, details.ejs, edit.ejs, info.ejs, list.ejs, login.ejs.<br>
create.ejs - Form to create new student records<br>
details.ejs - Detailed view of individual student information<br>
edit.ejs - Form to edit existing student records<br>
info.ejs - Simple information/confirmation pages<br>
list.ejs - Dashboard showing all students with CRUD actions<br>
login.ejs - User login page with authentication form<p>
### models
User.js: User model for authentication (using MongoDB directly)

## Cloud Server URL
###https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net

## Operation Guide
###Login/Logout
- Visit the root URL or '/login'<br>
- Use credentials: Username: 'admin', Password: 'admin123'<br>
- After login, you'll be redirected to the students list<br>
- Click "Logout" button in the header to logout<p>

-Steps to login:
1. Navigate to the login page
2. Enter the username and password
3. Click the Login button

###CRUD Web Pages

-Create:Click "Add New Student" button → Fill form → Click "Create Student" button<br>
You'll be redirected back to the dashboard with the new student added.<br>
-Read:Students list displays automatically after login.<br>
View Details: Click "View" button next to any student to see complete details.<br>
-Update:Click "Edit" button next to any student → Modify → Click "Update Student" button<br>
You'll be redirected back to the student details page.<br>
Delete: Click "Delete" next to any student → Confirm<br>
The student will be removed from the system.<p>

###RESTful APIs

###Create:
Format:<br>
curl -X POST -F “studentId=studentId” -F "name=name" -F "email=email address" -F "phone=phone number" -F "course=course" https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students<p>
Example:<br>
curl -X POST -F “studentId=12345678” -F "name=John Doe" -F email=john@example.com -F "phone=12345678" -F "course=COMP S381F" https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students<br>

###Read:
format:<br>
curl -X GET https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/STUDENT_OBJECT_ID<p>
example:<br>
curl -X GET https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/6930100219ebc1c94d887364<br>

###Update:
format:<br>
curl -X PUT -F "name=John Updated" -F "email=john.new@example.com" https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/STUDENT_OBJECT_ID<p>
example:<br>
curl -X PUT -F "name=John Updated" -F "email=john.new@example.com" https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/6930100219ebc1c94d887364<br>

###Delete:
Format:<br>
curl -X DELETE  https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/STUDENT_OBJECT_ID<p>
Example:<br>
curl -X DELETE  https://system-a2htgmckdpbneegk.southafricanorth-01.azurewebsites.net/api/students/6930100219ebc1c94d887364<p>
<br>

https://github.com/Camille-zrj/project
