const express = require('express');
const morgan = require('morgan');

const toursRoutes = require('./routes/tours');
const usersRoutes = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(toursRoutes);
app.use(usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running pn port ${PORT}`);
});
