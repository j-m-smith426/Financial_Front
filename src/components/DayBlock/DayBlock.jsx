import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditForm from '../EditForm/EditForm';

const DayBlock = (props) => {
  const { blockType, bill } = props
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEdit(true)
  }

  const displayBill = () => {
    if(blockType === "bill") { return !edit? (
      <>
      <p>
      Bill Name: {bill.name}
</p>

<ul>
    <li>Amount: ${bill.amount}</li>
</ul>
      
      <Button variant='contained' color='primary' onClick={handleEditClick}>
          edit
        </Button>
      </>
    ) :
      (<EditForm bill={bill} setEdit={setEdit} />)
    }
  }

  const handleNewClick = () => {
    dispatch({
      type: "Page",
      payload: "New Bill"
    })
  }
  
  return (
      <Box sx={{ display: 'flex' , flexDirection: 'column', justifyContent: 'space-evenly', minHeight: 'calc(100vh / 8)'}} >
            {props.children}
      {displayBill()} 
      {blockType === "empty" && (
        <Button variant='contained' color='primary' onClick={handleNewClick}>
        +
      </Button>
      )}
      </Box>   
  );
}



export default DayBlock;
