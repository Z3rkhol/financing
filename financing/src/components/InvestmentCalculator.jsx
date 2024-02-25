import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const MySwal = withReactContent(Swal);

const InvestmentCalculator = () => {
    const calculateFutureValue = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Kalkulačka spoření/investic',
            html: `
                <input id="swal-input1" type="number" class="swal2-input form-control" placeholder="Počáteční částka" style="max-width: 300px; margin: 0 auto;">
                <input id="swal-input2" type="number" class="swal2-input form-control" placeholder="Měsíční vklad" style="max-width: 300px; margin: 10px auto;">
                <input id="swal-input3" type="number" class="swal2-input form-control" placeholder="Roční úroková sazba (%)" style="max-width: 300px; margin: 0 auto;">
                <input id="swal-input4" type="number" class="swal2-input form-control" placeholder="Doba trvání (v letech)" style="max-width: 300px; margin: 10px auto;">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    initialAmount: document.getElementById('swal-input1').value,
                    monthlyDeposit: document.getElementById('swal-input2').value,
                    annualInterestRate: document.getElementById('swal-input3').value,
                    durationYears: document.getElementById('swal-input4').value
                };
            }
        });

        if (formValues) {
            const { initialAmount, monthlyDeposit, annualInterestRate, durationYears } = formValues;
            const months = durationYears * 12;
            const monthlyInterestRate = annualInterestRate / 100 / 12;
            let futureValue = initialAmount;

            for (let i = 0; i < months; i++) {
                futureValue = (futureValue + monthlyDeposit) * (1 + monthlyInterestRate);
            }

            MySwal.fire(
                'Výsledky',
                `Odhadovaná budoucí hodnota: ${futureValue.toFixed(2)} CZK`,
                'info'
            );
        }
    };

    return (
        <button className="btn btn-primary" onClick={calculateFutureValue}>Vypočítejte budoucí hodnotu</button>
    );
};

export default InvestmentCalculator;