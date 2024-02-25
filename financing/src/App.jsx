import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Balance from './components/Balance';
import Transaction from './components/Transaction';
import RecentTransactions from './components/RecentTransactions';
import VatCalculator from './components/VatCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import InvestmentCalculator from './components/InvestmentCalculator';
import LoginModal from './components/LoginModal';

function App() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const handleTransactionUpdate = (transactionType, amount) => {
    if (transactionType === 'income') {
      setIncome((prevIncome) => prevIncome + parseFloat(amount));
    } else if (transactionType === 'expense') {
      setExpenses((prevExpenses) => prevExpenses + parseFloat(amount));
    }
  };

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    console.log(income, expenses);
  };

  return (
    <div className="app">
      <div className="transaction">
        <Transaction onAddTransaction={addTransaction} handleTransactionUpdate={handleTransactionUpdate} />
      </div>
      <div className='vat'>
        <VatCalculator />
      </div>
      <div className='currency'>
        <CurrencyConverter />
      </div>
      <div className='invest'>
        <InvestmentCalculator />
      </div>
      <main className="main-content">
        <div className="balance-container">
          <Balance income={income} expenses={expenses} />
        </div>
        <div className="recent">
          <RecentTransactions transactions={transactions} />
        </div>
      </main>
      <div className='login'>
        <LoginModal />
      </div>
    </div>
  );
}

export default App;