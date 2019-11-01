import axios from 'axios';
import config from '../config';

const api = async options => {
	const { optsHeaders, url, method, params, data, ...restOpts} = options
	const access_token = localStorage.getItem('access_token');
	const headers = access_token ? { 'authorization': access_token } : {};

	const opts = {
		method: method || 'get',
		url: config.api + url,
		params,
		data,
		headers: {
			...headers,
			...optsHeaders
		},
		...restOpts,
	}

	const result = await axios(opts);
	return result;
}

export default api;