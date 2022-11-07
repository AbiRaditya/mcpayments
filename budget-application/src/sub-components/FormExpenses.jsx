import React, { useRef, useEffect } from "react";

const FormExpenses = ({
  initialExpenseData = {},
  expenseAdd,
  isEdit = false,
  expenseEdit,
}) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const idRef = useRef();

  function dummyId(name) {
    const Rng = Math.random() * 100;
    return Rng + name;
  }
  useEffect(() => {
    if (initialExpenseData.name || initialExpenseData.price) {
      idRef.current = initialExpenseData.id;
      nameRef.current.value = initialExpenseData.name;
      priceRef.current.value = initialExpenseData.price;
    }
  }, [initialExpenseData]);

  function submitForm(e) {
    // console.log(e, "submitForm", nameRef.current.value, priceRef.current.value);
    e.preventDefault();
    if (nameRef.current.value) {
      const data = {
        name: nameRef.current.value,
        price: priceRef.current.value ? +priceRef.current.value : 0,
      };
      if (isEdit) {
        expenseEdit({ ...data, id: idRef.current });
      } else {
        expenseAdd({ ...data, id: dummyId(nameRef.current.value) });
      }
    }
  }

  return (
    <form onSubmit={submitForm} className="form-expense">
      <div>
        <div className="input-form">
          <label>Name</label>
          <input
            required
            ref={nameRef}
            type="text"
            placeholder="Name of expense"
          />
        </div>
        <div className="input-form">
          <label>Price</label>
          <input ref={priceRef} type="number" placeholder="Price of expense" />
        </div>
      </div>
      <button className="button-submit" type="submit">
        Save
      </button>
    </form>
  );
};

export default FormExpenses;
