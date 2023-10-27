import React from 'react';
import style from "./style.module.scss"

interface DayRating {
    handleFunction: (name: string | null, value:  string | null) => void
  }

export const DayRating:React.FC<DayRating> = ({handleFunction}) => {

    function handleClick(e:any) {
        const target = e.target as HTMLElement
        const value = target.getAttribute("data-value");
        const name = target.getAttribute("data-name");
        const element : HTMLElement | null  = document.querySelector(`.${style.selected}`)
        if(element) {
            element.classList.remove(style.selected);
        }
        target.classList.add(style.selected)
        handleFunction(name, value)


    }

    return (
        <div className={style.container}>
            
            <div className={style.numberContainer}>
                <div id='rate1' data-name="dayRating" data-value="1" onClick={(e)=>handleClick(e)}>1</div>
                <div id='rate2' data-name="dayRating" data-value="2" onClick={(e)=>handleClick(e)}>2</div>
                <div id='rate3' data-name="dayRating" data-value="3" onClick={(e)=>handleClick(e)}>3</div>
                <div id='rate4' data-name="dayRating" data-value="4" onClick={(e)=>handleClick(e)}>4</div>
                <div id='rate5' data-name="dayRating" data-value="5" onClick={(e)=>handleClick(e)}>5</div>
                <div id='rate6' data-name="dayRating" data-value="6" onClick={(e)=>handleClick(e)}>6</div>
                <div id='rate7' data-name="dayRating" data-value="7" onClick={(e)=>handleClick(e)}>7</div>
                <div id='rate8' data-name="dayRating" data-value="8" onClick={(e)=>handleClick(e)}>8</div>
                <div id='rate9' data-name="dayRating" data-value="9" onClick={(e)=>handleClick(e)}>9</div>
                <div id='rate10' data-name="dayRating" data-value="10" onClick={(e)=>handleClick(e)}>10</div>
            </div>
        </div>
    );
};

