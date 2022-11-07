import React, { useRef, useEffect } from "react";

const FormBudget = ({ initialBudget = 0, onSubmitBudget }) => {
  const budgetRef = useRef();

  useEffect(() => {
    if (initialBudget) {
      budgetRef.current.value = initialBudget;
    }
  }, [initialBudget]);

  function submitForm(e) {
    e.preventDefault();
    onSubmitBudget(+budgetRef.current.value);
  }

  return (
    <form onSubmit={submitForm} className="form-expense">
      <div>
        <div className="input-form">
          <label>Budget</label>
          <input required ref={budgetRef} type="number" placeholder="Budget" />
        </div>
      </div>
      <button className="button-submit" type="submit">
        {" "}
        Save{" "}
      </button>
    </form>
  );
};

export default FormBudget;
