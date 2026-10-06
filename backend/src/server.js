require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`API sur http://localhost:${port}/api`);
    });
  } catch (err) {
    console.error('Démarrage impossible :', err.message);
    process.exit(1);
  }
}

start();