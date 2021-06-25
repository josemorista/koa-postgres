export interface IUser {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;

	created_at: Date | string;
}