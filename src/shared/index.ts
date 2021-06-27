import Koa from 'koa';
import { usersRouter } from '../modules/users/http/routes/users.routes';

const app = new Koa();

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		console.error(error);
		ctx.type = 'json';
		ctx.status = 400;
		ctx.body = {
			error: error.message
		};
	}
});

app.use(usersRouter.routes());


app.listen(3000, () => {
	console.log('Server is on!');
});