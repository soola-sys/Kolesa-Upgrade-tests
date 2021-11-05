import axios from 'axios';

axios.defaults.baseURL = 'http://example.com';

export const getItemsRequest = () => axios.get('/getItems');

export const toggleFavoriteRequest = id => axios.post('/toggleFavorite', new URLSearchParams({ id }));
