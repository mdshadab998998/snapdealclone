// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// app.use(express.json());

// const JWT_SECRET = process.env.JWT_SECRET || '9af7a5962af5a46c0faa8a4a95d209f37cb3275b1173a8439019b3771498f8c26e8359ee08d19413ae479cc09094bebd0d5e87a0040c4580f9f69d25c6461122';

// // MongoDB connection
// mongoose.connect("mongodb+srv://mdshadabkhan4256:nEG6WiAkJv9TwDLj@cluster0.ilinvta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // User model
// const userSchema = new mongoose.Schema({
//   phoneNumber: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // Pre-save hook to hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const User = mongoose.model('User', userSchema);

// // Register route
// app.post('/auth/register', async (req, res) => {
//   const { phoneNumber, password } = req.body;
//   try {
//     const user = new User({ phoneNumber, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: 'Error registering user', details: err.message });
//   }
// });

// // Login route
// app.post('/auth/login', async (req, res) => {
//   const { phoneNumber, password } = req.body;
//   try {
//     const user = await User.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Register route
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || '9af7a5962af5a46c0faa8a4a95d209f37cb3275b1173a8439019b3771498f8c26e8359ee08d19413ae479cc09094bebd0d5e87a0040c4580f9f69d25c6461122';

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://mdshadabkhan4256:nEG6WiAkJv9TwDLj@cluster0.ilinvta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const cartSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
});
const CartItem = mongoose.model('CartItem', cartSchema);

app.get('/api/cart', async (req, res) => {
  const items = await CartItem.find();
  res.send(items);
});

app.post('/api/cart', async (req, res) => {
  const newItem = new CartItem(req.body);
  await newItem.save();
  res.send(newItem);
});

app.put('/api/cart/:id', async (req, res) => {
  const updatedItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedItem);
});

app.delete('/api/cart/:id', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/auth/register', async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const user = new User({ phoneNumber, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, user: { phoneNumber: user.phoneNumber } });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user', details: err.message });
  }
});

// Login route
app.post('/auth/login', async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { phoneNumber: user.phoneNumber } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Fetch user details route
app.get('/auth/me', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  