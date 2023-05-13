import React from 'react';
import './TransactionsList.css';

function TransactionsList({ date, transactions, onClose }) {
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const selectedDate = new Date(date);
        return transactionDate.toDateString() === selectedDate.toDateString();
      });

    return (
        
        <div className = "transactions-container">
          <h2 className = "list-title">Transactions for {date.toDateString()}</h2>
          {filteredTransactions.length > 0 ? (
            <div className="transaction-list">
              {filteredTransactions.map((filteredTransaction) => (
                <div key={filteredTransaction.id} className="transaction">
                  <p>{filteredTransaction.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className = "no-transactions">No transactions found for {date.toDateString()}</p>
          )}
          <button onClick = {onClose}>Close</button>
          

        </div>


    );

}

export default TransactionsList;