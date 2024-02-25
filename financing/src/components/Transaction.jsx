import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Transaction = ({ onAddTransaction, handleTransactionUpdate }) => {
    const handleTransaction = async () => {
        const { value: transactionType } = await MySwal.fire({
            title: 'Vyberte typ transakce',
            input: 'radio',
            showCloseButton: true,
            inputOptions: {
                income: 'Nový příjem',
                expense: 'Nový výdaj'
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Musíte si vybrat!';
                }
            }
        });

        if (transactionType) {
            const formResults = await MySwal.fire({
                title: `Zadejte detaily ${transactionType}`,
                html: `
                    <input id="swal-input1" class="swal2-input" placeholder="Částka">
                    <input id="swal-input2" class="swal2-input" placeholder="Kategorie">
                `,
                focusConfirm: false,
                showCloseButton: true,
                preConfirm: () => {
                    const amount = document.getElementById('swal-input1').value;
                    const category = document.getElementById('swal-input2').value;
                    if (!amount || !category) {
                        Swal.showValidationMessage('Prosím, vyplňte všechna pole');
                        return false;
                    }
                    return [amount, category];
                }
            });

            if (formResults.value) {
                const [amount, category] = formResults.value;
                const newTransaction = {
                    id: Math.random(),
                    type: transactionType,
                    amount: parseFloat(amount),
                    category,
                    date: new Date().toISOString().slice(0, 10)
                };
                
                onAddTransaction(newTransaction);
                handleTransactionUpdate(transactionType, parseFloat(amount));
            }
        }
    };

    return (
        <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={handleTransaction}>Vytvořit transakci</button>
        </div>
    );
};

export default Transaction;