const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySuperSecretKey123"; 

mongoose.connect('mongodb://localhost:27017/auth');
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', () => {
  console.log("Connection Succeeded");
});

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// SIGN UP with bcrypt password hashing
app.post('/sign_up', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    const data = {
      name: name,
      email: email,
      password: hashedPassword
    };

    await db.collection('details').insertOne(data);
    console.log("Record inserted Successfully with hashed password!");

    return res.redirect('signup_success.html');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// LOGIN with bcrypt + JWT
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    const user = await db.collection('details').findOne({ email: email });

    if (!user) {
      console.log("User not found!");
      return res.redirect('login_fail.html');
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      console.log("Incorrect password!");
      return res.redirect('login_fail.html');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login Successful! Token:", token);

    // We can send token in response or store in cookie
    res.json({ message: "Login Successful", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/', (req, res) => {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  return res.redirect('index.html');
}).listen(4000, () => {
  console.log("Server listening on port 4000");
});
