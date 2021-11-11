import { getItemsRequest } from './requests';
import { showLoader, hideLoader } from './loader';
import { showError } from './error';
import { showApp } from './addContent';

export default () => {
    document.querySelector('#error').style.display = 'none';
    document.querySelector('#loader');
    showLoader();
    getItemsRequest()
        .then(({ data }) => {
            if (data.result !== 'ok' || typeof data.html === 'undefined') {
                showError(data);
            } else {
                showApp(data);
            }
        })
        .catch((e) => {
            showError(e);
        })
        .finally(() => {
            document.querySelector('#loader');
            hideLoader();
        });
};
