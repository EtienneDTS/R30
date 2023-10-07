import React from 'react';
import { NoteSelector } from '@/components/NoteSelector/NoteSelector';

const create = () => {
    return (
        <div>
            <h1>Définir les objectifs du mois</h1>
            <form action="">
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

                <div>
                    <div>
                        <label htmlFor="objectif1">Objectif 1</label>
                        <input type="text" id='objectif1' name='objectif1' />
                    </div>

                    <div>
                        <label htmlFor="objectif2">Objectif 2</label>
                        <input type="text" id='objectif2' name='objectif2' />
                    </div>

                    <div>
                        <label htmlFor="objectif3">Objectif 3</label>
                        <input type="text" id='objectif3' name='objectif3' />
                    </div>

                    <div>
                        <label htmlFor="objectif4">Objectif 4</label>
                        <input type="text" id='objectif4' name='objectif4' />
                    </div>

                    <div>
                        <label htmlFor="objectif5">Objectif 5</label>
                        <input type="text" id='objectif5' name='objectif5' />
                    </div>
                </div>

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
                    <div>
                        <label htmlFor="why">Maintenant definissez votre pourquoi</label>
                        <input type="text" id='why' name='why'placeholder='Trouver le One Piece et devenir le roi des pirates'/>
                    </div>
                </ul>

                <h2>Maintenant pour chacun des objectifs attribuez un ordre de priorité. (1 étant l'objecitf le plus important) </h2>
                <NoteSelector objectivesList={["Faire du foot", "jouer a la console"]}/>



            </form>
        </div>
    );
};

export default create;