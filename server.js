const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');  // Ensure this path is correct
//
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/familyDomain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering new user");
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
