const express = require('express');
const session = require('express-session');
const formidable = require('express-formidable');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const app = express();


const mongouri = 'mongodb+srv://s1303280:Zrj20040128@cluster0.slqg3.mongodb.net/?appName=Cluster0';
const client = new MongoClient(mongouri);
const dbName = 'student_system';
const studentCollection = 'students';
const userCollection = 'users';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(formidable());
app.use(session({
  secret: 'comps381w-secret-key',
  resave: false,
  saveUninitialized: false
}));


const isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

// LOGIN/LOGOUT
app.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login', { error: null });  // FIXED: Pass error as null
});

app.post('/login', async (req, res) => {
  const { username, password } = req.fields;
  
  await client.connect();
  const db = client.db(dbName);
  const user = await db.collection(userCollection).findOne({ username });
  
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = { id: user._id, name: username };
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


app.get('/', isLoggedIn, (req, res) => {
  res.redirect('/students');
});

// List all students
app.get('/students', isLoggedIn, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = await db.collection(studentCollection).find().toArray();
  res.render('list', { students, user: req.session.user });
});

// Create student form
app.get('/students/create', isLoggedIn, (req, res) => {
  res.render('create', { user: req.session.user });
});

// Create student action
app.post('/students/create', isLoggedIn, async (req, res) => {
  const { studentId, name, email, phone, course } = req.fields;
  
  await client.connect();
  const db = client.db(dbName);
  
  const newStudent = {
    studentId,
    name,
    email,
    phone,
    course,
    createdAt: new Date()
  };
  
  await db.collection(studentCollection).insertOne(newStudent);
  res.redirect('/students');
});

// View student details
app.get('/students/:id', isLoggedIn, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const student = await db.collection(studentCollection).findOne({ 
    _id: new ObjectId(req.params.id) 
  });
  res.render('details', { student, user: req.session.user });
});

// Edit student form
app.get('/students/:id/edit', isLoggedIn, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const student = await db.collection(studentCollection).findOne({ 
    _id: new ObjectId(req.params.id) 
  });
  res.render('edit', { student, user: req.session.user });
});

// Update student action
app.post('/students/:id/update', isLoggedIn, async (req, res) => {
  const { studentId, name, email, phone, course } = req.fields;
  
  await client.connect();
  const db = client.db(dbName);
  
  await db.collection(studentCollection).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { studentId, name, email, phone, course, updatedAt: new Date() } }
  );
  
  res.redirect('/students');
});

// Delete student
app.get('/students/:id/delete', isLoggedIn, async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  await db.collection(studentCollection).deleteOne({ 
    _id: new ObjectId(req.params.id) 
  });
  res.redirect('/students');
});

// RESTFUL APIs
// GET all students
app.get('/api/students', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const students = await db.collection(studentCollection).find().toArray();
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch students' });
  }
});

// GET single student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    
    // Check if ID is valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: 'Invalid student ID format' });
    }
    
    const student = await db.collection(studentCollection).findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (student) {
      res.json({ success: true, data: student });
    } else {
      res.status(404).json({ success: false, error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch student' });
  }
});
// CREATE
app.post('/api/students', async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  
  const newStudent = {
    studentId: req.fields.studentId,
    name: req.fields.name,
    email: req.fields.email,
    phone: req.fields.phone,
    course: req.fields.course,
    createdAt: new Date()
  };
  
  const result = await db.collection(studentCollection).insertOne(newStudent);
  res.json({ 
    success: true, 
    message: 'Student created',
    id: result.insertedId 
  });
});

// READ
app.get('/api/students/:id', async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  
  const student = await db.collection(studentCollection).findOne({ 
    _id: new ObjectId(req.params.id) 
  });
  
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// UPDATE
app.put('/api/students/:id', async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  
  const updateData = {
    studentId: req.fields.studentId,
    name: req.fields.name,
    email: req.fields.email,
    phone: req.fields.phone,
    course: req.fields.course,
    updatedAt: new Date()
  };
  
  const result = await db.collection(studentCollection).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateData }
  );
  
  res.json({ 
    success: true, 
    message: 'Student updated',
    modifiedCount: result.modifiedCount 
  });
});

// DELETE
app.delete('/api/students/:id', async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  
  const result = await db.collection(studentCollection).deleteOne({ 
    _id: new ObjectId(req.params.id) 
  });
  
  res.json({ 
    success: true, 
    message: 'Student deleted',
    deletedCount: result.deletedCount 
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log('Running at http://localhost:3000');
  
  
  await client.connect();
  const db = client.db(dbName);
  
  const existingUser = await db.collection(userCollection).findOne({ username: 'admin' });
  if (!existingUser) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    await db.collection(userCollection).insertOne({
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date()
    });
    console.log('Default user created: admin/admin123');
  }
});


