import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, firstName, lastName, password } = req.body;
        const userName = `${firstName} ${lastName.charAt(0)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    userName: userName,
                },
            });


            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
        }
    } else {
        res.status(405).end();
    }
}