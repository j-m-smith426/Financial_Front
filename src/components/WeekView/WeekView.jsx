import React from 'react';
import { startOfWeek, add } from 'date-fns';
import DayBlock from '../DayBlock/DayBlock';
import { useGetBillsByDateQuery } from "../../util/store/billApi";

import "./WeekView.css"
import { formatDate } from '../../util/functions/FormatDate';
import { useDispatch, useSelector } from 'react-redux';

const WeekView = (props) => {

    const selectedDay = useSelector((state) => new Date(state.pageReducer.selectedDay));
    const weekRange = [startOfWeek(selectedDay, { weekStartsOn: 1 })];
    const dispatch = useDispatch();
    for (let index = 1; index < 7; index++) {
        weekRange.push(add(weekRange[0], { days: index }));
    
    }
    
    
    const { data = [] } = useGetBillsByDateQuery([formatDate(weekRange[0]), formatDate(add(weekRange[0], { days:6}))
    ]);

    const result = SortResult(data);
    function countBills(date) {
        
        for (let i = 0; i < result.length; i++){
            const resultDate = result[i][0].date.split('-')[2];
            const currentDate = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
            if (currentDate === ''+resultDate) {
                let length = result[i].length
                let sum = 0;
                for (let j of result[i]) {
                    sum += j.amount;
                }
                return (
                    <>
                        {length}  Bills, <strong>Total</strong>: ${sum}
                </>
            )
        }
        }
        return (
            <>
                0 Bills, <strong>Total</strong>: $0.00
            </>
        );
    }

    const handleDayClick = (clickedDate) => {
        dispatch({
            type: "SelectedDay",
            payload: clickedDate.toISOString()
          });
        dispatch({
            type: "Page",
            payload: "Day"
        })
    }

  return (
      <div>
       {weekRange.map((date) => (
           
           <DayBlock key={date.getDate()}>
               <div onClick={() => handleDayClick(date)} className="day_block" key={date.getDate()}>

               <p>
                   {date.toDateString()}
               </p>

               <ul>
                   <li>{countBills(date)}</li>
               </ul>
               </div>
</DayBlock>
))
}
{/* {error.data && error.data} */}
    </div>
  );
}

export default WeekView;
function SortResult(data) {
    if (data.length === 0) {
        return [];
    }
    const result = [];
    let placeholder = [];
    let currentDate = data[0] && data[0].date;
    for (let i = 0; i < data.length; i++) {
        if (data[i].date === currentDate) {
            placeholder.push(data[i]);
        } else {
            result.push(placeholder);
            placeholder = [];
            placeholder.push(data[i]);
            currentDate = data[i].date;
        }
        if (i + 1 === data.length) {
            result.push(placeholder);
        }
    }
    return result;
}

