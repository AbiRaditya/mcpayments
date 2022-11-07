import React from "react";

const Expenses = ({
  expenses = [],
  deleteExpenseButton,
  editExpenseButton,
}) => {
  return (
    <div className="expenses-container">
      {expenses.map((expense) => {
        return (
          <div className="expenses__indv" key={expense.id}>
            <div className="expenses__information">
              <p>{expense.price}</p>
              <p>{expense.name}</p>
            </div>

            <button
              onClick={() => {
                editExpenseButton(expense);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                deleteExpenseButton(expense.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Expenses;
