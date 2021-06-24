import Koa from 'koa';
import { usersRouter } from '../modules/users/http/routes/users.routes';

const app = new Koa();

app.use(usersRouter.routes());

app.on('error', (error) => {
	console.error('Server error', error);
});

app.listen(3333, () => {
	console.log('Server is on!');
});