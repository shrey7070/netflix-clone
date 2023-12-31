import bcrypt from "bcrypt";
import { NextApiResponse, NextApiRequest } from "next";
import prismaDB from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  try {
    const { email, password, name } = req.body;
    const existingUser = await prismaDB.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaDB.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        name,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
