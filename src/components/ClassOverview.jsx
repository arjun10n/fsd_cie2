import { Component } from 'react';

// Requirement 2: Mandatory Class Component implementation
class ClassOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bootTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bmoBoops: 0,
    };
  }

  handleBoop = () => {
    this.setState((prev) => ({
      bmoBoops: prev.bmoBoops + 1,
    }));
  };

  render() {
    const { transactions } = this.props;

    return (
      <div className="class-widget">
        <h4>🕹️ BMO Memory Engine (Class Component)</h4>
        <p>BMO Boot Time: <strong>{this.state.bootTime}</strong></p>
        <p>Treasury Memory Count: <strong>{transactions.length} items</strong></p>
        <p>Boops on BMO: <strong>{this.state.bmoBoops} times</strong></p>
        <button onClick={this.handleBoop} className="audit-btn">
          Press BMO's Button (Audit)
        </button>
      </div>
    );
  }
}

export default ClassOverview;