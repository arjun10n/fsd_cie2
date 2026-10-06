import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import './App.css';

const initialData = [
  { id: 1, text: 'Bubblegum Sweets', amount: -600, category: 'Food' },
  { id: 2, text: 'Treasure Quest Bounty', amount: 20000, category: 'Salary' },
  { id: 3, text: 'Treehouse Rent', amount: -4500, category: 'Rent' },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('EXPENSE_DATA');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('EXPENSE_DATA', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (item) => {
    setTransactions([item, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Router>
      <div className="app-wrapper">
        <header className="top-navbar">
          <div className="brand-section">
            <div className="character-avatar"></div>
            <div>
              <div className="brand-title">BMO Vault</div>
              <div className="brand-subtitle">Smart Pocket Manager</div>
            </div>
          </div>
          
          <nav>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Vault Home
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
              Candy Analytics
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                transactions={transactions}
                onAddTransaction={addTransaction}
                onDeleteTransaction={deleteTransaction}
              />
            }
          />
          <Route
            path="/analytics"
            element={<AnalyticsPage transactions={transactions} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;