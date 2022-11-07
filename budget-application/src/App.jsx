// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
// import Modal from "./components/Modal";
import FormExpenses from "./sub-components/FormExpenses";
// import useFetch from "./helpers/useFetch";
import ModalService from "./service/ModalService";
import Expenses from "./components/Expenses";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpense] = useState([]);

  const modalTitle = "Add an expense";

  const editDataRef = useRef();
  const isEditExpense = useRef(false);

  function openModal() {
    editDataRef.current = {};
    isEditExpense.current = false;
    setIsModalOpen(true);
  }
  function closeModal() {
    editDataRef.current = {};
    setIsModalOpen(false);
  }

  function addExpense(expenseData) {
    console.log("addExpense", expenseData);
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
        return expense.id !== id;
      });
      localStorage.setItem("expenses", JSON.stringify(newValue));
      return newValue;
    });
  }

  function editExpenseButton(expenseData) {
    editDataRef.current = expenseData;
    isEditExpense.current = true;
    setIsModalOpen(true);
  }

  function editExpense(newExpenseData) {
    const indexOfEdit = expenses.findIndex(function (each) {
      return each.id == newExpenseData.id;
    });
    console.log(indexOfEdit, "indexOfEdit", newExpenseData);
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

  function modalComponent(Component) {
    return (props) => <Component {...props} />;
  }

  const ModalFormExpense = modalComponent(ModalService);

  return (
    <div className="App">
      <ModalFormExpense
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalTitle={modalTitle}
      >
        <FormExpenses
          initialExpenseData={editDataRef.current}
          expenseAdd={addExpense}
          expenseEdit={editExpense}
          isEdit={isEditExpense.current}
        ></FormExpenses>
      </ModalFormExpense>
      {/* <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle={modalTitle}
      >
        <FormExpenses
          initialExpenseData={editDataRef.current}
          expenseAdd={addExpense}
        ></FormExpenses>
      </Modal> */}
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
          <Expenses
            expenses={expenses}
            deleteExpenseButton={deleteExpense}
            editExpenseButton={editExpenseButton}
          ></Expenses>
        </div>
      </div>
    </div>
  );
}

export default App;
