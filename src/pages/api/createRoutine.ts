import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../db";


export default async function createRoutine(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const data = req.body.formData
        for (const key in data) {
            if (typeof data[key] === 'string' && data[key] === '') {
                data[key] = null;
            }
        }

        data.id = req.body.userID
        data.currentDate = req.body.dates.currentDate
        data.dateEnd = req.body.dates.currentDatePlus30Days

        const user = await prisma.user.findUnique({
            where: {
                id: data.id
            }
        })
        if (!user) {
            return res.status(404).json({ success: false, error: "Utilisateur non trouvé" });
        }

        const currentUserRoutine = await prisma.routine.findFirst({
            where: {
                AND: [{ finished: false }, { userId: data.id }]
            }
        })

        if (currentUserRoutine) {
            return res.status(400).json({ success: false, error: "Une routine est en cour." });
        }


        let newObjectives;
        try {
            newObjectives = await prisma.objectives.create({
                data: {
                    objective1: data.objective1,
                    objective2: data.objective2,
                    objective3: data.objective3,
                    objective4: data.objective4,
                    objective5: data.objective5,
                    objectiveRanking1: parseInt(data.objectiveRanking1),
                    objectiveRanking2: parseInt(data.objectiveRanking2),
                    objectiveRanking3: parseInt(data.objectiveRanking3),
                    objectiveRanking4: parseInt(data.objectiveRanking4),
                    objectiveRanking5: parseInt(data.objectiveRanking5),
                    morningHabit: data.morningHabit,
                    eveningHabit: data.eveningHabit
                }
            })
        } catch (error) {
            console.error("erreur lors de la creation des objets,", error)
            return res.status(404).json({ success: false, error: "La création des objectifs à échoué" });
        }

        let newRoutine

        try {

            newRoutine = await prisma.routine.create({
                data: {
                    name: data.name,
                    dateStart: data.currentDate,
                    dateEnd: data.dateEnd,
                    why: data.why,
                    userId: data.id,
                    objectivesId: newObjectives.id
                }
            })


        } catch (error) {
            await prisma.objectives.delete({ where: { id: newObjectives.id } })
            return res.status(500).json({ success: false, error: "Erreur interne du serveur" })
        }


        let dailyDate: Date = new Date(data.currentDate)
        for (let i = 0; i < 30; i++) {
            dailyDate.setDate(dailyDate.getDate() + i)
            try {
                await prisma.dailyForm.create({
                    data: {
                        date: dailyDate,
                        dayNumber: i + 1,
                        routineId: newRoutine.id
                    }
                })
            } catch (error) {
                await prisma.objectives.delete({ where: { id: newObjectives.id } })
                return res.status(404).json({ success: false, error: "La création des formulaires à échoué" });
            }

        }

        res.json({ success: true, message: "Requête réussie" });
    }
}