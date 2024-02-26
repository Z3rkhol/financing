import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

const CurrencyConverter = () => {
    const [rates, setRates] = useState({
        USD: {},
        EUR: {},
        CZK: {}
    });

    useEffect(() => {
        const currencies = ['EUR', 'USD', 'CZK'];
        const fetchRates = async () => {
            try {
                for (let currency of currencies) {
                    const response = await axios.get(`https://v6.exchangerate-api.com/v6/6212669bbc2644d8280c6314/latest/${currency}`);
                    if (response.data && response.data.conversion_rates) {
                        setRates(prevRates => ({
                            ...prevRates,
                            [currency]: response.data.conversion_rates
                        }));
                    } else {
                        console.error(`No conversion rates in response for ${currency}:`, response.data);
                        MySwal.fire('Error', `No conversion rates data available for ${currency}`, 'error');
                    }
                }
            } catch (error) {
                console.error('Error fetching rates:', error);
                MySwal.fire('Error', 'Cannot load exchange rates', 'error');
            }
        };

        fetchRates();
    }, []);

    const convertCurrency = async () => {
        // Ensure rates are loaded
        if (!rates.USD || !rates.EUR || !rates.CZK) {
            await MySwal.fire('Error', 'Exchange rates not loaded yet', 'error');
            return;
        }

        await MySwal.fire({
            title: 'Převod Měn',
            html: `
                <div class="mb-3 text-center">
                    <input id="swal-amount" type="number" class="form-control" placeholder="Částka" style="max-width: 200px; margin: 0 auto;">
                </div>
                <div class="d-flex justify-content-center">
                    <select id="swal-base-currency" class="form-select me-2" style="max-width: 100px;">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="CZK">CZK</option>
                    </select>
                    <select id="swal-target-currency" class="form-select ms-2" style="max-width: 100px;">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="CZK">CZK</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const amount = document.getElementById('swal-amount').value;
                const baseCurrency = document.getElementById('swal-base-currency').value;
                const targetCurrency = document.getElementById('swal-target-currency').value;
                return {
                    amount,
                    baseCurrency,
                    targetCurrency,
                };
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const { amount, baseCurrency, targetCurrency } = result.value;
                const baseRate = rates[baseCurrency][targetCurrency];
                const convertedAmount = (parseFloat(amount) * baseRate).toFixed(2);
                MySwal.fire(`Převedená částka`, `${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`, 'info');
            }
        });
    };

    return (
        <button className="btn btn-primary" onClick={convertCurrency}>Převést Měnu</button>
    );
};

export default CurrencyConverter;