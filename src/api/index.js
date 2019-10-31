import axios from 'axios';
import { BASE_URL } from '../config';

const api = async opts => {
	const { optsHeaders, url, method, params, data, ...restOpts} = opts
	const access_token = localStorage.getItem('access_token');
	const headers = access_token ? { 'authorization': access_token } : {};

	const config = {
		method: method || 'get',
		url: BASE_URL + url,
		params,
		data,
		headers: {
			...headers,
			...optsHeaders
		},
		...restOpts,
	}

	const result = await axios(config);
	return result;
}

export default api;