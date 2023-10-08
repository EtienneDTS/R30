import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../db";

export default async function createRoutine(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.body);
        
        
    //     try {
    //         const user = await prisma.user.create({
    //             data: {
    //                 email: email,
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 userName: userName,
    //             },
    //         });


    //         res.status(201).json({ message: 'Utilisateur créé avec succès' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
    //     }
    // } else {
    //     res.status(405).end();
    }
}