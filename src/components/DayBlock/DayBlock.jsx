import { Box } from '@mui/material';
import React from 'react';

const DayBlock = (props) => {
  return (
      <Box sx={{ display: 'flex' , flexDirection: 'column', justifyContent: 'space-evenly', height: 'calc(100vh / 8)'}} >
            {props.children}
              
          
      </Box>   
  );
}



export default DayBlock;
