// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import FormExpenses from "./sub-components/FormExpenses";
// import useFetch from "./helpers/useFetch";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpense] = useState([]);

  const modalTitle = "Add an expense";

  const editDataRef = useRef();

  function openModal() {
    editDataRef.current = {};
    setIsModalOpen(true);
  }

  function addExpense(expenseData) {
    setExpense((currentValue) => {
      const newValue = [...currentValue, expenseData];
      localStorage.setItem("expenses", JSON.stringify(newValue));
      return newValue;
    });
    // deleteExpense(2);
  }
  function deleteExpense(id) {
    // const newArray = expense.splice(index, 1);
    setExpense((currentValue) => {
      const newValue = currentValue.filter((expense) => {
        return expense.id != id;
      });
      localStorage.setItem("expenses", JSON.stringify(newValue));
      return newValue;
    });
  }

  function editExpenseButton(expenseData) {
    editDataRef.current = expenseData;
    setIsModalOpen(true);
  }

  useEffect(() => {
    const expenses = localStorage.getItem("expenses");
    if (expenses) {
      const oldExpneses = JSON.parse(expenses);
      if (Array.isArray(oldExpneses)) {
        setExpense(oldExpneses);
      } else {
        localStorage.setItem("expenses", JSON.stringify([]));
      }
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem("expenses", JSON.stringify(expenses));
  //   }
  // }, [expenses]);

  return (
    <div className="App">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle={modalTitle}
      >
        <FormExpenses
          initialExpenseData={editDataRef.current}
          expenseAdd={addExpense}
        ></FormExpenses>
      </Modal>
      <div className="container">
        <div className="budget-plan">
          <h1>Budget Planner</h1>
          <div>
            <div className="budget__total">
              <span>Total:</span> <span> 500 </span>
            </div>
            <div className="budget__spent">
              <span>Spent:</span>
              <span>100</span>
            </div>
            <div className="budget__remaining">
              <span>Remaining:</span>
              <span>400</span>
            </div>
          </div>
        </div>
        <div className="expenses">
          <div className="expenses__header">
            <h1>Expenses</h1>
            <button onClick={openModal}>Add</button>
          </div>
          <input
            type="text"
            placeholder="Search for expenses"
            style={{ width: "100%" }}
          />
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
                      deleteExpense(expense.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      editExpenseButton(expense);
                    }}
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
