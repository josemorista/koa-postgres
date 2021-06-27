import Router from 'koa-router';
import koaBody from 'koa-body';
import { UsersRepository } from '../../infra/pg/repositories/UsersRepository';
import { CreateUserService } from '../../services/CreateUserService';

const usersRouter = new Router({
	prefix: '/dev/users'
});

usersRouter.post('/', koaBody(), async (context) => {
	const usersRepository = new UsersRepository();
	const createUserService = new CreateUserService(usersRepository);
	context.status = 201;
	context.body = await createUserService.execute(context.request.body);
});

usersRouter.get('/:id', async (context) => {
	const usersRepository = new UsersRepository();
	context.response.headers['Content-Type'] = 'application/json';
	context.status = 200;
	context.body = await usersRepository.findById(Number(context.params.id));
});

export { usersRouter };