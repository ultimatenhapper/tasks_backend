const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const globalErrorHandler = require('./controllers/errorController');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP',
});
//Limit requests from same IP
app.use('/api', limiter);

//Security HTTP headers
app.use(helmet());

//Body parser
app.use(express.json({ limit: '10kb' }));

//Data sanitization NoSQL injection
app.use(mongoSanitize());
//Data sanitization XSS
app.use(xss());

//Avoiding parameter polution
app.use(
  hpp({
    whitelist: ['state', 'priority'],
  }),
);

//Serving static files
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
