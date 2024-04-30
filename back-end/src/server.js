const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouters = require('./routes/user');
app.use('/api/users', userRouters);

app.listen(8081, () => console.log('server is running on 8081'));
