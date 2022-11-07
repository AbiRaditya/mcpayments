// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ModalService from "./service/ModalService";
import formService from "./service/FormService";
import Expenses from "./components/Expenses";

import AddSvg from "./images/add-plus-svgrepo-com.svg";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budget, setBudget] = useState(0);
  const [expenses, setExpense] = useState([]);

  // const modalTitle = "Add an expense";

  const budgetInformation = useMemo(() => {
    if (budget) {
      const totalSpent = expenses
        .map((expense) => +expense.price)
        .reduce((previousValue, currentValue) => {
          const sum = previousValue + currentValue;
          return sum;
        });
      const remainingBudget = +budget - +totalSpent;
      return {
        totalSpent,
        remainingBudget,
      };
    }
    return {
      totalSpent: 0,
      remainingBudget: 0,
    };
  }, [budget, expenses]);

  const editDataRef = useRef();
  const modalTitle = useRef("Add expense");
  const isEditExpense = useRef(false);
  const isBudget = useRef(false);

  function onSubmitBudget(budgetData) {
    setBudget(() => {
      localStorage.setItem("budget", JSON.stringify(budgetData));
      return budgetData;
    });
  }
  function openModal() {
    editDataRef.current = {};
    isEditExpense.current = false;
    modalTitle.current = "Add Expense";
    isBudget.current = false;
    setIsModalOpen(true);
  }
  function closeModal() {
    editDataRef.current = {};
    setIsModalOpen(false);
  }
  function editBudget() {
    isBudget.current = true;
    modalTitle.current = "Set Budget";
    setIsModalOpen(true);
  }

  function addExpense(expenseData) {
    setExpense((currentValue) => {
      const newValue = [...currentValue, expenseData];
      localStorage.setItem("expenses", JSON.stringify(newValue));
      closeModal();
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
    isBudget.current = false;
    modalTitle.current = "Edit Expense";
    setIsModalOpen(true);
  }

  function editExpense(newExpenseData) {
    const indexOfEdit = expenses.findIndex(function (each) {
      return each.id == newExpenseData.id;
    });
    setExpense((currentValue) => {
      // const newValue = [...currentValue, newExpenseData];
      const newValue = [...currentValue];
      newValue[indexOfEdit] = newExpenseData;
      localStorage.setItem("expenses", JSON.stringify(newValue));
      closeModal();
      return newValue;
    });
  }

  useEffect(() => {
    const expenses = localStorage.getItem("expenses");
    const budget = localStorage.getItem("budget");
    if (expenses) {
      const oldExpenses = JSON.parse(expenses);
      const oldBudget = JSON.parse(budget);
      if (oldBudget) {
        setBudget(oldBudget);
      }
      if (Array.isArray(oldExpenses)) {
        setExpense(oldExpenses);
      } else {
        localStorage.setItem("expenses", JSON.stringify([]));
      }
    }
  }, []);

  function modalComponent(Component) {
    return (props) => <Component {...props} />;
  }

  const ModalFormExpense = modalComponent(ModalService);
  const FormModal = modalComponent(formService);

  return (
    <div className="App">
      <ModalFormExpense
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalTitle={modalTitle.current}
      >
        <FormModal
          initialExpenseData={editDataRef.current}
          expenseAdd={addExpense}
          expenseEdit={editExpense}
          isEdit={isEditExpense.current}
          isBudget={isBudget.current}
          onSubmitBudget={onSubmitBudget}
        ></FormModal>
      </ModalFormExpense>
      <div className="container">
        <div className="budget-plan">
          <h1>Budget Planner</h1>
          <div>
            <div className="budget__total">
              <span>Total:</span>{" "}
              <span>
                {" "}
                {budget.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}{" "}
              </span>{" "}
              <button onClick={editBudget}>Set</button>
            </div>
            <div className="budget__spent">
              <span>Spent:</span>
              <span>
                {budgetInformation.totalSpent.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
            <div className="budget__remaining">
              <span>Remaining:</span>
              <span>
                {budgetInformation.remainingBudget.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="expenses">
          <div className="expenses__header">
            <h1>Expenses</h1>
            <div className="add-button-container">
              <button className="add-button" onClick={openModal}>
                {/* <img src={AddSvg} alt="" /> */}
              </button>
            </div>
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
