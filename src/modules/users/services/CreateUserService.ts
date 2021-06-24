import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class CreateUserService {

	constructor(
		private usersRepository: IUsersRepository
	) {
	}

	async execute(data: ICreateUserDTO): Promise<IUser> {
		if (await this.usersRepository.findByEmail(data.email)) {
			throw new Error('User already exists');
		}
		return (await this.usersRepository.createUser(data));
	}
}