import React from 'react';
import style from "./style.module.scss"
import { useState } from 'react';

interface TimeSelectorPorps {
    name: string,
    handleFunction: (name: string, value: Date) => void
}

export const TimeSelector : React.FC<TimeSelectorPorps> = ({name, handleFunction}) => {
    
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    function handleChange(e:any, name: string) {
        const hour : any = document.getElementById(`hour${name}`)
        const minute: any = document.getElementById(`minutes${name}`)
        
        
        if (hour && minute) {
            console.log(hour, minute)
            const date = new Date()
            date.setHours(parseInt(hour.value))
            date.setMinutes(parseInt(minute.value))
            handleFunction(name, date)
            console.log(date)
        }
    }

    return (
        <div className={style.hourContainer}>
            <select name="hour" id={`hour${name}`} onChange={(e)=>handleChange(e, name)} >
            <option value="00">00</option>
            {hourOptions.map((hour) => (
                <option key={hour} value={hour}>
                    {hour}
                </option>
            ))}
            </select>
            <div>h</div>
            <select name="minutes" id={`minutes${name}`} onChange={(e)=>handleChange(e, name)}>
                <option value="00">00</option>
                {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                        {minute}
                    </option>
                ))}
            </select>
        </div>
    );
};

