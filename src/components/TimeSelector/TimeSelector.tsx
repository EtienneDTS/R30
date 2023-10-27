import React from 'react';
import style from "./style.module.scss"

interface TimeSelectorPorps {
    name: string,
    handleFunction: (name: string, value: Date) => void
}

export const TimeSelector : React.FC<TimeSelectorPorps> = ({name, handleFunction}) => {
    const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    function handleChange(name: string) {
        const hour : any = document.getElementById(`hour${name}`)
        const minutes: any = document.getElementById(`minutes${name}`)
        if (hour && minutes) {
            const date = new Date()
            date.setHours(parseInt(hour.value))
            date.setMinutes(parseInt(minutes.value))
            handleFunction(name, date)
        }
    }

    return (
        <div className={style.hourContainer}>
            <select name="hour" id={`hour${name}`} onChange={()=>handleChange(name)}>
                {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select>
            <div>h</div>
            <select name="minutes" id={`minutes${name}`} onChange={()=>handleChange(name)}>
                {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                        {minute}
                    </option>
                ))}
            </select>
        </div>
    );
};

