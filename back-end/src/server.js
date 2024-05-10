const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const userRouters = require('./routes/user');
const quadraRouters = require('./routes/quadra');
const reservaRouters = require('./routes/reserva');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouters);
app.use('/api/quadras', quadraRouters);
app.use('/api/reservas', reservaRouters);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

const PORT = 8081;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
