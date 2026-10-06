export const AnalyticsPage = ({ transactions }) => {
  const expensesOnly = transactions.filter((t) => t.amount < 0);

  const categoryTotals = expensesOnly.reduce((acc, curr) => {
    const cat = curr.category || 'Miscellaneous';
    acc[cat] = (acc[cat] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});

  const BUDGET_LIMIT = 5000;

  return (
    <div className="card">
      <div className="section-header-row">
        <h3>Category-Wise Spending Analysis</h3>
      </div>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        Categories highlighted in red indicate expenditures exceeding the ₹{BUDGET_LIMIT} threshold.
      </p>

      {Object.keys(categoryTotals).length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
          No expense transactions recorded yet.
        </p>
      ) : (
        <ul className="list">
          {Object.entries(categoryTotals).map(([cat, amount]) => {
            const isExceeded = amount > BUDGET_LIMIT;
            return (
              <li
                key={cat}
                style={{
                  borderLeft: isExceeded ? '4px solid #ef4444' : '4px solid #4f46e5',
                  backgroundColor: isExceeded ? '#fef2f2' : '#ffffff',
                }}
              >
                <div>
                  <div className="title">{cat}</div>
                  {isExceeded && (
                    <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
                      ⚠️ Category budget threshold exceeded
                    </span>
                  )}
                </div>
                <span className="amount-text" style={{ color: isExceeded ? '#dc2626' : '#0f172a' }}>
                  ₹{amount.toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};