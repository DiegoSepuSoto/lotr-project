import 'reflect-metadata';
import {dbConnection} from './config/typeorm';
import {startServer} from './app';

const PORT = 5000;

async function main() {
  console.log('Waiting 60 seconds for Postgresql to run');
  setTimeout(async () => {
    try {
      dbConnection();
      const app = await startServer();
      app.listen(PORT);
      console.log(`[Lord Of The Rings GraphQL] Running on port: ${PORT}`);
    } catch (error) {
      console.error(error);
    }
  }, 60000);
}

main();
