import { getItemsRequest, toggleFavoriteRequest } from './requests';

export default () => {
    document.querySelector('#error').style.display = 'none';
    document.querySelector('#loader').style.display = 'block';

    getItemsRequest()
        .then(({ data }) => {
            if (data.result !== 'ok' || typeof data.html === 'undefined') {
                const errorElement = document.querySelector('#error');

                errorElement.innerHTML = 'Произошла ошибка, попробуйте ещё раз.';
                errorElement.style.display = 'block';
            } else {
                const appElement = document.querySelector('#app');

                appElement.innerHTML = data.html;
                appElement.style.display = 'block';

                Array.from(appElement.querySelector('button')).forEach((button) => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();

                        e.currentTarget.textContent = 'Загрузка...';

                        toggleFavoriteRequest(e.currentTarget.dataset.id)
                            .then(({ data: buttonData }) => {
                                if (buttonData.result === 'set') {
                                    e.currentTarget.textContent = '🌝';
                                } else {
                                    e.currentTarget.textContent = '🌚';
                                }
                            });
                    });
                });
            }
        })
        .catch((e) => {
            const errorElement = document.querySelector('#error');

            errorElement.innerHTML = e.message;
            errorElement.style.display = 'block';
        })
        .finally(() => {
            document.querySelector('#loader').style.display = 'none';
        });
};
