import { createConnection } from '../../../../../shared/infra/database/database';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUser } from '../../../entities/IUser';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

interface IUserDBO extends Omit<IUser, 'createdAt'> {
	created_at: IUser['createdAt'];
}

export class UsersRepository implements IUsersRepository {

	private parseDBOtoUser(user: IUserDBO): IUser {
		return Object.assign({ ...user, createdAt: user.created_at, created_at: undefined }, {});
	}

	async createUser({ email, firstname, lastname, password }: ICreateUserDTO): Promise<IUser> {
		const { client } = await createConnection();
		await client.query('insert into users(firstname, lastname, email, password) values ($1, $2, $3, $4)', [
			firstname,
			lastname,
			email,
			password
		]);
		const queryR = await client.query<IUserDBO>('select id, firstname, lastname, email, created_at from users where email = $1', [email]);
		return this.parseDBOtoUser(queryR.rows[0]);
	}

	async findById(id: number): Promise<IUser | undefined> {
		const { client } = await createConnection();
		const queryR = await client.query<IUserDBO>('select id, firstname, lastname, email, created_at from users where id = $1', [id]);
		if (queryR.rowCount === 0) return undefined;
		return this.parseDBOtoUser(queryR.rows[0]);
	}

	async findByEmail(email: string): Promise<IUser | undefined> {
		const { client } = await createConnection();
		const queryR = await client.query<IUserDBO>('select id, firstname, lastname, email, created_at from users where email = $1', [email]);
		if (queryR.rowCount === 0) return undefined;
		return this.parseDBOtoUser(queryR.rows[0]);
	}


}