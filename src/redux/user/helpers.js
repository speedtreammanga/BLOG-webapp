import { RECORD_TYPES } from './constants';

export const removeValueFromObj = (obj, condition) => {
	return Object.keys(obj).reduce((newObj, key) => {
		if (condition(obj[key])) {
			return {...newObj, [key]: obj[key]};
		}
		return newObj;
	}, {});
}

export const getRecordType = type => type === RECORD_TYPES.BLOG ? 'blog' : 'posts';

export const updateEditedPost = (posts, edited) => ({
	...posts,
	[edited.id]: {
		...edited,
		updatedAt: edited.updatedAt.split('T')[0],
	}
});

export const validateForm = (type, data) => {
	const baseError = ' field is required';
	let error = { message: null };

	if (type === RECORD_TYPES.BLOG){
		const { name, logoUrl } = data;
		if (!name || name === "") {
			error.message = 'Name' + baseError;
		} else if (!logoUrl.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)) {
			error.message = 'Logo url' + baseError + ' and must be a valid URL';
		}
	} else if (type === RECORD_TYPES.POST) {
		if (!data.title || data.title === "") {
			error.message = 'Title' + baseError;
		}
	}
	return error;
}