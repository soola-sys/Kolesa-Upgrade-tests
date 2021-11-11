export const showLoader = (loader) => {
    loader = document.querySelector('#loader');
    loader.style.display = 'block';
};

export const hideLoader = (loader) => {
    loader = document.querySelector('#loader');
    loader.style.display = 'none';
};
