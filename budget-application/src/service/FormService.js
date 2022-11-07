import FormBudget from "../sub-components/FormBudget";
import FormExpenses from "../sub-components/FormExpenses";

const formService = ({
  children,
  onSubmitBudget,
  initialExpenseData,
  expenseAdd,
  expenseEdit,
  isEdit,
  isBudget,
}) => {
  if (isBudget) {
    return <FormBudget onSubmitBudget={onSubmitBudget}>{children}</FormBudget>;
  } else {
    return (
      <FormExpenses
        initialExpenseData={initialExpenseData}
        expenseAdd={expenseAdd}
        expenseEdit={expenseEdit}
        isEdit={isEdit}
      >
        {children}
      </FormExpenses>
    );
  }
};
export default formService;
