import React, { useState, useEffect } from 'react';
import style from "./style.module.scss"
import { Value } from 'sass';

interface formData {
    objective1: string,
    objective2: string,
    objective3: string,
    objective4: string,
    objective5: string,
    why: string,
    objectiveRanking1: string,
    objectiveRanking2: string,
    objectiveRanking3: string,
    objectiveRanking4: string,
    objectiveRanking5: string,
    morningHabit: string,
    eveningHabit: string,
    name: string,
}


type NoteSelectorProps = {
    data: formData,
    handleFunction: (name: string, value: String) => void
}


export const NoteSelector: React.FC<NoteSelectorProps> = ({ data, handleFunction }) => {

    const [objectivesList, setObjectiveList] = useState([
        data.objective1,
        data.objective2,
        data.objective3,
        data.objective4,
        data.objective5,
    ])

    useEffect(() => {
        setObjectiveList([
            data.objective1,
            data.objective2,
            data.objective3,
            data.objective4,
            data.objective5,
        ]);
    }, [data]);

    const options = Array.from({ length: objectivesList.length }, (_, index) => index + 1);

    const [selectedOption, setSelectedOption] = useState<string[]>([])

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        const updatedSelectedOption = [...selectedOption, value];
        console.log(objectivesList[0], e.target.value)
        e.target.value = ""
        const allSelector = document.querySelectorAll(".selector")
        allSelector.forEach(selector => {
            if (selector instanceof HTMLSelectElement) {

                if (selector.value === value && selectedOption.includes(selector.value) && selector.value !== "") {
                    selector.value = ""
                }
            }
        })

        e.target.value = value
        if (value !== "") {
            const indexElement = selectedOption.indexOf(value)
            if (indexElement !== -1) {
                updatedSelectedOption.splice(indexElement, 1);
                updatedSelectedOption.push(value)
                setSelectedOption(updatedSelectedOption);
            }
            else {
                updatedSelectedOption.push(value)
                setSelectedOption(updatedSelectedOption);
            }
        }

        handleFunction(e.target.name, e.target.value)
    }

    return (
        <div>
            {objectivesList.map((objective, index) => (
                <div key={index}>
                    <h5>{objective}</h5>
                    <select id={`selector${index}`} onChange={(e) => handleChange(e)} className='selector' name={`objectiveRanking${index + 1}`}>
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