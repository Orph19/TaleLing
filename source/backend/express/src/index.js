import 'dotenv/config';

import express from 'express';
import docsRoutes from './docs/docs.routes.js';
import usersRoutes from './api/users/users.routes.js';
import creditsRoutes from './api/credits/credits.routes.js';
import generationsRoutes from './api/generations/generations.routes.js' 

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});


app.use('/api/docs', docsRoutes);
app.use('/api/users', usersRoutes)
app.use('/api/credits',creditsRoutes)
app.use('/api/generations',generationsRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
