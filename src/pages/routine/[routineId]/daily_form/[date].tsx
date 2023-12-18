import React, { useEffect } from 'react';
import style from "@/styles/routine/dailyForm.module.scss"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { allDataType } from '../../../../../types/types';
import { ObjectivesList } from '@/components/ObjectivesList/ObjectivesList';
import { TimeSelector } from '@/components/TimeSelector/TimeSelector';
import { format, setDate } from 'date-fns'
import { DayRating } from '@/components/DayRating/DayRating';

const dailyForm = () => {

    const [twoDayAfter, setTwoDayAfter] = useState(false)
    const currentDate = new Date()
    const router = useRouter()
    const { data: session } = useSession()
    const [allData, setAllData] = useState<null | allDataType>(null)
    const [formData, setFormData] = useState({
        morningHabit: "",
        eveningHabit: "",
        wakingUpHour: null,
        bedtimeHour: null,
        todoChecked1: false,
        todoChecked2: false,
        todoChecked3: false,
        todoChecked4: false,
        todoChecked5: false,
        notTodoChecked1: false,
        notTodoChecked2: false,
        notTodoChecked3: false,
        todoPriority: "",
        dayRating: "1",
        rightPath: false,
        diary: "",
        todo1: "",
        todo2: "",
        todo3: "",
        todo4: "",
        todo5: "",
    })

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
            setAllData(data)

            return { success: true, data: data }
        }
        catch (error) {
            // Gérer les erreurs
            console.error('Une erreur s\'est produite :', error);
            setAllData(null)
            return { success: false, error }
        }
    }


    useEffect(() => {
        if (!allData) {
            if (session && router) {
                fetchDailyForm()

            }
        }
    }, [session, router])

    useEffect(() => {
        console.log("blabla", allData)
        console.log(typeof allData?.dailyForm.date)
        if (typeof allData?.dailyForm.date !== "undefined") {
            const date = new Date(allData.dailyForm.date)
            const datePlus2 = new Date(date)
            datePlus2.setDate(date.getDate() + 2)
            if (currentDate > datePlus2) {
                setTwoDayAfter(true)
            }
        }



    }, [allData])


    function handleChange(name: string | null, value: string | Date | number | null) {

        if (name && value) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        console.log(formData)
        if (session) {
            const dataToFetch = {
                formData: formData,
                date: router.query.date,
                routineId: router.query.routineId,
                userId: session?.session.user.id
            }
        }

    }




    return (
        <div className={style.container}>
            {allData &&
                <form action="" className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.banner}>
                        <h1>Jour {allData.dailyForm.dayNumber}</h1>
                        <div className={style.date}>{format(new Date(allData.dailyForm.date), 'dd/MM/yyyy')}</div>
                    </div>

                    <div>
                        <div>
                            <h2>Les habitudes</h2>
                            <div>
                                <label htmlFor="morningHabit">Habitude du réveil</label>
                                <input type="checkbox" name='morningHabit' id='morningHabit' onChange={(e) => handleChange(e.target.name, e.target.value)} defaultChecked={allData.dailyForm.morningHabit} />
                            </div>
                            <div>
                                <label htmlFor="wakingUpHour">Heure du réveil </label>
                                {allData.dailyForm.wakingUpHour !== null && <span>{allData.dailyForm.wakingUpHour.getTime()}</span>}
                                {!twoDayAfter &&
                                    <TimeSelector name={"wakingUpHour"} handleFunction={handleChange} />
                                }

                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="eveningHabit">Habitude du soir</label>
                                <input type="checkbox" name='eveningHabit' id='eveningHabit' onChange={(e) => handleChange(e.target.name, e.target.value)} defaultChecked={allData.dailyForm.eveningHabit} />
                            </div>
                            <div>
                                <label htmlFor="bedtimeHour">Heure d'extinction des feux ce soir </label>
                                {allData.dailyForm.bedtimeHour !== null && <span>{allData.dailyForm.bedtimeHour.getTime()}</span>}
                                {!twoDayAfter &&
                                    <TimeSelector name={"bedtimeHour"} handleFunction={handleChange} />
                                }

                            </div>

                        </div>


                    </div>

                    <div>
                        <h2>Les tâches du jour</h2>
                        {
                            allData.dailyForm.todo1 ||
                                allData.dailyForm.todo2 ||
                                allData.dailyForm.todo3 ||
                                allData.dailyForm.todo4 ||
                                allData.dailyForm.todo5
                                ?
                                <div>
                                    <div>
                                        <input type="checkbox" defaultChecked={allData.dailyForm.todoChecked1} name='todoChecked1' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                        <input type="checkbox" defaultChecked={allData.dailyForm.todoChecked2} name='todoChecked2' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                        <input type="checkbox" defaultChecked={allData.dailyForm.todoChecked3} name='todoChecked3' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                        <input type="checkbox" defaultChecked={allData.dailyForm.todoChecked4} name='todoChecked4' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                        <input type="checkbox" defaultChecked={allData.dailyForm.todoChecked5} name='todoChecked5' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                    </div>
                                    <div>
                                        <div>
                                            <div>{allData.dailyForm.todo1}</div>
                                            <div>{allData.dailyForm.todo2}</div>
                                            <div>{allData.dailyForm.todo3}</div>
                                            <div>{allData.dailyForm.todo4}</div>
                                            <div>{allData.dailyForm.todo5}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>La priorité du jour</h3>
                                        <div>{allData.dailyForm.todoPriority}</div>
                                    </div>
                                </div>
                                :
                                <div>Aucune tâche prévu pour aujourd'hui</div>
                        }

                    </div>

                    {allData.dailyForm.notTodo1 || allData.dailyForm.notTodo2 || allData.dailyForm.notTodo3 &&
                        <div>
                            <h3>Les choses à ne pas faire aujourd'hui</h3>
                            <div>
                                <input type="checkbox" defaultChecked={allData.dailyForm.notTodoChecked1} name='notTodoChecked1' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                                <input type="checkbox" defaultChecked={allData.dailyForm.notTodoChecked2} name='notTodoChecked2' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                                <input type="checkbox" defaultChecked={allData.dailyForm.notTodoChecked3} name='notTodoChecked3' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                            </div>
                            <div>
                                <div>{allData.dailyForm.notTodo1}</div>
                                <div>{allData.dailyForm.notTodo2}</div>
                                <div>{allData.dailyForm.notTodo3}</div>
                            </div>
                        </div>
                    }


                    <div>
                        <h2>3 gratitudes</h2>
                        <div>
                            <div>
                                <label htmlFor="gratitude1">Je suis reconnaissant pour:</label>
                                <input type="text" value={allData.dailyForm.gratitude1} name='gratitude1' id='gratitude1' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                            </div>
                            <div>
                                <label htmlFor="gratitude2">Je suis reconnaissant pour:</label>
                                <input type="text" value={allData.dailyForm.gratitude2} name='gratitude2' id='gratitude2' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                            </div>
                            <div>
                                <label htmlFor="gratitude3">Je suis reconnaissant pour:</label>
                                <input type="text" value={allData.dailyForm.gratitude3} name='gratitude3' id='gratitude3' onChange={(e) => handleChange(e.target.name, e.target.value)} readOnly={twoDayAfter} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Note de satisfaction de la journée</h2>
                        <div>
                            <DayRating handleFunction={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="rightPath">Etes-vous honnêtement en train d'accomplir vos objectifs ?</label>
                        <input type="checkbox" defaultChecked={allData.dailyForm.rightPath} name='rightPath' onChange={(e) => handleChange(e.target.name, e.target.value)} disabled={twoDayAfter} />
                    </div>
                    <div>
                        <h2>Journal du jour</h2>
                        <textarea
                            id="diary"
                            name="diary"
                            defaultValue={allData.dailyForm.diary ? allData.dailyForm.diary : ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            readOnly={twoDayAfter}

                        />
                    </div>
                    {!twoDayAfter &&
                        <div>
                            <h2>Plannifiez vos actions de demain</h2>
                            <div>
                                <div>
                                    <h3>Les activités de demain</h3>
                                    <ObjectivesList handleFunction={handleChange} label={"Tâche"} name={"todo"} />
                                    <h3>La tâche à faire en priorité demain</h3>
                                    <select name="todoPriority" id="todoPriority">
                                        <option value={formData.todo1}>{formData.todo1}</option>
                                        <option value={formData.todo2}>{formData.todo2}</option>
                                        <option value={formData.todo3}>{formData.todo3}</option>
                                        <option value={formData.todo4}>{formData.todo4}</option>
                                        <option value={formData.todo5}>{formData.todo5}</option>

                                    </select>
                                </div>
                                <div>
                                    <h3>Les choses à ne pas faire demain</h3>
                                    <input
                                        type="text"
                                        name='notTodo1'
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />

                                    <input type="text"
                                        name='notTodo2'
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}

                                    />

                                    <input
                                        type="text"
                                        name='notTodo3'
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}

                                    />
                                </div>
                            </div>

                        </div>
                    }
                    {!twoDayAfter && <div><button type='submit'>Enregistrer</button></div>}



                </form>
            }
        </div>
    );
};

export default dailyForm

