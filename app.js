const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

// Handling unknown requests
app.all('*', (req, res, next) => {
  const err = new Error(`Can´t find ${req.originalUrl} on this server!`, 404);

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
