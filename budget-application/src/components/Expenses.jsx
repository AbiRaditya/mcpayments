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
              <p>
                {expense.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <p>{expense.name}</p>
            </div>

            <div className="expenses__buttons">
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
          </div>
        );
      })}
    </div>
  );
};

export default Expenses;
