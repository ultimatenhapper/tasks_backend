const express = require("express");
const morgan = require('morgan');

const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
