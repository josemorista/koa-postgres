import { createConnection } from './database';
import fs from 'fs/promises';
import path from 'path';

const migrationsPath = path.join(__dirname, 'migrations');

(async () => {
	const { client } = await createConnection();

	await client.query(`create table if not exists migrations (
		id serial not null primary key,
		name varchar not null unique,
		created_at timestamp default current_timestamp
	);`);

	const migrations = await fs.readdir(migrationsPath);

	for (const migration of migrations) {

		const migrationName = migration.split('.sql')[0];
		const alreadyExists = await client.query<{ id: number }>('select id from migrations where name like $1;', [migrationName]);

		if (alreadyExists.rows.length === 0) {
			const sql = await fs.readFile(path.join(migrationsPath, migration), { encoding: 'utf-8' });
			console.log(sql);
			await client.query(sql);
			await client.query('insert into migrations(name) values($1);', [migrationName]);
		}

	}

})().then(() => {
	console.log('Finished migrations');
}).catch(error => {
	console.error(error);
});