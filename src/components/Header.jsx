

export const Header = ({ title = 'Expense Tracker' }) => {
  return (
    <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>
      {title}
    </h2>
  );
};