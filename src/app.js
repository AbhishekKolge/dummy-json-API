require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
