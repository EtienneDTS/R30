import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db"



export default async function getDailyForm(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = req.body
        let dailyForm
        let user
        let routine
        let objectives

        const urlDate = new Date(`${data.date}`)
        console.log(urlDate)



        console.log(data)

        try {
            dailyForm = await prisma.dailyForm.findFirst({
                where: {
                    AND: [{ date: urlDate }, { routineId: parseInt(data.routineId) }]
                }
            })
            console.log(dailyForm)

        } catch (error) {
            console.log("bug1")
            return res.status(404).json({ success: false, error: "DailyForm non trouvé" });
        }

        try {
            routine = await prisma.routine.findUnique({
                where: {
                    id: parseInt(data.routineId)
                }
            })

        } catch (error) {
            console.log("bug2")
            return res.status(404).json({ success: false, error: "routine non trouvé" });
        }

        try {
            user = await prisma.user.findUnique({
                where: {
                    id: parseInt(data.userId)
                }
            })
            console.log(user)
            
        } catch (error) {
            console.log("bug3")
            return res.status(404).json({ success: false, error: "routine non trouvé" });
        }

        if (routine) {
            try {
                objectives = await prisma.objectives.findUnique({
                    where: {
                        id: routine.objectivesId
                    }
                })

            } catch (error) {
                console.log("bug4")
                return res.status(404).json({ success: false, error: "routine non trouvé" });
            }
        }



        return res.json({ dailyForm: dailyForm, routine: routine, user: user, objectives: objectives });

    }
}