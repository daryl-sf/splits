import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow cookies to be sent with requests
};

app.use(session({
  secret: process.env.JWT_SECRET, // Store your session secret in an environment variable
  resave: false, // Avoid resaving session if it's not modified
  saveUninitialized: false, // Avoid creating sessions until something is stored in it
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Store sessions in MongoDB
  cookie: {
    httpOnly: true, // Prevent JavaScript access to the cookie
    // secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (HTTPS)
    maxAge: 60 * 60 * 1000, // 1 hour session lifetime
  }
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use((req, _, next) => {
  req.io = io; // Attach the `io` instance to the request
  next();
});
app.use((req, _, next) => {
  console.log(`🚀 ${req.method} ${req.url}`);
  next();
});
app.use('/api', apiRoutes);
app.get('/healthcheck', (_, res) => {
  res.send('✅ Server is running');
});

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');
} catch (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}

server.listen(port, () => {
  console.log(`✅ Server is running on port ${port}: http://localhost:${port}`);
});

const io = new Server(server, { cors: corsOptions });

io.on('connection', (socket) => {
  console.log(`✅ New connection: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});
