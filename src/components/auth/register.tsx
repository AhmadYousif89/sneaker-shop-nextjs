'use client';
import Image from 'next/image';
import { Input } from '../ui/input';
import ToolTip from '../ui/tooltip';
import { Button } from '../ui/button';
import { AuthWrapper } from './auth-wrapper';
import { EmailIcon, LockIcon, SpinnerIcon, UserIcon } from '../icons';
import { useFormInputs, InputName } from '@/hooks/use-form-inputs';

import googleIcon from '../../../public/assets/icons/google.png';

export const Register = () => {
	const { inputForm, handleInputChange, validateForm } = useFormInputs([
		'name',
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
		id: nameId,
		value: enteredName,
		isValid: nameIsValid,
		errorMsg: nameErrMsg
	} = inputField.name;

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

	const nameHasError = !nameIsValid && nameErrMsg;
	const emailHasError = !emailIsValid && emailErrMsg;
	const passwordHasError = !passwordIsValid && passwordErrMsg;

	const userInputs = {
		name: enteredName,
		email: enteredEmail,
		password: enteredPassword
	};

	return (
		<AuthWrapper>
			{(handleSubmit: any, isSubmitting: boolean) => (
				<>
					<div className='space-y-4 text-center text-Dark_grayish_blue'>
						<h3 className='text-4xl font-bold capitalize'>create new account</h3>
						<p className='text-xl'>
							First time to our shop no worries, make your first account here
						</p>
					</div>

					<form
						onSubmit={e => handleSubmit(e, userInputs, validateForm)}
						className='grid w-11/12 max-w-2xl gap-20'>
						<div className='grid gap-12'>
							<fieldset className='relative'>
								{!nameIsValid && (
									<p className='absolute right-0 z-10 text-xl tracking-wide -top-10 text-rose-600'>
										{nameErrMsg}
									</p>
								)}

								<Input
									required
									type='text'
									id={nameId}
									name={nameId}
									variant={'auth'}
									placeholder='Name'
									value={enteredName}
									onChange={handleInputChange}
									wrapperStyle='relative flex items-center cursor-pointer'
									className={`${
										nameHasError ? 'ring-rose-500' : nameIsValid ? 'ring-green-500' : ''
									}`}>
									<span className='fake-placeholder'>Name</span>
									<span
										className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
											nameHasError
												? 'fill-rose-500'
												: nameIsValid
												? 'fill-green-500'
												: 'fill-Grayish_blue'
										}`}>
										<UserIcon />
									</span>
								</Input>
							</fieldset>

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
									name={passwordId}
									variant={'auth'}
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
						</div>

						<fieldset className='flex flex-col gap-8'>
							<Button
								hasRipple
								type='submit'
								variant={'secondary_orange'}
								onClick={() => validateForm()}
								className='py-6 shadow'>
								<span>SIGN UP</span>
								{isSubmitting && (
									<SpinnerIcon className='absolute z-10 -translate-y-1/2 right-10 top-1/2 ' />
								)}
							</Button>

							{/* DIVIDER */}
							<div className='relative flex items-center justify-center gap-4 my-8 group'>
								<span className='relative w-full h-px bg-Orange/50'>&nbsp;</span>
								<span className='absolute p-8 text-xl font-medium bg-white rounded-full text-Dark_grayish_blue/75'>
									Or register with
								</span>
							</div>

							<ToolTip tip={'Todo 🤔 maybe!'} renderCenter className='grid'>
								<Button
									hasRipple
									rippleColor='bg-Dark_grayish_blue'
									className='flex items-center justify-center gap-4 py-6 font-bold shadow ring-1 ring-Grayish_blue text-Dark_grayish_blue focus-visible:outline-offset-4'>
									<Image src={googleIcon} alt='google icon' className='w-8 h-8' />
									<span>google authentication</span>
								</Button>
							</ToolTip>
						</fieldset>
					</form>

					<p className='flex items-center gap-2 mt-16 text-xl text-Dark_grayish_blue'>
						<span className='px-4 font-semibold'>Don't have an account</span>
						<span className='text-4xl'>|</span>
						<Button href='/auth/login' variant={'login_logout'} className='text-Orange'>
							Sign In
						</Button>
					</p>
				</>
			)}
		</AuthWrapper>
	);
};
