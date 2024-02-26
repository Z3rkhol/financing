import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

const VatCalculator = () => {
    const calculateVAT = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Výpočet DPH',
            html: `
                <div class="form-group d-flex justify-content-center mb-3">
                    <input id="swal-input1" class="swal2-input form-control" placeholder="Cena bez DPH" style="max-width: 175px; margin: auto;">
                </div>
                <div class="form-group d-flex justify-content-center">
                    <select id="swal-input2" class="swal2-input form-control" style="max-width: 175px; margin: auto;">
                        <option value="0.21">21%</option>
                        <option value="0.15">12%</option>
                        <option value="0">Bez DPH</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            showCloseButton: true,
            preConfirm: () => {
                const priceWithoutVAT = document.getElementById('swal-input1').value;
                const vatRate = document.getElementById('swal-input2').value;
                if (!priceWithoutVAT || isNaN(priceWithoutVAT)) {
                    Swal.showValidationMessage('Prosím, zadejte platnou cenu');
                    return false;
                }
                return {
                    priceWithoutVAT: parseFloat(priceWithoutVAT),
                    vatRate: parseFloat(vatRate)
                };
            }
        });
    
        if (formValues) {
            const { priceWithoutVAT, vatRate } = formValues;
            const vatAmount = priceWithoutVAT * vatRate;
            const priceWithVAT = priceWithoutVAT + vatAmount;
            MySwal.fire(
                'Výsledky výpočtu DPH',
                `Celková cena s DPH: ${priceWithVAT.toFixed(2)} CZK<br>Rozdíl (DPH): ${vatAmount.toFixed(2)} CZK`,
                'info'
            );
        }
    };

    return (
        <button className="btn btn-primary" onClick={calculateVAT}>Výpočet DPH</button>
    );
};

export default VatCalculator;