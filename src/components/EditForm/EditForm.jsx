import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSaveBillMutation, useUpdateBillMutation } from '../../util/store/billApi';

const EditForm = (props) => {
    const date = useSelector((state) => new Date(state.pageReducer.selectedDay));
    const dispatch = useDispatch();
    const [updateBill] = useUpdateBillMutation()
    const [saveBill] = useSaveBillMutation();
    const defaultValues = props.bill || {
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
        props.bill ? updateBill(formValue) : saveBill(formValue);
        props.setEdit && props.setEdit(false);
        dispatch({
            type: "Page",
            payload:"Day"
        })
    }

    const handleCancelClick = () => {
        props.setEdit && props.setEdit(false);
        dispatch({
            type: "Page",
            payload:"Day"
        })
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
          <div className='buttons'>
              
          <Button variant='contained' color='primary' type='submit'>
              Submit
          </Button>
          {props.setEdit ? (
              <Button variant='contained' color='primary' type='submit' onClick={handleCancelClick}>
                  Cancel
              </Button>
          ) : <></>
        }
        </div>
          
    </form>
  );
}

export default EditForm;
