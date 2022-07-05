import { add, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import React from 'react';
import { getWeekRange } from '../../util/functions/FormatDate';
import { useGetBillsByDateQuery } from '../../util/store/billApi';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

const MonthView = (props) => {
    const selected = useSelector((state) => new Date(state.pageReducer.selectedDay))
    
    const first = startOfMonth(selected);
    const weeks = [];
    let current = first;
    while (startOfWeek(current, { weekStartsOn: 1 }).getMonth() === first.getMonth() || endOfWeek(current, { weekStartsOn: 1 }).getMonth() === first.getMonth()) {
        weeks.push(getWeekRange(current));
        current = add(current, { days: 7 });
    }
    
  return (
    <div>
          {weeks.map((week) => (<WeekBlock weekRange={week} key={week[0]} />))}
    </div>
  );
}

const WeekBlock = (props) => {
    const { weekRange } = props;
    const dispatch = useDispatch();
    // console.log(weekRange);
    const { data = [] } = useGetBillsByDateQuery([weekRange[0], weekRange[1]]);
    let total = 0;
    for (let i of data) {
        total += i.amount;
    }

    const handleWeekClick = () => {
        const day = new Date(weekRange[1]);
        // const [year, month, date] = weekRange[0].split('-')
        // day.setDate(Number(date));
        // day.setMonth(Number(month));
        // day.setFullYear(Number(year));
        dispatch({
            type: "SelectedDay",
            payload: day.toISOString()
          })
        dispatch({
            type: "Page",
            payload: 'Week'
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: 'calc(100vh / 6)' }} >
            <div onClick={handleWeekClick} className="day_block">

            <p>
            Week Of {weekRange[1]}

            </p>
            {`${data.length} Bills that amount to $${total}`}              
            </div>
          
      </Box>
    )
}

export default MonthView;
