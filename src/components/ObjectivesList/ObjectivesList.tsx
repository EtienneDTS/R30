import { type } from 'os';
import React from 'react';

type ObjectivesListProps = {
    label: string,
    name: string,
    handleFunction: (name: string, value: string) => void
}

export const ObjectivesList: React.FC<ObjectivesListProps> = ({ label, name, handleFunction }) => {

    return (
        <div>
            <div>
                <label htmlFor={`${name}1`}>{label} 1</label>
                <input type="text" id={`${name}1`} name={`${name}1`} onChange={(e) => handleFunction(e.target.name, e.target.value)} />
            </div>


            <div>
                <label htmlFor={`${name}2`}>{label} 2</label>
                <input type="text" id={`${name}2`} name={`${name}2`} onChange={(e) => handleFunction(e.target.name, e.target.value)} />
            </div>




            <div>
                <label htmlFor={`${name}3`}>{label} 3</label>
                <input type="text" id={`${name}3`} name={`${name}3`} onChange={(e) => handleFunction(e.target.name, e.target.value)} />
            </div>

            <div>
                <label htmlFor={`${name}4`}>{label} 4</label>
                <input type="text" id={`${name}4`} name={`${name}4`} onChange={(e) => handleFunction(e.target.name, e.target.value)} />
            </div>

            <div>
                <label htmlFor={`${name}5`}>{label} 5</label>
                <input type="text" id={`${name}5`} name={`${name}5`} onChange={(e) => handleFunction(e.target.name, e.target.value)} />
            </div>
        </div>
    );
};

