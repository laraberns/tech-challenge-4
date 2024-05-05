const express = require('express');
const cors = require('cors');
const app = express();
const userRouters = require('./routes/user');
const quadraRouters = require('./routes/quadra');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouters);
app.use('/api/quadras', quadraRouters);

app.listen(8081, () => console.log('server is running on 8081'));
