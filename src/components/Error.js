import React from 'react';

const ErrorComponent = props => (
	<div style={{ color: 'red' }}>
		{props.error && props.error.message}
	</div>
);

export default ErrorComponent;