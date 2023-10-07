import React from 'react';
import style from "./style.module.scss"



type NoteSelectorProps = {
    objectivesList: string[]
}


export const NoteSelector: React.FC<NoteSelectorProps> = ({ objectivesList }) => {
    const options = Array.from({ length: objectivesList.length }, (_, index) => index + 1);

    return (
        <div>
            {objectivesList.map((objective, index) => (
                <div key={index}>
                    <h5>{objective}</h5>
                    <select>
                        <option value="">Veillez choisir une note</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};