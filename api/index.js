const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//User model
const User = require("./User");
const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable with fallback
const mongoURL = process.env.MONGODB_URL || 'mongodb+srv://fachintha9:P2nBOqHkCIW4jrkL@cluster0.tz08s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect with retry logic
const connectWithRetry = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

// API routes for get user data
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// API routes for create user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Listen to port 5000
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

