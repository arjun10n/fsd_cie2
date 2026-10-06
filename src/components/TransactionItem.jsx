export const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.amount > 0;
  const sign = isIncome ? '+' : '-';

  return (
    <li className={isIncome ? 'plus' : 'minus'}>
      <div>
        <div className="title">{transaction.text}</div>
        <span className="cat-badge">{transaction.category}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="amount-text">
          {sign}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="delete-btn"
          title="Delete"
        >
          ×
        </button>
      </div>
    </li>
  );
};