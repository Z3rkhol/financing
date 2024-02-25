import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.slice(-5).reverse();

    const showAllTransactionsDialog = () => {
        // Generate HTML for category and price filter inputs using Bootstrap classes
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
    
        // Show the SweetAlert2 dialog
        MySwal.fire({
        title: 'Všechny transakce',
        html: filterHtml + `<ul id="transactions-list" class="list-unstyled"></ul>`, // Using 'list-unstyled' to remove default list styling
        didOpen: () => {
            // Function to update the transactions list based on filters
            const updateTransactionsList = () => {
            const selectedCategory = document.getElementById('filter-category').value;
            const minAmount = document.getElementById('filter-amount').value;
    
            // Filter transactions based on selected category and minimum amount
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
    
            // Update the transactions list in the dialog
            document.getElementById('transactions-list').innerHTML = transactionsHtml;
            };
    
            // Initially call updateTransactionsList to populate list
            updateTransactionsList();
    
            // Add event listeners to filter inputs to update the list on change
            document.getElementById('filter-category').addEventListener('change', updateTransactionsList);
            document.getElementById('filter-amount').addEventListener('input', updateTransactionsList);
        },
        preConfirm: () => {
            // Implement if you need to do something when the dialog is confirmed
        }
        });
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