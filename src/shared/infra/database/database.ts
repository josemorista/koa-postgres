import { Pool } from 'pg';

let client: Pool | null = null;

export const createConnection = async () => {

	if (!client) {
		const pool = new Pool({
			host: 'localhost',
			password: 'docker',
			port: 5432,
			user: 'postgres',
			database: 'koa-app'
		});
		await pool.connect();
		client = pool;
	}

	return { client };
};