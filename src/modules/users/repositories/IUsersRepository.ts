import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

export interface IUsersRepository {
	createUser(data: ICreateUserDTO): Promise<IUser>;
	findById(id: number): Promise<IUser | undefined>;
	findByEmail(email: string): Promise<IUser | undefined>;
}