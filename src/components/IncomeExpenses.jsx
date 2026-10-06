export const IncomeExpenses = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);

  const income = amounts
    .filter((a) => a > 0)
    .reduce((acc, a) => acc + a, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((a) => a < 0).reduce((acc, a) => acc + a, 0) * -1
  ).toFixed(2);

  return (
    <div className="stat-pills-row">
      <div className="stat-pill income">
        <span className="label"> Coins In</span>
        <div className="amount">+₹{Number(income).toLocaleString('en-IN')}</div>
      </div>
      <div className="stat-pill expense">
        <span className="label"> Coins Out</span>
        <div className="amount">-₹{Number(expense).toLocaleString('en-IN')}</div>
      </div>
    </div>
  );
};