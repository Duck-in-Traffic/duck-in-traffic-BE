const express = require('express');
const app = express();
// Routes and middleware
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const studios = require('./routes/studios');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');
const cors = require('cors');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5500'],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/users', users);
app.use('/api/v1/studios', studios);
app.use('/api/v1/scores', scores);
app.use('/api/v1/inventory', inventory);

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(notFound);
app.use(error);

module.exports = app;
