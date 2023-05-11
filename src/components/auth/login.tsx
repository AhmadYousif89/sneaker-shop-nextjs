'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AuthWrapper, SubmitHandler } from './auth-wrapper';
import { EmailIcon, LockIcon, SpinnerIcon } from '../icons';
import { InputName, useFormInputs } from '@/hooks/use-form-inputs';
import { GoogleButton } from './google-btn';
import { SwitchForm } from './switch-form';
import { cm } from '@/lib/class-merger';

export const Login = () => {
	const { inputForm, handleInputChange, validateForm } = useFormInputs([
		'email',
		'password'
	]);

	const inputField = inputForm.reduce(
		(
			inputObj: Record<
				InputName,
				{ id: string; value: string; isValid: boolean; errorMsg: string }
			>,
			curInput
		) => {
			const id = curInput.id;
			const value = curInput.value;
			const isValid = curInput.isValid;
			const errorMsg = curInput.errorMsg;
			inputObj[id] = { id, value, isValid, errorMsg };
			return inputObj;
		},
		{
			name: { id: '', value: '', isValid: false, errorMsg: '' },
			email: { id: '', value: '', isValid: false, errorMsg: '' },
			password: { id: '', value: '', isValid: false, errorMsg: '' }
		}
	);

	const {
		id: emailId,
		value: enteredEmail,
		isValid: emailIsValid,
		errorMsg: emailErrMsg
	} = inputField.email;

	const {
		id: passwordId,
		value: enteredPassword,
		isValid: passwordIsValid,
		errorMsg: passwordErrMsg
	} = inputField.password;

	const emailHasError = !emailIsValid && emailErrMsg;
	const passwordHasError = !passwordIsValid && passwordErrMsg;

	const userInputs = {
		email: enteredEmail,
		password: enteredPassword
	};

	return (
		<AuthWrapper>
			{(handleSubmit, isSubmitting, serverErrMsg) => (
				<>
					<div className='space-y-4 text-center text-Dark_grayish_blue'>
						<h3 className='text-4xl font-bold capitalize'>login to your account</h3>
						<p className='text-xl '>
							The faster you login the faster you get back to your sneakers
						</p>
					</div>

					<form
						onSubmit={e =>
							handleSubmit(e, userInputs as RequestBody, validateForm, 'login')
						}
						className='grid w-11/12 max-w-2xl gap-16'>
						<div className='grid gap-12'>
							<fieldset className='relative'>
								{!emailIsValid && (
									<p className='absolute right-0 z-10 text-xl tracking-wide -top-10 text-rose-600'>
										{emailErrMsg}
									</p>
								)}

								<Input
									required
									type='text'
									id={emailId}
									name={emailId}
									variant={'auth'}
									placeholder='Email'
									autoComplete={'email'}
									value={enteredEmail}
									onChange={handleInputChange}
									wrapperStyle='relative flex items-center cursor-pointer'
									className={`${
										emailHasError ? 'ring-rose-500' : emailIsValid ? 'ring-green-500' : ''
									}`}>
									<span className='fake-placeholder'>Email</span>
									<span
										className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
											emailHasError
												? 'fill-rose-500'
												: emailIsValid
												? 'fill-green-500'
												: 'fill-Grayish_blue'
										}`}>
										<EmailIcon />
									</span>
								</Input>
							</fieldset>

							<fieldset className='relative'>
								{!passwordIsValid && (
									<p className='absolute right-0 z-10 text-xl tracking-wide -top-10 text-rose-600'>
										{passwordErrMsg}
									</p>
								)}

								<Input
									required
									type='password'
									id={passwordId}
									variant={'auth'}
									name={passwordId}
									value={enteredPassword}
									placeholder={'Password'}
									onChange={handleInputChange}
									wrapperStyle='relative flex items-center cursor-pointer'
									className={`${
										passwordHasError
											? 'ring-rose-500'
											: passwordIsValid
											? 'ring-green-500'
											: ''
									}`}>
									<span className='fake-placeholder'>Password</span>
									<span
										className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
											passwordHasError
												? 'fill-rose-500'
												: passwordIsValid
												? 'fill-green-500'
												: 'fill-Grayish_blue'
										}`}>
										<LockIcon />
									</span>
								</Input>
							</fieldset>

							<fieldset className='flex items-center justify-between mx-4'>
								<Input
									name='persist'
									required={false}
									type={'checkbox'}
									wrapperStyle={cm([
										'flex items-center gap-4 cursor-pointer p-2 rounded-md',
										'focus-within:ring-2 focus-within:ring-Orange'
									])}>
									<p className='text-xl font-bold text-Grayish_blue hover:text-Orange/75'>
										keep me logged in
									</p>
								</Input>

								<Button className='p-2 rounded lg:text-xl text-Grayish_blue hover:text-Orange/75 focus-visible:outline-Orange'>
									Recover password
								</Button>
							</fieldset>
						</div>

						<fieldset className='relative flex flex-col gap-8'>
							<small
								className={cm([
									'absolute left-1/2 -translate-x-1/2 w-full px-16',
									'text-xl text-red-500 font-semibold text-center tracking-wide',
									'transition-[opacity,transform]  duration-300 ease-in-out',
									serverErrMsg
										? '-translate-y-10 opacity-100 visible'
										: '-translate-y-0 opacity-0 invisible'
								])}>
								{serverErrMsg}
							</small>

							<Button
								hasRipple
								type='submit'
								variant={'secondary_orange'}
								onClick={() => validateForm()}
								className='py-6 shadow'>
								<span>SIGN IN</span>
								{isSubmitting && (
									<SpinnerIcon className='absolute z-10 -translate-y-1/2 right-10 top-1/2 ' />
								)}
							</Button>

							{/* DIVIDER */}
							<div className='relative flex items-center justify-center gap-4 my-8 group'>
								<span className='relative w-full h-px bg-Orange/50'>&nbsp;</span>
								<span className='absolute p-8 text-xl font-bold bg-white rounded-full text-Dark_grayish_blue/75'>
									OR
								</span>
							</div>

							<GoogleButton />
						</fieldset>
					</form>

					<SwitchForm href='/auth/register' message='You know what, let me' />
				</>
			)}
		</AuthWrapper>
	);
};
