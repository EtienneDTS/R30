import React, { useEffect } from 'react';
import style from "@/styles/routine/dailyForm.module.scss"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';


const dailyForm = () => {

    const router = useRouter()
    const { data: session } = useSession()
    const [dailyFormData, setDailyFormData] = useState({})



    async function fetchDailyForm() {
        const dataToFetch = {
            date: router.query.date,
            routineId: router.query.routineId,
            userId: session?.session.user.id,

        }
        try {
            const response = await fetch('../../../../api/query/getDailyForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(dataToFetch)
            });

            if (!response.ok) {
                throw new Error(`Réponse inattendue : ${response.status}`);
            }

            const data = await response.json();
            setDailyFormData(data)

            return { success: true, data: data }
        }
        catch (error) {
            // Gérer les erreurs
            console.error('Une erreur s\'est produite :', error);
            return { success: false, error }
        }
    }


    useEffect(() => {
        if (session && router) {
            fetchDailyForm()
        }
    }, [session, router])

    useEffect(() => {
        console.log("blabla", dailyFormData)
    }, [dailyFormData])






    return (
        <div>

            <form action="">



            </form>
        </div>
    );
};

export default dailyForm

