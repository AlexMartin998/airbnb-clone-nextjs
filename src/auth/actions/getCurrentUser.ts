import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db, prismaExclude } from '@/shared/lib/prismadb';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: prismaExclude('User', ['hashedPassword']),
    });
    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
};
