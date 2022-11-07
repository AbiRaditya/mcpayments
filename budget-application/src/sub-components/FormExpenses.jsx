import React, { useRef, useEffect } from "react";

const FormExpenses = ({ initialExpenseData = {}, expenseAdd }) => {
  const nameRef = useRef();
  const priceRef = useRef();

  function dummyId(name) {
    const Rng = Math.random() * 100;
    return Rng + name;
  }
  useEffect(() => {
    if (initialExpenseData.name || initialExpenseData.price) {
      nameRef.current.value = initialExpenseData.name;
      priceRef.current.value = initialExpenseData.price;
    }
  }, [initialExpenseData]);

  function submitForm(e) {
    // console.log(e, "submitForm", nameRef.current.value, priceRef.current.value);
    e.preventDefault();
    expenseAdd({
      id: dummyId(nameRef.current.value),
      name: nameRef.current.value,
      price: priceRef.current.value,
    });
  }

  return (
    <form onSubmit={submitForm} className="form-expense">
      <div>
        <div className="input-form">
          <label>Name</label>
          <input ref={nameRef} type="text" placeholder="Name of expense" />
        </div>
        <div className="input-form">
          <label>Price</label>
          <input ref={priceRef} type="number" placeholder="Price of expense" />
        </div>
      </div>
      <button className="button-submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default FormExpenses;
