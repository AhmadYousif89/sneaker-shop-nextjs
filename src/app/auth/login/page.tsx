import { Login } from '@/components/auth/login';
import { AuthComponent } from '@/components/auth/auth';

export const metadata = {
	title: 'Sign-in | sneakers shop',
	description: 'Sneakers shop login page.'
};

const LoginPage = () => {
	return (
		<AuthComponent>
			<Login />
		</AuthComponent>
	);
};

export default LoginPage;
