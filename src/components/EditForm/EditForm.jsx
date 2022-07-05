import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EditForm = (props) => {
    const date = useSelector((state) => new Date(state.pageReducer.selectedDay))
    const defaultValues = {
        name: "",
        amount: 0.0,
        date: date,
        occurance: 'Single'
    }
    const [formValue, setFormValue] = useState(defaultValues)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValue)
    }

  return (
      <form onSubmit={handleSubmit}>
          <TextField
              id="name-input"
              name="name"
              label="Bill Name"
              type="text"
              value={formValue.name}
              onChange={handleInputChange}
              margin='normal'
          />
          <TextField
              id="amount-input"
              name="amount"
              label="Amount"
              type="number"
              value={formValue.amount}
              onChange={handleInputChange}
              margin='normal'
          />
          <TextField
              id="date-input"
              name="date"
              label="Date"
              type="text"
              value={date.toLocaleDateString()}
              margin='normal'
              disabled
          />
          
          <Button variant='contained' color='primary' type='submit'>
              Submit
          </Button>
          
    </form>
  );
}

export default EditForm;
