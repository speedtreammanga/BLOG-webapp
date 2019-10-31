import React from 'react';

const style = {
	width: '5rem',
	height: '5rem',
	objectFit: 'contain',
	border: '1px solid #d2d2d2',
	borderRadius: '5rem',
	overflow: 'hidden',
}

const AvatarComponent = ({ src }) => <img {...{style, src}} alt='' />

export default AvatarComponent;