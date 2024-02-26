import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.slice(-5).reverse();

    const showAllTransactionsDialog = () => {
        const filterHtml = `
        <div class="row g-2 mb-3"> <!-- Bootstrap row with gutters -->
            <div class="col"> <!-- Column for the category filter -->
            <select id="filter-category" class="form-select">
                <option value="">Všechny kategorie</option>
                ${[...new Set(transactions.map((t) => t.category))].map((category) => `<option value="${category}">${category}</option>`).join('')}
            </select>
            </div>
            <div class="col"> <!-- Column for the amount filter -->
            <input type="number" id="filter-amount" class="form-control" placeholder="Minimální částka">
            </div>
        </div>
        `;
    
        MySwal.fire({
        title: 'Všechny transakce',
        html: filterHtml + `<ul id="transactions-list" class="list-unstyled"></ul>`,
        didOpen: () => {
            const updateTransactionsList = () => {
            const selectedCategory = document.getElementById('filter-category').value;
            const minAmount = document.getElementById('filter-amount').value;
    
            const filteredTransactions = transactions.filter((t) => {
                return (selectedCategory === '' || t.category === selectedCategory) && 
                    (minAmount === '' || t.amount >= minAmount);
            });
    
            // Generate HTML for the filtered transactions list
            const transactionsHtml = filteredTransactions.map((t) => `
                <li>
                ${t.date}: ${t.type === 'income' ? 'Příjem' : 'Výdaje'} - ${t.amount} CZK - ${t.category}
                </li>
            `).join('');
    
            document.getElementById('transactions-list').innerHTML = transactionsHtml;
            };
    
            updateTransactionsList();
    
            document.getElementById('filter-category').addEventListener('change', updateTransactionsList);
            document.getElementById('filter-amount').addEventListener('input', updateTransactionsList);
        },});
    };
  

    return (
        <div>
            <h2 className="mb-4">Poslední transakce
                <button onClick={showAllTransactionsDialog} className="btn btn-sm" style={{ marginLeft: '10px', border: 'none', background: 'none' }}>
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
            </h2>
                <ul className="list-group">
                {recentTransactions.map((transaction, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <h5 className="mb-1">{transaction.date}: {transaction.type === 'income' ? 'Příjem' : 'Výdaje'}</h5>
                    <p className="mb-0">Kategorie: {transaction.category}</p>
                    </div>
                    <span className={`badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                    {transaction.amount} CZK
                    </span>
                </li>
                ))}
            </ul>
            </div>
        );
    };

export default RecentTransactions;