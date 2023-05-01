import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export function POST(req: Request, res: Response) {
	const userCredentials = req.body;
	return NextResponse.json(userCredentials);
}

export function GET(req: NextRequest, res: NextResponse) {
	return NextResponse.json('login page');
}
