import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '@/lib/regex';

export async function POST(req: NextRequest) {
	const body: RequestBody = await req.json();

	for (const key in body) {
		const input = key as keyof RequestBody;

		if (input === 'name') {
			const isValidName = NAME_REGEX.test(body.name);
			if (!isValidName) {
				return new NextResponse(JSON.stringify(null), {
					status: 422,
					statusText: 'name is not valid'
				});
			}
		}
		if (input === 'email') {
			const isValidEmail = EMAIL_REGEX.test(body.email);
			if (!isValidEmail) {
				return new NextResponse(JSON.stringify(null), {
					status: 422,
					statusText: 'email is not valid'
				});
			}
		}
		if (input === 'password') {
			const isValidPassword = PASSWORD_REGEX.test(body.password);
			if (!isValidPassword) {
				return new NextResponse(JSON.stringify(null), {
					status: 422,
					statusText: 'minimum 3 characters with 1 number and no spaces'
				});
			}
		}
	}

	const user = await prisma.user.findUnique({ where: { email: body.email } });

	if (user) {
		return new NextResponse(JSON.stringify(null), {
			status: 422,
			statusText: 'user already exist'
		});
	}

	const hash = await bcrypt.hash(body.password, 10);
	const data = { ...body, password: hash };

	const createdUser = await prisma.user.create({ data });
	const { password, ...newUser } = createdUser;

	return new NextResponse(JSON.stringify({ ...newUser, newUser: true }), {
		status: 201,
		statusText: 'register success'
	});
}
