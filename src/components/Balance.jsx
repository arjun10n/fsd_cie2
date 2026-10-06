export const Balance = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const totalIncome = amounts.filter((a) => a > 0).reduce((acc, a) => acc + a, 0);
  const totalExpense = Math.abs(amounts.filter((a) => a < 0).reduce((acc, a) => acc + a, 0));
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0) : 0;

  return (
    <div className="balance-card">
      <h4>🪙 BMO's Secret Vault Balance</h4>
      <h1>₹{Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h1>
      
      <div className="character-speech-bubble">
        <span></span>
        <span>
          {savingsRate >= 50
            ? `Yay! BMO says you're saving ${savingsRate}% of your coins!`
            : `Uh oh! BMO notices your coins are vanishing fast!`}
        </span>
      </div>
    </div>
  );
};