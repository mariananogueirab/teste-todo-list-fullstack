require('dotenv').config();
const cors = require('cors');
const express = require('express');
const errorMiddleware = require('./middlewares/errorMidlleware');
const user = require('./routes/user.router');
const login = require('./routes/login.router');
const tasks = require('./routes/tasks.router');

const {PORT} = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', user);
app.use('/login', login);
app.use('/tasks', tasks);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = app;
