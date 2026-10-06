import { useState } from 'react';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionItem } from '../components/TransactionItem';
import { AddTransaction } from '../components/AddTransaction';
import ClassOverview from '../components/ClassOverview';

export const DashboardPage = ({ transactions, onAddTransaction, onDeleteTransaction }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Compute Income vs Expense ratio for alert
  const amounts = transactions.map((t) => t.amount);
  const totalIncome = amounts.filter((a) => a > 0).reduce((acc, a) => acc + a, 0);
  const totalExpense = Math.abs(amounts.filter((a) => a < 0).reduce((acc, a) => acc + a, 0));
  const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

  // Filter logic
  let filtered = transactions.filter((t) => {
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting logic
  if (sortBy === 'amount-high') {
    filtered = [...filtered].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
  } else if (sortBy === 'amount-low') {
    filtered = [...filtered].sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
  } else {
    filtered = [...filtered].sort((a, b) => b.id - a.id);
  }

  // Instant CSV Export
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions to export.');
      return;
    }

    const headers = 'ID,Description,Amount,Category\n';
    const rows = transactions
      .map((t) => `${t.id},"${t.text}",${t.amount},"${t.category}"`)
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Expense_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-grid">
      {/* Left Column: Financial Overview & Add Form */}
      <div>
        <Balance transactions={transactions} />
        <IncomeExpenses transactions={transactions} />

        {expenseRatio >= 70 && (
          <div className="spending-alert">
            <span>⚠️</span>
            <span>
              <strong>Spending Alert:</strong> Expenses have reached {expenseRatio.toFixed(1)}% of total income.
            </span>
          </div>
        )}

        <ClassOverview transactions={transactions} />
        <AddTransaction onAddTransaction={onAddTransaction} />
      </div>

      {/* Right Column: Filter Controls & Transaction History */}
      <div className="card">
        <div className="section-header-row">
          <h3>Transaction History</h3>
          <button onClick={handleExportCSV} className="export-btn">
            Export CSV
          </button>
        </div>

        <div className="filter-panel">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="amount-high">Highest ₹</option>
            <option value="amount-low">Lowest ₹</option>
          </select>
        </div>

        <ul className="list">
          {filtered.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
              No matching transactions found.
            </p>
          ) : (
            filtered.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDeleteTransaction}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};