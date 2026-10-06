import { useState } from 'react';

export const AddTransaction = ({ onAddTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !amount) {
      alert('Please fill out the description and amount.');
      return;
    }

    const numericAmount = parseFloat(amount);
    const finalAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

    onAddTransaction({
      id: Date.now(),
      text,
      amount: finalAmount,
      category,
    });

    setText('');
    setAmount('');
  };

  return (
    <div className="card form-card">
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Grocery shopping, Tuition fee"
          />
        </div>

        <div className="form-grid">
          <div className="form-control">
            <label htmlFor="type">Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense (-)</option>
              <option value="income">Income (+)</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Transport">Transport</option>
              <option value="Salary">Salary</option>
              <option value="Utilities">Utilities</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount..."
          />
        </div>

        <button className="submit-btn">Record Transaction</button>
      </form>
    </div>
  );
};