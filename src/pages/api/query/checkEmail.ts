import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function checkEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            res.status(200).json({ 
                exists: true,
                message: "Un utilisateur utilise déjà cette adresse email"
             });
        } else {
            res.status(200).json({ 
                exists: false,
                
             });
        }
    } else {
        res.status(405).end();
    }
}