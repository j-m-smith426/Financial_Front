import React from 'react';
import { startOfWeek, add } from 'date-fns';
import DayBlock from '../DayBlock/DayBlock';

const WeekView = (props) => {

    const selectedDay = props.day;
    const weekRange = [startOfWeek(selectedDay, {weekStartsOn: 1})];
for (let index = 1; index < 7; index++) {
    weekRange.push(add(weekRange[0], {days: index}));
    
    }
  return (
    <div>
       {weekRange.map((date) => (

<DayBlock key={date.getDate()}>
               <p>
                   {date.toDateString()}
               </p>

               <ul>
                   <li>0 Bills, <strong>Total</strong>: $0.00</li>
               </ul>
</DayBlock>
))
}
    </div>
  );
}

export default WeekView;
