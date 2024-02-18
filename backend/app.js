const express = require('express');
const globalErrorHandler = require('./controllers/errorController');
const authRouter = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to kanban server');
});

app.get('/api/v1/', (req, res) => {
  return res.status(200).send('Explore the version 1 on kanban server.');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);

app.get('*', (req, res, next) => next(new Error('Not Found')));

// gloabl error handler
app.use(globalErrorHandler);

module.exports = app;
