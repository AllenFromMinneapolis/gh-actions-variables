import bodyParser from 'body-parser';
import express from 'express';
import connectToDatabase from './database.js';
import eventRoutes from './routes/events.js';

const app = express();

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;

    app.use(bodyParser.json());

    // Pass the db instance to the routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use(eventRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server due to database connection issues:', error);
  }
}

startServer();


