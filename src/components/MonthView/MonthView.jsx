import { add, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import React from 'react';
import { formatDate, getWeekRange } from '../../util/functions/FormatDate';
import { useGetBillsByDateQuery } from '../../util/store/billApi';
import { Box } from '@mui/system';

const MonthView = (props) => {
    const { selected } = props;
    const first = startOfMonth(selected);
    const end = endOfMonth(selected)
    const weeks = [];
    let current = first;
    while (startOfWeek(current, { weekStartsOn: 1 }).getMonth() === first.getMonth() || endOfWeek(current, { weekStartsOn: 1 }).getMonth() === first.getMonth()) {
        weeks.push(getWeekRange(current));
        current = add(current, { days: 7 });
    }
    
  return (
    <div>
      {weeks.map((week) => (<WeekBlock weekRange={week} />))}
    </div>
  );
}

const WeekBlock = (props) => {
    const { weekRange } = props;
    // console.log(weekRange);
    const { data = [] } = useGetBillsByDateQuery([weekRange[0], weekRange[1]]);
    let total = 0;
    for (let i of data) {
        total += i.amount;
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: 'calc(100vh / 6)' }} >
            <p>
            Week Of {weekRange[1]}

            </p>
            {`${data.length} Bills that amount to $${total}`}              
          
      </Box>
    )
}

export default MonthView;
