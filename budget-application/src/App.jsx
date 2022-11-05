// import logo from './logo.svg';
import "./App.css";

function App() {
  return (
    <div className="App">
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
          <h1>Expenses</h1>
          <input
            type="text"
            placeholder="Search for expenses"
            style={{ width: "100%" }}
          />
          <div className="expenses-container">
            <div className="expenses__indv">
              <p>50</p>
              <p>Name of Expense</p>
            </div>
          </div>
        </div>
      </div>
      <div className="temp-container">
        <div className="modal">
          <form>
            <div>
              <input type="text" placeholder="Name of expense" />
              <input type="number" name="" id="" placeholder="Price" />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
