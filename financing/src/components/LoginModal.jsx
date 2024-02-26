import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

const LoginModal = () => {
    const showLoginModal = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Přihlášení',
            html: `
                <input id="swal-input1" type="text" class="swal2-input form-control" placeholder="Uživatelské jméno" style="max-width: 300px; margin: 0 auto;">
                <input id="swal-input2" type="password" class="swal2-input form-control" placeholder="Heslo" style="max-width: 300px; margin: 10px auto;">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    username: document.getElementById('swal-input1').value,
                    password: document.getElementById('swal-input2').value
                };
            },
            showCancelButton: true,
            confirmButtonText: 'Přihlásit se',
            cancelButtonText: 'Zrušit'
        });

        if (formValues) {
            console.log('Login Credentials:', formValues);
        }
    };

    return (
        <button className="btn btn-primary" onClick={showLoginModal}>Přihlásit se</button>
    );
};

export default LoginModal;