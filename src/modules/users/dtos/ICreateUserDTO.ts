import { IUser } from '../entities/IUser';

export type ICreateUserDTO = Omit<IUser, 'id' | 'createdAt'>