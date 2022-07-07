# Financial Frontend

---

## Link to Backend
[Financial Backend Api](https://github.com/j-m-smith426/FinancialBackend)

## Technologies and Languages Used

- Javascript
- Redux
- React
- Java
- SpringBoot
- Axios

## Features

- Full crud operations for adding, editing, retreiving Bills
- Day
  - See all bills for a given day and edit them
- Week
  - See total bills per day and total amount due
- Month
  - See total Bills per week and total amount due
- New Bill
  - create a new bill

To-do List

- Implement deleteing bills on frontend

## Getting Started

Setup:

- Build and deploy backend
- Based on Backend settings, create env variable named REACT_APP_DB_STRING that points to the backend url
- Build and run this application

## Useage

## New Bill

- Enter Bill name and amount, select Date useing the calender
  ![New Bill](./src/assets/NewBill-View.jpg?raw=true "New Bill Page")
- Submit to send to db

## Month

- Click a week to see more details
  ![Month View](./src/assets/Month-View.jpg?raw=true "Month View Page")

## Week

- Click a day to see more details
  ![Week View](./src/assets/Week-View.jpg?raw=true "Week View Page")

## Day

![Day View Empty](./src/assets/Day-Empty.jpg?raw=true "Day View Empty")

- Click the edit button to edit a specific bill
- Click the + icon to add a new bill to the date

![Day View Populated](./src/assets/Day-Populated.jpg?raw=true "Day View Populated")
