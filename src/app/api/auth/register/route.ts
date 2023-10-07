import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/shared/lib/prismadb';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email, name, password } = body;

  const userDb = await db.user.findFirst({ where: { email } });
  if (userDb)
    return NextResponse.json(
      { error: 'User already registered' },
      { status: 400 }
    );

  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword: bcrypt.hashSync(password, 10),
    },
  });

  return NextResponse.json(user);
};
