import express, { type NextFunction } from 'express';
import recipeRoutes from './routes/recipes.js';
import { connectDb } from './db/connection.js';
import { initDb } from './db/schema.js';

const app = express();
const port = 3000;

app.use(express.json());
//getting the routes from recipes.ts
app.use("/", recipeRoutes);

await connectDb();
await initDb();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});