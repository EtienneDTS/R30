import React from 'react';
import { NoteSelector } from '@/components/NoteSelector/NoteSelector';
import { ObjectivesList } from '@/components/ObjectivesList/ObjectivesList';
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import style from "@/styles/routine/create.module.scss"

const create = () => {

    const { data: session } = useSession()
    interface FormDataTypes {
        objective1: string;
        objective2: string;
        objective3: string;
        objective4: string;
        objective5: string;
        why: string;
        objectiveRanking1: string;
        objectiveRanking2: string;
        objectiveRanking3: string;
        objectiveRanking4: string;
        objectiveRanking5: string;
        morningHabit: string;
        eveningHabit: string;
        name: string;

    }

    const [formData, setFormData] = useState<FormDataTypes>({
        objective1: "",
        objective2: "",
        objective3: "",
        objective4: "",
        objective5: "",
        why: "",
        objectiveRanking1: "",
        objectiveRanking2: "",
        objectiveRanking3: "",
        objectiveRanking4: "",
        objectiveRanking5: "",
        morningHabit: "",
        eveningHabit: "",
        name: "",

    })

    function handleChange(name: string | null, value: string | null, data?: any) {

        if (data) {
            setFormData(data)
        } else {
            if (name) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        }
    }

    async function fetchFormData(formData: FormDataTypes, userID: number, dates: object) {
        const dataToFetch = {
            formData: formData,
            userID: userID,
            dates: dates,
        }
        try {
            const response = await fetch('../api/createRoutine', {
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
            return { success: true, data }
        }
        catch (error) {
            // Gérer les erreurs
            console.error('Une erreur s\'est produite :', error);
            return { success: false, error }
        }
    }


    function handleSubmit(e: any) {
        e.preventDefault()

        if (session) {
            const userID = session.session.user.id
            const currentDate = new Date()
            const currentDatePlus30Days = new Date()
            currentDatePlus30Days.setDate(currentDatePlus30Days.getDate() + 30)

            const dates = { currentDate, currentDatePlus30Days }
            console.log(currentDate)

            fetchFormData(formData, userID, dates)
                .then((result) => {
                    if (result.success) {

                        console.log("Requête réussie", result.data);
                    } else {
                        console.log(result.error);
                    }
                })

        }










    }

    return (
        <div className={style.container} >

            <form className={style.formContainer} action="" method='POST' onSubmit={(e) => handleSubmit(e)}>
                <h1>Définir les objectifs du mois</h1>
                <p>Définir des objectifs mensuels est le meilleur moyen d'atteindre vos rêves et l'occasion de suivre votre progression. </p>
                <p>Il peut parfois être difficile de décider par où commencer. Voici quelques astuces pour vous aider à définir vos 5 objectifs du mois avec succès :</p>

                <h2>Utilisez le modèle SMART pour définir vos objectifs</h2>

                <ol>
                    <li>
                        <b>Spécifique :</b>Lorsque vous définissez un objectif, assurez-vous qu'il soit spécifique et clair. Évitez les objectifs vagues comme "être plus actif physiquement" et optez plutôt pour quelque chose de plus précis comme "Faire du Tennis". Plus votre objectif est précis, plus il sera facile de suivre votre progression.
                    </li>
                    <li>
                        <b>Mesurable : </b>Assurez-vous que vos objectifs puissent être mesurés. Par exemple, plutôt que de dire simplement "Faire du Tenis", fixez-vous l'objectif de "Faire du Tenis 3 fois par semaine pendant 1h".
                    </li>
                    <li>
                        <b>Atteignable :</b> Vos objectifs doivent être réalistes et réalisables dans le délai d'un mois.
                    </li>
                    <li>
                        <b>Relevant :</b> Vos objectifs devraient être pertinents par rapport à ce que vous souhaitez accomplir à long terme. Mesurez, découpez, quelles sont vos objectifs dans les 10 prochaines années ? Pour les atteindres quelle est la priorité cette année ? Mainteant découpez les en mois, et maintenant en maximum 5 objectifs pour réussir ce mois.
                    </li>
                    <li>
                        <b>Temporel :</b> Maintenant vous disposez d'un mois pour les accomplir
                    </li>
                </ol>

                <h2>Prennez de quoi écrire suivez ces étapes, et lorsque vous avez trouvé vos objectifs, écrivez-les ci dessous <span>(maximum 5)</span></h2>

                <ObjectivesList label="Objectif" name='objective' handleFunction={handleChange} />

                <h2>Utilisez la Règle des "5 POURQUOI ?"</h2>

                <p>Comprenez pourquoi vous voulez atteindre ces objectifs, la vrai raison.</p>
                <p>Posez-vous des question 5 fois à la suite en reprennant le pourquoi précédant, exemple :</p>
                <ul>
                    <li>
                        <h4>Pourquoi avez-vous défini ces objectifs personnels ?</h4>
                        <p>Parce que je veux améliorer ma vie de manière globale et atteindre un équilibre entre mes objectifs personnels et professionnels.</p>
                    </li>
                    <li>
                        <h4>Pourquoi voulez-vous améliorer votre vie de manière globale et atteindre un équilibre entre vos objectifs personnels et professionnels ?</h4>
                        <p>Parce que je veux être heureux, en bonne santé et réussir à la fois dans ma vie personnelle et ma carrière.</p>
                    </li>
                    <li>
                        <h4>Pourquoi voulez-vous être heureux, en bonne santé et réussir dans votre vie personnelle et professionnelle ?</h4>
                        <p>Parce que je crois que l'épanouissement personnel est essentiel pour une vie satisfaisante et que je veux réaliser mon plein potentiel.</p>
                    </li>
                    <li>
                        <h4>Pourquoi voulez-vous réaliser votre plein potentiel grâce à ces objectifs personnels ?</h4>
                        <p>Parce que je veux avoir un impact positif sur ma propre vie, ainsi que sur les personnes qui m'entourent et la société en général.</p>
                    </li>
                    <li>
                        <h4>Pourquoi voulez-vous avoir un impact positif grâce à la réalisation de ces objectifs personnels ?</h4>
                        <p>Parce que je trouve du sens et de la satisfaction dans la croissance personnelle et la contribution au bien-être collectif.</p>
                    </li>
                </ul>
                <div>
                    <label htmlFor="why">Maintenant definissez votre pourquoi</label>
                    <input type="text" id='why' name='why' placeholder='Trouver le One Piece et devenir le roi des pirates' onChange={(e) => handleChange(e.target.name, e.target.value)} required />
                </div>


                <h2>Maintenant pour chacun des objectifs attribuez un ordre de priorité. (1 étant l'objectif le plus important) </h2>
                <NoteSelector data={formData} handleFunction={handleChange} />

                <h1>Plannifiez vos habitudes</h1>

                <h2>Habitude manitale</h2>
                <p><b>Choisissez par quoi vous commencez la journée.</b> Les matins sont un moment idéal pour investir dans vous-même. Que ce soit par la lecture, l'apprentissage, la réflexion ou l'écoute du vidéo dans une autre langue, les habitudes matinales favorisent la croissance personnelle.</p>
                <label htmlFor="morningHabit">Votre habitude du matin : </label>
                <input type="text" id='morningHabit' name='morningHabit' onChange={(e) => handleChange(e.target.name, e.target.value)} required />

                <h2>Habitude du soir</h2>
                <p><b>L'occasion de vous préparer à dormir.</b> Une routine nocturne bien planifiée signale à votre corps qu'il est temps de se détendre et de se préparer à dormir. Cela favorise un sommeil de meilleure qualité. Alors prevoyez une activitez ne faisant appelle qu'à un seul sens comme la lecture, ou l'écoute d'un podcast.</p>
                <label htmlFor="eveningHabit">Votre habitude du soir : </label>
                <input type="text" id='eveningHabit' name='eveningHabit' onChange={(e) => handleChange(e.target.name, e.target.value)} required />

                <div>
                    <input type="checkbox" required />
                    <span>En cochant cette case vous vous engagez à tenir votre routine pour une durée d'un mois ainsi que remplir votre fiche journalière une fois par jour.</span>

                </div>

                <h2>Choisissez un nom pour votre routine.</h2>
                <p>Un nom peut transformer votre routine en un rituel personnel. Les rituels ont une signification et une symbolique profondes, ce qui peut rendre vos activités quotidiennes plus significatives et satisfaisantes.</p>
                <label htmlFor="name">Le nom de ma routine : </label>
                <input type="text" id='name' name='name' onChange={(e) => handleChange(e.target.name, e.target.value)} required />
                <div><button type='submit'>Créer ma routine</button></div>

            </form>
        </div>
    );
};

export default create;