import {createConnection} from 'typeorm';

import path from 'path';

export async function dbConnection() {
  await createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'lotr',
    entities: [path.join(__dirname, '../models/**/**')],
    synchronize: false, // If this value is set to true, the app will try to remake the whole table in the database
  });

  console.log('[Lord Of The Rings GraphQL] Database connected succesfully');
}
