import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismaDb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("not signed in");
  }

  const currentUser = await prismaDb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("not signed in");
  }

  return { currentUser };
};
export default serverAuth;
