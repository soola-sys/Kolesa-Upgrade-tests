const errorElement = document.querySelector('#error');

errorElement.style.display = 'none';

/* eslint-disable import/prefer-default-export */
export const showError = (data) => {
    if (data.result !== 'ок' || typeof data.html === 'undefined') {
        errorElement.innerHTML = 'Произошла ошибка, попробуйте еще раз.';
        errorElement.style.display = 'block';
    } else {
        errorElement.innerHTML = data.message;
        errorElement.style.display = 'block';
    }
};
