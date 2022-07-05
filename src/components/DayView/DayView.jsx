import { Button } from '@mui/material';
import { add } from 'date-fns';
import React from 'react';
import { formatDate } from '../../util/functions/FormatDate';
import { useGetBillsByDateQuery } from '../../util/store/billApi';
import DayBlock from '../DayBlock/DayBlock';

const DayView = (props) => {
    const { selectedDay } = props;

    const { data = [], error } = useGetBillsByDateQuery([formatDate(selectedDay), formatDate(add(selectedDay, { days:1}))
    ]);
  
    return (
    <div>
            {data.map((bill) => (
                <DayBlock blockType="bill" bill={bill}>
                               
                                       
          </DayBlock>
            ))}
        <DayBlock blockType="empty">
          
        </DayBlock>
    </div>
  );
}

export default DayView;
