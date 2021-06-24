create table if not exists users (
	id serial not null primary key,
	firstname varchar not null,
	lastname varchar not null,
	email varchar(255) not null unique,
	password varchar not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp
);